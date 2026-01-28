import { fr } from "@codegouvfr/react-dsfr";
import type { MainNavigationProps } from "@codegouvfr/react-dsfr/MainNavigation/MainNavigation";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderNavigation } from "./HeaderNavigation";
import { HeaderSearchV2 } from "./HeaderSearchV2";
import { SearchModal } from "src/modules/recherche/modal/SearchModal";
import { useSearchModal } from "src/modules/recherche/modal/SearchModalContext";

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
  currentPath: string;
};

export const HeaderDsfr = ({ navigation, currentPath }: Props) => {
  const { isOpen, openModal, closeModal } = useSearchModal();

  const isSearchV2 = variant === ABTestVariant.SEARCH_V2;

  const handleSearchToggle = () => {
    if (isOpen) {
      closeModal();
    } else {
      openModal();
    }
  };

  return (
    <header role="banner" id="fr-header" className={fr.cx("fr-header")}>
      <div className={fr.cx("fr-header__body")}>
        <div className={fr.cx("fr-container")}>
          <div className={fr.cx("fr-header__body-row")}>
            <HeaderBrand
<<<<<<< HEAD
              onSearchClick={isSearchV2 ? handleSearchToggle : undefined}
              searchModalId={isSearchV2 ? undefined : "fr-header-search-modal"}
              enableDsfrModalBehavior={!isSearchV2}
||||||| ac898bb53
              onSearchClick={
                variant === ABTestVariant.SEARCH_V2
                  ? handleSearchToggle
                  : undefined
              }
=======
              onSearchClick={handleSearchToggle}
              isSearchOpen={isOpen}
            />
            <HeaderSearchV2
              onSearchClick={handleSearchToggle}
              isSearchOpen={isOpen}
>>>>>>> dev
            />
<<<<<<< HEAD
            {isSearchV2 ? (
              <HeaderSearchV2 onSearchClick={handleSearchToggle} />
            ) : (
              <HeaderSearch onSearchSubmit={onSearchSubmit} />
            )}
||||||| ac898bb53
            {variant === ABTestVariant.SEARCH_V2 ? (
              <HeaderSearchV2 onSearchClick={handleSearchToggle} />
            ) : (
              <HeaderSearch onSearchSubmit={onSearchSubmit} />
            )}
=======
>>>>>>> dev
          </div>
        </div>
      </div>
      <HeaderNavigation navigation={navigation} currentPath={currentPath} />
      <SearchModal isOpen={isOpen} onClose={closeModal} />
    </header>
  );
};
