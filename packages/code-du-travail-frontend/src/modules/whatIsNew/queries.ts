import { elasticDocumentsIndex, elasticsearchClient } from "../../api/utils";
import {
  addDays,
  addMonths,
  format,
  isSameMonth,
  parse,
  parseISO,
  startOfMonth,
} from "date-fns";
import { fr as frLocale } from "date-fns/locale";
import { cache } from "react";

export type WhatIsNewKind = "evolution-juridique" | "mise-a-jour-fonctionnelle";

type WhatIsNewEntryDocument = {
  url?: string;
  kind: WhatIsNewKind;
  weekStart: string; // YYYY-MM-DD
  description?: string;
  createdAt?: string;
  updatedAt?: string;
  source?: string;
};

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
  period: string; // MM-yyyy
  label: string;
  shortLabel: string;
  weeks: WhatIsNewWeek[];
  createdAt?: string;
  updatedAt?: string;
};

const parsePeriod = (period: string): Date =>
  parse(period, "MM-yyyy", new Date());

const comparePeriodsAsc = (a: string, b: string): number =>
  parsePeriod(a).getTime() - parsePeriod(b).getTime();

const uniq = <T>(items: T[]): T[] => Array.from(new Set(items));

const capitalizeFirst = (value: string): string =>
  value.length === 0 ? value : value[0].toUpperCase() + value.slice(1);

const getPeriodFromWeekStart = (weekStart: string): string | undefined => {
  try {
    return format(parseISO(weekStart), "MM-yyyy");
  } catch {
    return;
  }
};

const getMonthLabel = (period: string): string =>
  capitalizeFirst(
    format(parsePeriod(period), "MMMM yyyy", { locale: frLocale })
  );

const getMonthShortLabel = (period: string): string =>
  format(parsePeriod(period), "MM/yy");

const getWeekLabel = (weekStart: string): string => {
  const start = parseISO(weekStart);
  const end = addDays(start, 6);

  if (isSameMonth(start, end)) {
    // "Semaine du 5 au 11 janvier 2026"
    return `Semaine du ${format(start, "d", {
      locale: frLocale,
    })} au ${format(end, "d MMMM yyyy", { locale: frLocale })}`;
  }

  // "Semaine du 26 janvier 2026 au 1 février 2026"
  return `Semaine du ${format(start, "d MMMM yyyy", {
    locale: frLocale,
  })} au ${format(end, "d MMMM yyyy", { locale: frLocale })}`;
};

const listWeekStartsForPeriod = (period: string): string[] => {
  const monthStart = startOfMonth(parsePeriod(period));
  const nextMonthStart = addMonths(monthStart, 1);

  // Find the first Monday within this month
  let cursor = monthStart;
  while (cursor.getDay() !== 1) {
    cursor = addDays(cursor, 1);
  }

  const weekStarts: string[] = [];
  while (cursor.getTime() < nextMonthStart.getTime()) {
    weekStarts.push(format(cursor, "yyyy-MM-dd"));
    cursor = addDays(cursor, 7);
  }

  return weekStarts;
};

const getCategoryLabel = (kind: WhatIsNewKind): string => {
  switch (kind) {
    case "mise-a-jour-fonctionnelle":
      return "Mise à jour fonctionnelle";
    case "evolution-juridique":
    default:
      return "Évolution juridique";
  }
};

const toHref = (url?: string): string | undefined => {
  const trimmed = url?.trim();
  return trimmed ? trimmed : undefined;
};

const isMeaningfulEntry = (
  entry: Pick<WhatIsNewEntryDocument, "url" | "description">
): boolean => {
  const hasUrl = Boolean(entry.url?.trim());
  const hasDescription = Boolean(entry.description?.trim());
  return hasUrl || hasDescription;
};

const entryToItem = (entry: WhatIsNewEntryDocument): WhatIsNewItem => {
  const title = entry.description?.trim();
  const href = toHref(entry.url);

  return {
    title:
      title && title.length > 0
        ? title
        : href
          ? "Voir le détail"
          : "Mise à jour",
    href,
  };
};

