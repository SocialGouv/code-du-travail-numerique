import { NextResponse } from "next/server";
import { z } from "zod";
import { NotFoundError, DEFAULT_ERROR_500_MESSAGE } from "../../utils";
import { getSuggestions } from "./service";

// Query attendue :
// - `q` : texte recherché, obligatoire. Il faut au moins 3 caractères pour
//   commencer à suggérer (même seuil que le client, cf. useSuggestions) : une
//   `q` absente ou trop courte renvoie 400.
// - `size` : nombre de suggestions, entier entre MIN_SIZE et MAX_SIZE, 5 par
//   défaut. `coerce` : les query params arrivent en chaînes. `catch` : une
//   `size` invalide (non numérique, hors bornes) retombe sur la valeur par
//   défaut au lieu de renvoyer 400 — la recherche reste utilisable même avec
//   un paramètre bricolé.
const MIN_QUERY_LENGTH = 3;
const DEFAULT_SIZE = 5;
const MIN_SIZE = 1;
const MAX_SIZE = 100;
const suggestQuerySchema = z.object({
  q: z.string().min(MIN_QUERY_LENGTH),
  size: z.coerce
    .number()
    .int()
    .min(MIN_SIZE)
    .max(MAX_SIZE)
    .default(DEFAULT_SIZE)
    .catch(DEFAULT_SIZE),
});

export class SuggestAppController {
  private searchParams: URLSearchParams;

  constructor(request: Request) {
    const url = new URL(request.url);
    this.searchParams = url.searchParams;
  }

  public async get(): Promise<NextResponse> {
    try {
      const parsed = suggestQuerySchema.safeParse({
        q: this.searchParams.get("q") ?? undefined,
        size: this.searchParams.get("size") ?? undefined,
      });

      if (!parsed.success) {
        return NextResponse.json({ message: "Invalid query" }, { status: 400 });
      }

      const { q, size } = parsed.data;

      const response = await getSuggestions(q, size);
      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return NextResponse.json({ message: error.message }, { status: 404 });
      } else {
        return NextResponse.json(
          {
            message: DEFAULT_ERROR_500_MESSAGE,
          },
          { status: 500 }
        );
      }
    }
  }
}
