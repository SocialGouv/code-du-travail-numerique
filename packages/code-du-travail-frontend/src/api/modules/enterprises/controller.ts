import { NextResponse } from "next/server";
import { z } from "zod";
import { fetchEnterprises, populateAgreements } from "./service";
import { captureException } from "@sentry/nextjs";

// Query attendue : `q` (raison sociale ou SIREN/SIRET, obligatoire) et `cp`
// (codes postaux à 5 chiffres séparés par des virgules, optionnel). Le format
// est vérifié avant découpage : un `cp` malformé — y compris présent mais vide
// (`?cp=`), rejeté explicitement par `min(1)` — renvoie 400 au lieu d'être
// transmis tel quel à l'API entreprises. Après validation, seul le cas
// « absent » reste à gérer dans le transform.
const enterprisesQuerySchema = z.object({
  q: z.string().min(1),
  cp: z
    .string()
    .min(1)
    .regex(/^\d{5}(?:,\d{5})*$/)
    .optional()
    .transform((value) => (value === undefined ? [] : value.split(","))),
});

export class EnterprisesAppController {
  private searchParams: URLSearchParams;

  constructor(request: Request) {
    const url = new URL(request.url);
    this.searchParams = url.searchParams;
  }

  public async get(): Promise<NextResponse> {
    try {
      const parsed = enterprisesQuerySchema.safeParse({
        q: this.searchParams.get("q") ?? undefined,
        cp: this.searchParams.get("cp") ?? undefined,
      });

      if (!parsed.success) {
        return NextResponse.json({ message: "Invalid query" }, { status: 400 });
      }

      const { q: query, cp: postCodes } = parsed.data;

      const jsonResponse = await fetchEnterprises(query, postCodes);

      const response = await populateAgreements(jsonResponse);
      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error(error);
      captureException(error);
      return NextResponse.json({ message: String(error) }, { status: 500 });
    }
  }
}
