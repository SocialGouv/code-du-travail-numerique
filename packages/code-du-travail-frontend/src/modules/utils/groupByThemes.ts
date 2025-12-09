import { DocumentElastic } from "@socialgouv/cdtn-types/build/elastic/common";
import { Breadcrumb } from "@socialgouv/cdtn-types";

export const groupByThemes = <
  T extends { breadcrumbs: DocumentElastic["breadcrumbs"] },
>(
  items: T[]
): { theme: Breadcrumb; documents: T[] }[] => {
  const docs = items.reduce(
    groupByTheme<T>,
    {} as Record<string, { theme: Breadcrumb; documents: T[] }>
  );
  return Object.values(docs);
};

const groupByTheme = <
  T extends { breadcrumbs: DocumentElastic["breadcrumbs"] },
>(
  acc: Record<string, { theme: Breadcrumb; documents: T[] }>,
  item: T
) => {
  const theme = item.breadcrumbs?.[0];
  if (!theme) {
    return acc;
  }
  if (theme.label in acc) acc[theme.label].documents.push(item);
  else acc[theme.label] = { theme, documents: [item] };
  return acc;
};
