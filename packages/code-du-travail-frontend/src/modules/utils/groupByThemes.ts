import { DocumentElastic } from "@socialgouv/cdtn-types/build/elastic/common";

type Props = {
  breadcrumbs: DocumentElastic["breadcrumbs"];
};

export const groupByThemes = <
  T extends { breadcrumbs: DocumentElastic["breadcrumbs"] },
>(
  items: T[]
): {
  themes: string[];
  documents: Record<string, T[]>;
} => {
  const documents = items.reduce(groupByTheme<T>, {} as Record<string, T[]>);

  const themes = Object.keys(documents);

  return { themes, documents };
};

const groupByTheme = <
  T extends { breadcrumbs: DocumentElastic["breadcrumbs"] },
>(
  acc: Record<string, T[]>,
  item: T
) => {
  const theme = item.breadcrumbs?.[0]?.label;
  if (!theme) {
    return acc;
  }
  if (theme in acc) acc[theme].push(item);
  else acc[theme] = [item];
  return acc;
};
