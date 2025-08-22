import { NextResponse } from "next/server";
import { NotFoundError, DEFAULT_ERROR_500_MESSAGE } from "../../utils";
import { getSuggestions } from "./service";

export class SuggestAppController {
  private searchParams: URLSearchParams;

  constructor(request: Request) {
    const url = new URL(request.url);
    this.searchParams = url.searchParams;
  }

  public async get(): Promise<NextResponse> {
    try {
      let sizeNumber = 5;
      let query = "";
      const q = this.searchParams.get("q");
      const size = this.searchParams.get("size");

      if (q && typeof q === "string") {
        query = q;
      }

      if (!size) {
        sizeNumber = 5;
      }
      if (size && typeof size === "string") {
        sizeNumber = parseInt(size);
      }

      const response = await getSuggestions(query, sizeNumber);
      return NextResponse.json(response, {
        status: 200,
        headers: {
          "Content-Type": "application/json; charset=utf-8",
        },
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return NextResponse.json(
          { message: error.message },
          {
            status: 404,
            headers: {
              "Content-Type": "application/json; charset=utf-8",
            },
          }
        );
      } else {
        return NextResponse.json(
          {
            message: DEFAULT_ERROR_500_MESSAGE,
          },
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
}
