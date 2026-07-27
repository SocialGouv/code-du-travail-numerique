import { NextResponse } from "next/server";
import { z } from "zod";
import { captureException } from "@sentry/nextjs";
import { getAccordsEntreprise } from "./service";

// Un SIRET : exactement 14 chiffres (la clé de Luhn n'est pas vérifiée ici,
// un SIRET inexistant renvoie simplement zéro accord).
const siretSchema = z.string().regex(/^\d{14}$/);

export class AccordsEnterpriseAppController {
  private siret: string;

  constructor(siret: string) {
    this.siret = siret;
  }

  public async get(): Promise<NextResponse> {
    try {
      const parsed = siretSchema.safeParse(this.siret);
      if (!parsed.success) {
        return NextResponse.json({ message: "Invalid siret" }, { status: 400 });
      }

      const response = await getAccordsEntreprise(parsed.data);

      return NextResponse.json(response, { status: 200 });
    } catch (error) {
      console.error(error);
      captureException(error);
      return NextResponse.json({ message: String(error) }, { status: 500 });
    }
  }
}
