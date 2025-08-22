import { NextResponse } from "next/server";
import { InvalidQueryError } from "../../utils";
import { fetchEnterprises, populateAgreements } from "./service";
import { captureException } from "@sentry/nextjs";

export class EnterprisesAppController {
  private searchParams: URLSearchParams;

  constructor(request: Request) {
    const url = new URL(request.url);
    this.searchParams = url.searchParams;
  }

  public async get(): Promise<NextResponse> {
    try {
      const query = this.searchParams.get("q");
      const postCode = this.searchParams.get("cp");

      if (
        !query ||
        typeof query !== "string" ||
        (postCode && typeof postCode !== "string")
      ) {
        throw new InvalidQueryError({
          message: "Invalid query",
          name: "INVALID_QUERY",
          cause: { query, postCode },
        });
      }

      const postCodeArray = postCode ? postCode.split(",") : [];

      const jsonResponse = await fetchEnterprises(query, postCodeArray);

      const response = await populateAgreements(jsonResponse);
      return NextResponse.json(response, {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
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
            "Content-Type": "application/json; charset=utf-8",
          },
        }
      );
    }
  }
}
