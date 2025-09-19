"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useState } from "react";
import Input from "@codegouvfr/react-dsfr/Input";
import { css } from "@styled-system/css";
import { useABTesting } from "../../config/MatomoAnalytics";
import { ABTestVariant } from "../../config/matomo/ABTestingConstant";

type HeaderSearchProps = {
  onSearchSubmit: (data: string) => void;
};

export const HeaderSearch = ({ onSearchSubmit }: HeaderSearchProps) => {
  const [value, setValue] = useState("");

  const { abTest } = useABTesting();

  const label =
    abTest.variant === ABTestVariant.NATURAL
      ? "Que souhaitez-vous savoir ?"
      : "Rechercher sur le site";

  return (
    <div className={fr.cx("fr-header__tools")}>
      <div
        className={fr.cx("fr-header__search", "fr-modal")}
        id="fr-header-search-modal"
        data-fr-js-modal="true"
        data-fr-js-header-modal="true"
      >
        <div className={fr.cx("fr-container", "fr-container-lg--fluid")}>
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
            onSubmit={(e) => {
              e.preventDefault();
              onSearchSubmit(value);
            }}
          >
            <div className={`${searchContainer}`}>
              <Input
                label={<>{label}</>}
                hideLabel
                nativeInputProps={{
                  placeholder: label,
                  type: "text",
                  // @ts-ignore
                  "data-testid": "search-input",
                  "aria-labelledby": undefined,
                  onChange: (e) => {
                    setValue(e.target.value);
                  },
                }}
                className={`${fr.cx("fr-mb-0")}`}
                classes={{
                  nativeInputOrTextArea: inputSearchNoMarginTop,
                  root: rootInputCss,
                }}
              />
              <button
                className="fr-btn fr-icon-search-line fr-btn--icon"
                title="Rechercher"
                type="submit"
              >
                <span className={fr.cx("fr-sr-only")}>Rechercher</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const searchContainer = css({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  width: "100%",
  position: "relative",
});

const rootInputCss = css({
  width: "100%",
});

const inputSearchNoMarginTop = css({
  marginTop: "0!",
});
