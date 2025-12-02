import { fr } from "@codegouvfr/react-dsfr";
import type { MainNavigationProps } from "@codegouvfr/react-dsfr/MainNavigation/MainNavigation";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderSearch } from "./HeaderSearch";
import { HeaderNavigation } from "./HeaderNavigation";
import { useABTestVariant } from "src/modules/utils/useABTestVariant";
import { ABTesting, ABTestVariant } from "src/modules/config/initABTesting";
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
  onSearchSubmit: (data: string) => void;
  currentPath: string;
};

export const HeaderDsfr = ({
  navigation,
  onSearchSubmit,
  currentPath,
}: Props) => {
  const variant = useABTestVariant(ABTesting.SEARCH);
  const { isOpen, openModal, closeModal } = useSearchModal();

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
              onSearchClick={
                variant === ABTestVariant.SEARCH_V2
                  ? handleSearchToggle
                  : undefined
              }
            />
            {variant === ABTestVariant.SEARCH_V2 ? (
              <HeaderSearchV2 onSearchClick={handleSearchToggle} />
            ) : (
              <HeaderSearch onSearchSubmit={onSearchSubmit} />
            )}
          </div>
        </div>
      </div>
      <HeaderNavigation navigation={navigation} currentPath={currentPath} />
      <SearchModal isOpen={isOpen} onClose={closeModal} />
    </header>
  );
};
