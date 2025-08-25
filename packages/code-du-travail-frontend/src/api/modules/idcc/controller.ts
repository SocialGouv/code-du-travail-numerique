import { NextResponse } from "next/server";
import { DEFAULT_ERROR_500_MESSAGE, NotFoundError } from "../../utils";
import { getIdccByQuery } from "./service";

export class IdccAppController {
  private searchParams: URLSearchParams;

  constructor(request: Request) {
    const url = new URL(request.url);
    this.searchParams = url.searchParams;
  }

  public async get(): Promise<NextResponse> {
    try {
      const q = this.searchParams.get("q");
      const size = this.searchParams.get("size");

      const response = await getIdccByQuery(
        q as string,
        size ? parseInt(size as string) : undefined
      );
      return NextResponse.json(response, {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      if (error instanceof NotFoundError) {
        return NextResponse.json(
          { message: error.message },
          {
            status: 404,
            headers: {
              "Content-Type": "application/json",
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
              "Content-Type": "application/json",
            },
          }
        );
      }
    }
  }
}
