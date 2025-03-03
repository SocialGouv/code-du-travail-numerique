import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";

export const HeaderBrand = () => {
  return (
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
          <Image
            className={`${fr.cx("fr-responsive-img")} ${Logo}`}
            src="/static/assets/img/logo.svg"
            alt="Code du travail numérique"
            width={145}
            height={50}
            priority
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
  );
};

const Logo = css({
  maxWidth: "9.0625rem",
});
