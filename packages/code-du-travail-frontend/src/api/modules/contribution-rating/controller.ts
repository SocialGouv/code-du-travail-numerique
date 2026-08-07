import { NextResponse } from "next/server";
import { captureException } from "@sentry/nextjs";
import { routeBySource, SourceKeys } from "@socialgouv/cdtn-utils";
import { z } from "zod";
import {
  RATING_MAX,
  RATING_MIN,
  RatingMatomo,
  ratingActionForValue,
} from "../../../modules/contributions/rating/constants";
import { sendRatingEvent } from "./service";

// Slug d'une contribution : minuscules/chiffres séparés par des tirets. Strict
// car il pilote l'URL canonique construite côté serveur (anti-injection).
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Source du contenu noté : validée contre l'allowlist des sources CDTN connues
// (les clés de `routeBySource`). Le client choisit ainsi parmi un ensemble fermé
// de types (~19), jamais une valeur libre — l'URL/le nom d'event canoniques
// restent donc à l'abri de toute injection.
const isContentSource = (value: unknown): value is SourceKeys =>
  typeof value === "string" && value in routeBySource;

// Corps attendu : la source du contenu noté, son slug et la note. La
// catégorie/action Matomo appartiennent au serveur : le client n'a pas à les
// fournir (route API classique, pas un relai d'event arbitraire).
// `strictObject` : tout champ inattendu est rejeté.
const ratingBodySchema = z.strictObject({
  source: z.custom<SourceKeys>(isContentSource, {
    error: "source inconnue : doit être une source CDTN (clé de routeBySource)",
  }),
  slug: z.string().regex(SLUG_RE),
  value: z.number().int().min(RATING_MIN).max(RATING_MAX),
});

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
      const { source, slug, value } = parsed.data;

      // Relai best-effort vers Matomo (serveur->serveur, invisible des
      // adblockers). Un échec (Matomo lent/down) ne doit ni renvoyer 500 au
      // client fire-and-forget, ni inonder Sentry : on loggue simplement.
      // On transmet le User-Agent du visiteur pour que Matomo voie un vrai
      // navigateur (l'UA par défaut de Node serait classé « bot » → event ignoré).
      const userAgent = this.request.headers.get("user-agent") ?? undefined;
      try {
        // La note voyage en chaîne dans l'action (« note_4 ») : Matomo compte
        // alors les occurrences par note au lieu d'additionner des `e_v`.
        // Ensemble fermé note_1..note_5 : `value` est validée entière et bornée
        // RATING_MIN/RATING_MAX par le schéma zod (pas d'injection).
        await sendRatingEvent({
          category: RatingMatomo.CATEGORY,
          action: ratingActionForValue(value),
          source,
          slug,
          userAgent,
        });
      } catch (relayError) {
        console.warn("[contribution-rating] relai Matomo échoué:", relayError);
      }

      return new NextResponse(null, { status: 204 });
    } catch (error) {
      // Erreur inattendue (bug interne) : on capture pour investigation.
      console.error(error);
      captureException(error);
      return jsonError(500, "Internal server error");
    }
  }
}
