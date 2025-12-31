import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import { parse } from "date-fns";
import { cache } from "react";

export type WhatIsNewKind = "evolution-juridique" | "mise-a-jour-fonctionnelle";

export type WhatIsNewItem = {
  title: string;
  description?: string;
  href?: string;
};

export type WhatIsNewCategory = {
  kind: WhatIsNewKind;
  label: string;
  items: WhatIsNewItem[];
};

export type WhatIsNewWeek = {
  id: string;
  label: string;
  hasUpdates: boolean;
  categories?: WhatIsNewCategory[];
};

export type WhatIsNewMonth = {
  id?: string;
  period: string;
  label: string;
  shortLabel: string;
  weeks: WhatIsNewWeek[];
  createdAt?: string;
  updatedAt?: string;
};

const WHAT_IS_NEW_SOURCE = "what_is_new_months";

const parsePeriod = (period: string): Date =>
  parse(period, "MM-yyyy", new Date());

const comparePeriodsAsc = (a: string, b: string): number =>
  parsePeriod(a).getTime() - parsePeriod(b).getTime();

const uniq = <T>(items: T[]): T[] => Array.from(new Set(items));

/**
 * “Quoi de neuf” months are indexed inside elasticDocumentsIndex.
 *
 * We try to filter by `source=what_is_new_months` when the `source` field exists,
 * while still supporting documents that might not have a `source` field.
 */
const getWhatIsNewBaseFilter = () => ({
  bool: {
    filter: [
      { exists: { field: "period" } },
      { exists: { field: "weeks" } },
      { regexp: { period: "[0-9]{2}-[0-9]{4}" } },
    ],
    should: [
      { term: { source: WHAT_IS_NEW_SOURCE } },
      { bool: { must_not: [{ exists: { field: "source" } }] } },
    ],
    minimum_should_match: 1,
  },
});

export const getPeriods = cache(async (): Promise<string[]> => {
  const response = await elasticsearchClient.search<
    Pick<WhatIsNewMonth, "period">
  >({
    index: elasticDocumentsIndex,
    _source: ["period"],
    size: 500,
    query: getWhatIsNewBaseFilter(),
  });

  const periods = response.hits.hits
    .map((hit) => hit._source?.period)
    .filter((p): p is string => Boolean(p));

  return uniq(periods).sort(comparePeriodsAsc);
});

export const getMostRecentPeriod = cache(
  async (): Promise<string | undefined> => {
    const periods = await getPeriods();
    return periods[periods.length - 1];
  }
);

export const fetchWhatIsNewMonth = cache(
  async (period: string): Promise<WhatIsNewMonth | undefined> => {
    const response = await elasticsearchClient.search<WhatIsNewMonth>({
      index: elasticDocumentsIndex,
      size: 1,
      query: {
        bool: {
          filter: [
            getWhatIsNewBaseFilter(),
            {
              bool: {
                should: [
                  { term: { "period.keyword": period } },
                  { term: { period } },
                ],
                minimum_should_match: 1,
              },
            },
          ],
        },
      },
    });

    const item = response.hits.hits[0]?._source;
    if (!item) {
      return;
    }

    return {
      ...item,
      weeks: Array.isArray(item.weeks) ? item.weeks : [],
    };
  }
);
