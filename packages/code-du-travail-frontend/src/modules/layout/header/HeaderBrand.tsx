import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import Link from "src/modules/common/Link";

type HeaderBrandProps = {
  onSearchClick?: () => void;
  searchModalId?: string;
  enableDsfrModalBehavior?: boolean;
};

export const HeaderBrand = ({
  onSearchClick,
  searchModalId,
  enableDsfrModalBehavior = true,
}: HeaderBrandProps) => {
  const resolvedSearchModalId = enableDsfrModalBehavior
    ? (searchModalId ?? "fr-header-search-modal")
    : searchModalId;

  return (
    <div className={fr.cx("fr-header__brand", "fr-enlarge-link")}>
      <div className={fr.cx("fr-header__brand-top")}>
        <div className={fr.cx("fr-header__logo")}>
          <p className={fr.cx("fr-logo")}>
            RÉPUBLIQUE
            <br />
            FRANÇAISE
          </p>
          <p className={fr.cx("fr-sr-only")}>Liberté égalité fraternité</p>
        </div>
        <div className={fr.cx("fr-header__operator")}>
          <Link href="/">
            <Image
              className={`${fr.cx("fr-responsive-img")} ${Logo}`}
              src="/static/assets/img/logo.svg"
              alt="Accueil - Code du travail numérique, Ministère du Travail"
              width={145}
              height={50}
              priority
            />
          </Link>
        </div>
        <div className={fr.cx("fr-header__navbar")}>
          <button
            id="fr-header-search-button"
            type="button"
            className={fr.cx("fr-btn--search", "fr-btn")}
            title="Rechercher"
            {...(resolvedSearchModalId
              ? { "aria-controls": resolvedSearchModalId }
              : {})}
            {...(enableDsfrModalBehavior
              ? {
                  "data-fr-opened": "false",
                  "data-fr-js-modal-button": "true",
                }
              : {})}
            onClick={onSearchClick}
          >
            Rechercher
          </button>
          <button
            type="button"
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
