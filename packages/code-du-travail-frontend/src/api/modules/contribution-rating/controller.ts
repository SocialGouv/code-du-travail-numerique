import { NextResponse } from "next/server";
import { captureException } from "@sentry/nextjs";
import { InvalidQueryError } from "../../utils";
import {
  RATING_MATOMO_ACTION,
  RATING_MATOMO_CATEGORY,
  isValidRatingValue,
} from "../../../modules/contributions/rating/constants";
import { sendRatingEvent } from "./service";

const MAX_BODY_BYTES = 4096;
const MAX_NAME_LENGTH = 200;
const MAX_URL_LENGTH = 512;

const asString = (value: unknown, max: number): string =>
  typeof value === "string" ? value.slice(0, max) : "";

const jsonError = (status: number, message: string): NextResponse =>
  NextResponse.json(
    { message },
    { status, headers: { "Content-Type": "application/json" } }
  );

export class ContributionRatingController {
  private request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  public async post(): Promise<NextResponse> {
    try {
      // Garde-fou taille : rejette les payloads manifestement surdimensionnés.
      const contentLength = Number(
        this.request.headers.get("content-length") ?? "0"
      );
      if (contentLength > MAX_BODY_BYTES) {
        return jsonError(413, "Payload too large");
      }

      let body: unknown;
      try {
        body = await this.request.json();
      } catch {
        return jsonError(400, "Invalid JSON body");
      }

      if (!body || typeof body !== "object") {
        return jsonError(400, "Invalid body");
      }

      const { category, action, value } = body as Record<string, unknown>;

      // Liste blanche anti-relais : seul l'event de notation est accepté ;
      // la route ne peut pas servir à injecter des events Matomo arbitraires.
      if (
        category !== RATING_MATOMO_CATEGORY ||
        action !== RATING_MATOMO_ACTION
      ) {
        throw new InvalidQueryError({
          name: "INVALID_QUERY",
          message: "Unexpected category/action",
          cause: { category, action },
        });
      }

      if (!isValidRatingValue(value)) {
        throw new InvalidQueryError({
          name: "INVALID_QUERY",
          message: "Invalid rating value",
          cause: { value },
        });
      }

      const name = asString((body as Record<string, unknown>).name, MAX_NAME_LENGTH);
      const url = asString((body as Record<string, unknown>).url, MAX_URL_LENGTH);

      await sendRatingEvent({
        category: RATING_MATOMO_CATEGORY,
        action: RATING_MATOMO_ACTION,
        name,
        value,
        url: url || undefined,
      });

      return new NextResponse(null, { status: 204 });
    } catch (error) {
      if (error instanceof InvalidQueryError) {
        return jsonError(400, error.message);
      }
      // Échec interne (ex. Matomo injoignable) : on loggue mais on ne retente
      // pas. Le client est en fire-and-forget, l'UX n'est pas impactée.
      console.error(error);
      captureException(error);
      return jsonError(500, "Internal server error");
    }
  }
}
