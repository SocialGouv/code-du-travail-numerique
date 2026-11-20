import { NextResponse } from "next/server";
import { captureException } from "@sentry/nextjs";
import { routeBySource, SourceKeys } from "@socialgouv/cdtn-utils";
import { z } from "zod";
import {
  RATING_MAX,
  RATING_MIN,
  RATING_SUGGESTION_MAX_LENGTH,
  RatingMatomoAction,
  RatingMatomoCategory,
  RatingReason,
  ratingActionForReason,
  ratingActionForValue,
} from "../../../modules/contributions/rating/constants";
import { sendRatingEvent } from "./service";

// Contribution slug: lowercase letters/digits separated by dashes. Strict since
// it drives the canonical URL built server side (anti-injection).
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Source of the rated content: validated against the allowlist of known CDTN
// sources (the keys of `routeBySource`). The client thus picks from a closed set
// of types (~19), never a free value — the canonical URL / event name stay safe
// from any injection.
const isContentSource = (value: unknown): value is SourceKeys =>
  typeof value === "string" && value in routeBySource;

// Fields shared by every request: the content source and its slug.
const contentShape = {
  source: z.custom<SourceKeys>(isContentSource, {
    error: "source inconnue : doit être une source CDTN (clé de routeBySource)",
  }),
  slug: z.string().regex(SLUG_RE),
};

// Expected body: one user action, discriminated by `type`. The Matomo
// category/action belong to the server: the client never provides them (plain
// API route, not an arbitrary event relay). `strictObject`: any unexpected
// field is rejected.
const ratingBodySchema = z.discriminatedUnion("type", [
  // Star click: integer score bounded RATING_MIN..RATING_MAX.
  z.strictObject({
    ...contentShape,
    type: z.literal("note"),
    value: z.number().int().min(RATING_MIN).max(RATING_MAX),
  }),
  // "Envoyer" in the reasons panel: non-empty set of known reasons, no
  // duplicates (one Matomo event per reason).
  z.strictObject({
    ...contentShape,
    type: z.literal("raison"),
    reasons: z
      .array(z.enum(RatingReason))
      .min(1)
      .refine((reasons) => new Set(reasons).size === reasons.length, {
        error: "raisons en double",
      }),
  }),
  // Click on "Une remarque ?".
  z.strictObject({
    ...contentShape,
    type: z.literal("remarque"),
  }),
  // Free text suggestion, trimmed then bounded 1..500 characters.
  z.strictObject({
    ...contentShape,
    type: z.literal("suggestion"),
    text: z.string().trim().min(1).max(RATING_SUGGESTION_MAX_LENGTH),
  }),
]);

type RatingBody = z.infer<typeof ratingBodySchema>;

type MatomoEvent = { category: RatingMatomoCategory; action: string };

// Server-owned Matomo identity of each user action. Every action is a closed
// set (bounded score, enum reasons, constant), except the suggestion verbatim,
// which lives in its own category (same pattern as `feedback_suggestion`).
const toMatomoEvents = (body: RatingBody): MatomoEvent[] => {
  switch (body.type) {
    case "note":
      return [
        {
          category: RatingMatomoCategory.CLARITY,
          action: ratingActionForValue(body.value),
        },
      ];
    case "raison":
      return body.reasons.map((reason) => ({
        category: RatingMatomoCategory.CLARITY,
        action: ratingActionForReason(reason),
      }));
    case "remarque":
      return [
        {
          category: RatingMatomoCategory.CLARITY,
          action: RatingMatomoAction.REMARK,
        },
      ];
    case "suggestion":
      return [{ category: RatingMatomoCategory.SUGGESTION, action: body.text }];
  }
};

const jsonError = (status: number, message: string): NextResponse =>
  NextResponse.json({ message }, { status });

export class ContributionRatingController {
  private request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  public async post(): Promise<NextResponse> {
    try {
      const body: unknown = await this.request.json().catch(() => undefined);

      const parsed = ratingBodySchema.safeParse(body);
      if (!parsed.success) {
        return jsonError(400, "Invalid rating payload");
      }
      const { source, slug } = parsed.data;

      // Best-effort relay to Matomo (server -> server, invisible to
      // adblockers). A failure (slow/down Matomo) must neither return a 500 to
      // the fire-and-forget client nor flood Sentry: we just log it.
      // The visitor's User-Agent is forwarded so that Matomo sees a real
      // browser (Node's default UA would be classified as a bot -> event
      // ignored).
      const userAgent = this.request.headers.get("user-agent") ?? undefined;
      const results = await Promise.allSettled(
        toMatomoEvents(parsed.data).map(({ category, action }) =>
          sendRatingEvent({ category, action, source, slug, userAgent })
        )
      );
      results.forEach((result) => {
        if (result.status === "rejected") {
          console.warn(
            "[contribution-rating] Matomo relay failed:",
            result.reason
          );
        }
      });

      return new NextResponse(null, { status: 204 });
    } catch (error) {
      // Unexpected error (internal bug): captured for investigation.
      console.error(error);
      captureException(error);
      return jsonError(500, "Internal server error");
    }
  }
}
