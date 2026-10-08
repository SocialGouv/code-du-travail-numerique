import { ExploreTheme } from "../contributions/explore-themes/type";

export type RecommendedItem =
  | { type: "theme"; theme: ExploreTheme }
  | {
      type: "document";
      url: string;
      title: string;
      desc: string;
      // Icône du sous-thème de rattachement du document, comme sur les cartes
      // de thème.
      iconName?: string;
    };

// Le même lien peut venir du fil d'Ariane et des recommandations.
export const getRecommendedItemKey = (item: RecommendedItem): string => {
  switch (item.type) {
    case "theme":
      return item.theme.href;
    case "document":
      return item.url;
  }
};
