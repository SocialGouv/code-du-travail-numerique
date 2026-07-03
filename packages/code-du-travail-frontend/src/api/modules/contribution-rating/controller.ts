import { NextResponse } from "next/server";
import { captureException } from "@sentry/nextjs";
import { InvalidQueryError } from "../../utils";
import {
  RATING_MAX,
  RATING_MIN,
  RatingMatomo,
} from "../../../modules/contributions/rating/constants";
import { sendRatingEvent } from "./service";

// Slug d'une contribution : minuscules/chiffres séparés par des tirets. Strict
// car il pilote l'URL canonique construite côté serveur (anti-injection).
const SLUG_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

// Corps attendu : uniquement la notation (le slug de la contribution notée et la
// note). La catégorie/action Matomo appartiennent au serveur : le client n'a pas
// à les fournir (route API classique, pas un relai d'event arbitraire).
type RatingBody = { slug: string; value: number };

// Clés autorisées : on refuse tout champ inattendu (équivalent d'un schéma
// « strict » : le client ne relaie que « juste la note »).
const ALLOWED_KEYS = ["slug", "value"];

const jsonError = (status: number, message: string): NextResponse =>
  NextResponse.json(
    { message },
    { status, headers: { "Content-Type": "application/json" } }
  );

const invalidQuery = (cause: unknown): InvalidQueryError =>
  new InvalidQueryError({
    name: "INVALID_QUERY",
    message: "Invalid rating payload",
    cause,
  });

// Validation manuelle (comme les autres controllers, sans dépendance de schéma).
const parseRatingBody = (body: unknown): RatingBody => {
  if (typeof body !== "object" || body === null) throw invalidQuery({ body });

  const record = body as Record<string, unknown>;
  if (Object.keys(record).some((key) => !ALLOWED_KEYS.includes(key))) {
    throw invalidQuery({ keys: Object.keys(record) });
  }

  const { slug, value } = record;
  if (typeof slug !== "string" || !SLUG_RE.test(slug)) {
    throw invalidQuery({ slug });
  }
  if (
    typeof value !== "number" ||
    !Number.isInteger(value) ||
    value < RATING_MIN ||
    value > RATING_MAX
  ) {
    throw invalidQuery({ value });
  }

  return { slug, value };
};

export class ContributionRatingController {
  private request: Request;

  constructor(request: Request) {
    this.request = request;
  }

  public async post(): Promise<NextResponse> {
    try {
      const body: unknown = await this.request.json().catch(() => undefined);

      const { slug, value } = parseRatingBody(body);

      // Relai best-effort vers Matomo (serveur->serveur, invisible des
      // adblockers). Un échec (Matomo lent/down) ne doit ni renvoyer 500 au
      // client fire-and-forget, ni inonder Sentry : on loggue simplement.
      try {
        await sendRatingEvent({
          category: RatingMatomo.CATEGORY,
          action: RatingMatomo.ACTION,
          value,
          slug,
        });
      } catch (relayError) {
        console.warn("[contribution-rating] relai Matomo échoué:", relayError);
      }

      return new NextResponse(null, { status: 204 });
    } catch (error) {
      if (error instanceof InvalidQueryError) {
        return jsonError(400, error.message);
      }
      // Erreur inattendue (bug interne) : on capture pour investigation.
      console.error(error);
      captureException(error);
      return jsonError(500, "Internal server error");
    }
  }
}
