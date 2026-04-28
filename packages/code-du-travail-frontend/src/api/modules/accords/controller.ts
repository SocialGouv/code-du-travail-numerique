import { NextResponse } from "next/server";
import { InvalidQueryError } from "../../utils";
import { captureException } from "@sentry/nextjs";
import { getAccordsEntreprise } from "./service";

export class AccordsEnterpriseAppController {
  private siret: string;

  constructor(siret: string) {
    this.siret = siret;
  }

  public async get(): Promise<NextResponse> {
    try {
      if (!this.siret || typeof this.siret !== "string") {
        throw new InvalidQueryError({
          message: "Invalid query",
          name: "INVALID_QUERY",
          cause: { siret: this.siret },
        });
      }

      const response = await getAccordsEntreprise(this.siret);

      return NextResponse.json(response, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.error(error);
      captureException(error);
      return NextResponse.json(
        { message: error.toString() },
        {
          status: 500,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }
  }
}
