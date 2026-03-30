import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { useCallback } from "react";
import type { NavigationItem } from "./HeaderDsfr";
import { hasMenuLinks } from "./HeaderDsfr";
import { NavigationMenuDropdown } from "./NavigationMenuDropdown";
import { NavigationLinkItem } from "./NavigationLinkItem";
import { HeaderAgreementButton } from "./HeaderAgreementButton";

type HeaderNavigationProps = {
  navigation?: NavigationItem[];
  currentPath: string;
  onAgreementClick?: () => void;
};

export const HeaderNavigation = ({
  navigation,
  currentPath,
  onAgreementClick,
}: HeaderNavigationProps) => {
  const handleMobileAgreementClick = useCallback(() => {
    // Close the DSFR burger menu before opening the agreement modal
    const closeBtn = document.getElementById(
      "fr-header-mobile-overlay-button-close"
    ) as HTMLButtonElement | null;
    closeBtn?.click();

    // Delay to let the burger menu close animation finish
    setTimeout(() => {
      onAgreementClick?.();
    }, 400);
  }, [onAgreementClick]);

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

        {onAgreementClick && (
          <div
            className={`${fr.cx("fr-hidden-lg")} ${mobileAgreementContainer}`}
          >
            <HeaderAgreementButton
              id="fr-header-agreement-button"
              onClick={handleMobileAgreementClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

const mobileAgreementContainer = css({
  padding: "1.25rem 0",
  borderTop: "1px solid var(--border-default-grey)",
  marginTop: "1rem",
  display: "flex",
  justifyContent: "center",
});
