import { NextResponse } from "next/server";
import { z } from "zod";
import { DEFAULT_ERROR_500_MESSAGE, NotFoundError } from "../../utils";
import { getIdccByQuery } from "./service";

// Query attendue : `q` (nom ou numéro d'IDCC, obligatoire) et `size` (nombre
// de résultats, optionnel). `coerce` : les query params arrivent en chaînes.
const idccQuerySchema = z.object({
  q: z.string().min(1),
  size: z.coerce.number().int().min(1).max(100).optional(),
});

export class IdccAppController {
  private searchParams: URLSearchParams;

  constructor(request: Request) {
    const url = new URL(request.url);
    this.searchParams = url.searchParams;
  }

  public async get(): Promise<NextResponse> {
    try {
      const parsed = idccQuerySchema.safeParse({
        q: this.searchParams.get("q") ?? undefined,
        size: this.searchParams.get("size") ?? undefined,
      });

      if (!parsed.success) {
        return NextResponse.json({ message: "Invalid query" }, { status: 400 });
      }

      const { q, size } = parsed.data;

      const response = await getIdccByQuery(q, size);
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
