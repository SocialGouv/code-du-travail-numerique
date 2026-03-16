import { fr } from "@codegouvfr/react-dsfr";
import type { MainNavigationProps } from "@codegouvfr/react-dsfr/MainNavigation/MainNavigation";
import { HeaderBrand } from "./HeaderBrand";
import { HeaderNavigation } from "./HeaderNavigation";
import { HeaderSearchV2 } from "./HeaderSearchV2";
import { SearchModal } from "src/modules/recherche/modal/SearchModal";
import { useSearchModal } from "src/modules/recherche/modal/SearchModalContext";
import { useAgreementModal } from "src/modules/convention-collective/AgreementSelectionModal";
import { useHeaderAgreementTracking } from "src/modules/convention-collective/AgreementSelectionModal/tracking";

export type NavigationLink = MainNavigationProps.Item.Link;

export type NavigationMenuLink = {
  text: string;
  iconId?: string;
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
  const {
    isOpen: isAgreementOpen,
    openModal: openAgreementModal,
    closeModal: closeAgreementModal,
  } = useAgreementModal();

  const handleSearchToggle = () => {
    if (isOpen) {
      closeModal();
    } else {
      closeAgreementModal();
      openModal();
    }
  };

  const { emitOpenModalEvent } = useHeaderAgreementTracking();

  const handleAgreementToggle = () => {
    if (isAgreementOpen) {
      closeAgreementModal();
    } else {
      closeModal();
      openAgreementModal();
      emitOpenModalEvent();
    }
  };

  return (
    <header role="banner" id="fr-header" className={fr.cx("fr-header")}>
      <div className={fr.cx("fr-header__body")}>
        <div className={fr.cx("fr-container")}>
          <div className={fr.cx("fr-header__body-row")}>
            <HeaderBrand
              onSearchClick={handleSearchToggle}
              isSearchOpen={isOpen}
            />
            <HeaderSearchV2
              onSearchClick={handleSearchToggle}
              isSearchOpen={isOpen}
              onAgreementClick={handleAgreementToggle}
              isAgreementOpen={isAgreementOpen}
            />
          </div>
        </div>
      </div>
      <HeaderNavigation
        navigation={navigation}
        currentPath={currentPath}
        onAgreementClick={handleAgreementToggle}
        isAgreementOpen={isAgreementOpen}
      />
      <SearchModal isOpen={isOpen} onClose={closeModal} />
    </header>
  );
};
