import Link from "../../common/Link";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import type { MainNavigationProps } from "@codegouvfr/react-dsfr/src/MainNavigation";
import { cx } from "@codegouvfr/react-dsfr/src/tools/cx";
import { SUGGEST_MAX_RESULTS } from "../../../config";
import { fetchSuggestResults } from "./fetchSuggestResults";
import { Autocomplete } from "../../common/Autocomplete";
import { useState } from "react";

type Props = {
  navigation?: MainNavigationProps.Item.Link[];
  onSearchSubmit: (data: string) => void;
};

export const HeaderDsfr = ({ navigation, onSearchSubmit }: Props) => {
  const [value, setValue] = useState("");
  return (
    <header role="banner" id="fr-header" className={fr.cx("fr-header")}>
      <div className={fr.cx("fr-header__body")}>
        <div className={fr.cx("fr-container")}>
          <div className={fr.cx("fr-header__body-row")}>
            <div className={fr.cx("fr-header__brand", "fr-enlarge-link")}>
              <div className={fr.cx("fr-header__brand-top")}>
                <div className={fr.cx("fr-header__logo")}>
                  <a
                    title="Accueil - Code du travail numérique, Ministère du Travail"
                    href="/"
                  >
                    <p className={fr.cx("fr-logo")}>
                      RÉPUBLIQUE
                      <br />
                      FRANÇAISE
                    </p>
                  </a>
                </div>
                <div className={fr.cx("fr-header__operator")}>
                  <img
                    className={`${fr.cx("fr-responsive-img")} ${Logo}`}
                    src="/static/assets/img/logo.svg"
                    alt="Code du travail numérique"
                    data-fr-js-ratio="true"
                  />
                </div>
                <div className={fr.cx("fr-header__navbar")}>
                  <button
                    id="fr-header-search-button"
                    className={fr.cx("fr-btn--search", "fr-btn")}
                    data-fr-opened="false"
                    aria-controls="fr-header-search-modal"
                    title="Rechercher"
                    data-fr-js-modal-button="true"
                  >
                    Rechercher
                  </button>
                  <button
                    className={fr.cx("fr-btn--menu", "fr-btn")}
                    data-fr-opened="false"
                    aria-controls="header-menu-modal-fr-header"
                    aria-haspopup="menu"
                    id="fr-header-menu-button"
                    title="Menu"
                    data-fr-js-modal-button="true"
                  >
                    Menu
                  </button>
                </div>
              </div>
            </div>
            <div className={fr.cx("fr-header__tools")}>
              <div
                className={fr.cx("fr-header__search", "fr-modal")}
                id="fr-header-search-modal"
                data-fr-js-modal="true"
                data-fr-js-header-modal="true"
              >
                <div
                  className={fr.cx("fr-container", "fr-container-lg--fluid")}
                >
                  <button
                    id="fr-header-search-close-button"
                    className={fr.cx("fr-btn--close", "fr-btn")}
                    aria-controls="fr-header-search-modal"
                    title="Fermer"
                    data-fr-js-modal-button="true"
                  >
                    Fermer
                  </button>

                  <form
                    role="search"
                    onSubmit={() => {
                      onSearchSubmit(value);
                    }}
                  >
                    <Autocomplete<string>
                      label={"Rechercher"}
                      isSearch
                      displayLabel={(data) => data ?? ""}
                      search={async (input) => {
                        try {
                          const results = await fetchSuggestResults(input).then(
                            (items) => items.slice(0, SUGGEST_MAX_RESULTS)
                          );
                          return results;
                        } catch (error) {
                          console.log("Failed");
                          return [];
                        }
                      }}
                      onInputValueChange={(value) => {
                        setValue(value);
                      }}
                      onChange={(value) => {
                        setValue(value ?? "");
                        if (value) {
                          onSearchSubmit(value);
                        }
                      }}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
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
              {navigation?.map(
                ({ isActive = false, linkProps, text }, index) => (
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
                )
              )}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

const Logo = css({
  maxWidth: "9.0625rem",
});
