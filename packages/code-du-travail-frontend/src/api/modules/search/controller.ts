import { DEFAULT_PRESEARCH_RESULTS_NUMBER, searchWithQuery } from "./service";
import { NextResponse } from "next/server";
import { getGlossary } from "../glossary";
import { findGlossaryDefinition } from "../../../modules/glossaire/queries";
import { SearchResultResponse } from "./type";

export class SearchController {
  private searchParams: URLSearchParams;

  constructor(request: Request) {
    const url = new URL(request.url);
    this.searchParams = url.searchParams;
  }

  public async presearch(): Promise<
    NextResponse<SearchResultResponse | { message: string }>
  > {
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

    const [searchResults, glossaryData] = await Promise.all([
      searchWithQuery(query, DEFAULT_PRESEARCH_RESULTS_NUMBER, false),
      getGlossary().catch(() => undefined),
    ]);

    const definition = findGlossaryDefinition(query, glossaryData);

    const parsed = {
      results: searchResults.documents,
      class: searchResults.class,
      definition,
    };

    return NextResponse.json(parsed, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }

  public async get() {
    const q = this.searchParams.get("q");
    const pq = this.searchParams.get("pq");
    const response = await searchWithQuery(q as string, 5, pq != "false");
    return NextResponse.json(response, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
