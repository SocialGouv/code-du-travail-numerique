import { fr } from "@codegouvfr/react-dsfr";
import type { NavigationItem } from "./HeaderDsfr";
import { hasMenuLinks } from "./HeaderDsfr";
import { NavigationMenuDropdown } from "./NavigationMenuDropdown";
import { NavigationLinkItem } from "./NavigationLinkItem";

type HeaderNavigationProps = {
  navigation?: NavigationItem[];
  currentPath: string;
};

export const HeaderNavigation = ({
  navigation,
  currentPath,
}: HeaderNavigationProps) => {
  return (
    <div
      className={fr.cx("fr-header__menu", "fr-modal")}
      id="header-menu-modal-fr-header"
      data-fr-js-modal="true"
      data-fr-js-header-modal="true"
    >
      <div className={fr.cx("fr-container")}>
        <button
          id="fr-header-mobile-overlay-button-close"
          className={fr.cx("fr-btn--close", "fr-btn")}
          aria-controls="header-menu-modal-fr-header"
          title="Fermer"
          data-fr-js-modal-button="true"
        >
          Fermer
        </button>
        <div className={fr.cx("fr-header__menu-links")}>
          <ul className={fr.cx("fr-btns-group")}></ul>
        </div>
        <nav
          id="fr-header-main-navigation"
          className={fr.cx("fr-nav")}
          role="navigation"
          aria-label="Menu principal"
          data-fr-js-navigation="true"
        >
          <ul className={fr.cx("fr-nav__list")}>
            {navigation?.map((item, index) => {
              if (hasMenuLinks(item)) {
                return (
                  <NavigationMenuDropdown
                    key={index}
                    item={item}
                    index={index}
                    currentPath={currentPath}
                  />
                );
              }
              return <NavigationLinkItem key={index} item={item} />;
            })}
          </ul>
        </nav>
      </div>
    </div>
  );
};
