import { fr } from "@codegouvfr/react-dsfr";
import type { MainNavigationProps } from "@codegouvfr/react-dsfr/MainNavigation/MainNavigation";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderNavigation } from "./HeaderNavigation";
import { useFeatureFlag } from "src/modules/utils/useFeatureFlag";
import { HeaderSearchV2 } from "./HeaderSearchV2";
import { useState } from "react";
import { SearchModal } from "src/modules/recherche/modal/SearchModal";
import { mockSearchResults } from "src/modules/recherche/modal/mockData";

export type NavigationLink = MainNavigationProps.Item.Link;

export type NavigationMenuLink = {
  text: string;
  linkProps: {
    href: string;
    target?: string;
    rel?: string;
  };
};

export type NavigationMenu = {
  text: string;
  isActive?: boolean;
  menuLinks: NavigationMenuLink[];
};

export type NavigationItem = NavigationLink | NavigationMenu;

export function hasMenuLinks(item: NavigationItem): item is NavigationMenu {
  return "menuLinks" in item;
}

type Props = {
  navigation?: NavigationItem[];
  onSearchSubmit: (data: string) => void;
  currentPath: string;
};

export const HeaderDsfr = ({
  navigation,
  onSearchSubmit,
  currentPath,
}: Props) => {
  const useV2Search = useFeatureFlag("search_v2");
  const [hasSearchV2Click, setHasSearchV2Click] = useState(false);
  return (
    <header role="banner" id="fr-header" className={fr.cx("fr-header")}>
      <div className={fr.cx("fr-header__body")}>
        <div className={fr.cx("fr-container")}>
          <div className={fr.cx("fr-header__body-row")}>
            <HeaderBrand />
            {useV2Search ? (
              <HeaderSearchV2
                onSearchClick={() => setHasSearchV2Click(!hasSearchV2Click)}
              />
            ) : (
              <HeaderSearch onSearchSubmit={onSearchSubmit} />
            )}
          </div>
        </div>
      </div>
      <HeaderNavigation navigation={navigation} currentPath={currentPath} />
      {hasSearchV2Click && (
        <SearchModal
          isOpen={hasSearchV2Click}
          onClearSearch={() => {}}
          onClose={() => {}}
          onSearchChange={() => {}}
          results={mockSearchResults}
          searchQuery="sqsqqs"
        />
      )}
    </header>
  );
};
