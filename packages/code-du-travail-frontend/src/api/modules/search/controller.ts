import { DEFAULT_PRESEARCH_RESULTS_NUMBER, searchWithQuery } from "./service";
import { NextResponse } from "next/server";

export class SearchController {
  private searchParams: URLSearchParams;

  constructor(request: Request) {
    const url = new URL(request.url);
    this.searchParams = url.searchParams;
  }

  public async get() {
    const q = this.searchParams.get("q");
    const response = await searchWithQuery(q as string);
    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async presearch() {
    const query = this.searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { message: "Query parameter 'q' is required." },
        {
          status: 400,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
    }

    const parsed = await searchWithQuery(
      query,
      DEFAULT_PRESEARCH_RESULTS_NUMBER
    ).then((r) => ({
      results: r.documents,
      class: r.class,
    }));
    return NextResponse.json(parsed, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