/**
 * “Quoi de neuf” entries are indexed inside elasticDocumentsIndex.
 *
 * The admin schema is now "flat": each entry is a document with:
 * - weekStart (YYYY-MM-DD)
 * - kind
 * - url
 * - description
 * - createdAt / updatedAt
 *
 * We primarily filter by the presence of `weekStart` + `kind`, and by allowed `kind` values.
 */
const getWhatIsNewBaseFilter = () => ({
  bool: {
    filter: [
      { exists: { field: "weekStart" } },
      { exists: { field: "kind" } },
      {
        terms: {
          kind: ["evolution-juridique", "mise-a-jour-fonctionnelle"],
        },
      },
    ],
  },
});

export const getPeriods = cache(async (): Promise<string[]> => {
  const response = await elasticsearchClient.search<
    Pick<WhatIsNewEntryDocument, "weekStart" | "url" | "description">
  >({
    index: elasticDocumentsIndex,
    _source: ["weekStart", "url", "description"],
    size: 5000,
    query: getWhatIsNewBaseFilter(),
  });

  const periods = response.hits.hits
    .map((hit) => hit._source)
    .filter(
      (
        s
      ): s is Pick<
        WhatIsNewEntryDocument,
        "weekStart" | "url" | "description"
      > => Boolean(s)
    )
    .filter(isMeaningfulEntry)
    .map((s) => s.weekStart)
    .filter((ws): ws is string => Boolean(ws))
    .map(getPeriodFromWeekStart)
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
    const monthStart = startOfMonth(parsePeriod(period));
    const nextMonthStart = addMonths(monthStart, 1);

    const response = await elasticsearchClient.search<WhatIsNewEntryDocument>({
      index: elasticDocumentsIndex,
      size: 5000,
      query: {
        bool: {
          filter: [
            getWhatIsNewBaseFilter(),
            {
              range: {
                weekStart: {
                  gte: format(monthStart, "yyyy-MM-dd"),
                  lt: format(nextMonthStart, "yyyy-MM-dd"),
                },
              },
            },
          ],
        },
      },
      sort: [{ weekStart: "asc" }, { createdAt: "asc" }],
    });

    const entries = response.hits.hits
      .map((hit) => hit._source)
      .filter((s): s is WhatIsNewEntryDocument => Boolean(s))
      .filter(isMeaningfulEntry);

    if (entries.length === 0) {
      return;
    }

    const weekStarts = listWeekStartsForPeriod(period);

    const weeks: WhatIsNewWeek[] = weekStarts.map((weekStart) => {
      const weekEntries = entries.filter((e) => e.weekStart === weekStart);

      const byKind = new Map<WhatIsNewKind, WhatIsNewItem[]>();
      for (const entry of weekEntries) {
        const items = byKind.get(entry.kind) ?? [];
        items.push(entryToItem(entry));
        byKind.set(entry.kind, items);
      }

      const categories: WhatIsNewCategory[] = [];
      (["mise-a-jour-fonctionnelle", "evolution-juridique"] as const).forEach(
        (kind) => {
          const items = byKind.get(kind);
          if (items && items.length > 0) {
            categories.push({
              kind,
              label: getCategoryLabel(kind),
              items,
            });
          }
        }
      );

      return {
        id: weekStart,
        label: getWeekLabel(weekStart),
        hasUpdates: categories.length > 0,
        categories: categories.length > 0 ? categories : undefined,
      };
    });

    const createdAt = entries
      .map((e) => e.createdAt)
      .filter((v): v is string => Boolean(v))
      .sort()[0];

    const updatedAt = entries
      .map((e) => e.updatedAt)
      .filter((v): v is string => Boolean(v))
      .sort()
      .at(-1);

    return {
      period,
      label: getMonthLabel(period),
      shortLabel: getMonthShortLabel(period),
      weeks,
      createdAt,
      updatedAt,
    };
  }
);
