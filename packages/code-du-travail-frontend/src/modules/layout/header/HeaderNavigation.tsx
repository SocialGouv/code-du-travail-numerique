import { fr } from "@codegouvfr/react-dsfr";
import Link from "../../common/Link";
import { cx } from "@codegouvfr/react-dsfr/src/tools/cx";
import type { MainNavigationProps } from "@codegouvfr/react-dsfr/src/MainNavigation";

type HeaderNavigationProps = {
  navigation?: MainNavigationProps.Item.Link[];
};

export const HeaderNavigation = ({ navigation }: HeaderNavigationProps) => {
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
            {navigation?.map(({ isActive = false, linkProps, text }, index) => (
              <li
                key={index}
                className={fr.cx("fr-nav__item")}
                data-fr-js-navigation-item="true"
              >
                <Link
                  className={cx(fr.cx("fr-nav__link"), linkProps.className)}
                  {...(linkProps as {})}
                  href={linkProps.href ?? ""}
                  {...(isActive && { ["aria-current"]: "page" })}
                >
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};
