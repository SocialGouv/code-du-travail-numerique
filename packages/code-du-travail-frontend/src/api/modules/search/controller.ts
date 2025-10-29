import {
  DEFAULT_ERROR_500_MESSAGE,
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../utils";
import { extractHits, searchWithQuery } from "./service";
import { NextResponse } from "next/server";
import { parseQuery } from "./service/parser";
import { getRelatedThemesBody } from "./queries";

export class SearchController {
  private searchParams: URLSearchParams;

  constructor(request: Request) {
    const url = new URL(request.url);
    this.searchParams = url.searchParams;
  }

  public async get() {
    try {
      const q = this.searchParams.get("q");
      const skipSavedResults = this.searchParams.get("skipSavedResults");
      const size = this.searchParams.get("size");
      const response = await searchWithQuery(
        q as string,
        skipSavedResults === "" ? true : false,
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
          { message: DEFAULT_ERROR_500_MESSAGE },
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

  public async parse() {
    const query = this.searchParams.get("q");
    const themeNumber = 5;

    const esReq = getRelatedThemesBody(query, themeNumber);
    // { index: elasticDocumentsIndex }, // we search in themeIndex here to try to match title in breadcrumb
    // ];
    const themes = await elasticsearchClient
      .search<any>({
        body: esReq,
        index: elasticDocumentsIndex,
      })
      .then((r) => extractHits(r).map((t) => t._source.title));

    const parsed = await parseQuery(query as string, themes);
    return NextResponse.json(parsed, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
