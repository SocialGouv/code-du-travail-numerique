import {
  DEFAULT_ERROR_500_MESSAGE,
  elasticDocumentsIndex,
  elasticsearchClient,
  NotFoundError,
} from "../../utils";
import { extractHits, searchWithQuery } from "./service";
import { NextResponse } from "next/server";
import { getRelatedThemesBody } from "./queries";
import { presearch } from "./service/presearch";

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

  public async presearch() {
    const query = this.searchParams.get("q");
    const allClasses = this.searchParams.get("ac") == "true";

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

    const esReq = getRelatedThemesBody(query);
    const themes = await elasticsearchClient
      .search<any>({
        body: esReq,
        index: elasticDocumentsIndex,
      })
      .then((r) => extractHits(r).map((t) => t._source));

    const parsed = await presearch(query, themes, allClasses);
    return NextResponse.json(parsed, {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  }
}
