"use client";

import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { useSearchTracking, MatomoWidgetEvent } from "./tracking";
import Button from "@codegouvfr/react-dsfr/Button";

export const SearchWidgetDisplay: React.FC = () => {
  const { emitSearchEvent, emitWidgetEvent } = useSearchTracking();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input[name="q"]') as HTMLInputElement;
    const query = input?.value?.trim();

    if (query) {
      emitSearchEvent(query);
      emitWidgetEvent(MatomoWidgetEvent.SUBMIT_SEARCH);
      window.parent?.postMessage({ name: "button-search", kind: "click" }, "*");
    }
  };

  const onClickLogo = () => {
    window.parent?.postMessage({ name: "logo-link", kind: "click" }, "*");
    emitWidgetEvent(MatomoWidgetEvent.CLICK_LOGO);
  };

  return (
    <div className={fr.cx("fr-container")}>
      <div className={containerStyles}>
        <form target="_blank" action="/recherche" onSubmit={handleSubmit}>
          <label
            htmlFor="cdtn-search"
            className={`${labelStyles} ${fr.cx("fr-my-3v")}`}
          >
            Trouvez les réponses à vos questions en droit du travail
          </label>

          <div className={searchContainerStyles}>
            <input
              name="q"
              autoComplete="off"
              type="text"
              id="cdtn-search"
              placeholder="période d'essai"
              aria-label="Votre recherche"
              className={`${inputStyles} ${fr.cx("fr-input")} ${fr.cx("fr-my-3v")}`}
            />

            <Button
              id="button-search"
              type="submit"
              iconId="fr-icon-search-line"
              priority="primary"
              className={buttonStyles}
            >
              Rechercher
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

const containerStyles = css({
  maxWidth: "500px",
  textAlign: "center",
  margin: "auto",
});

const logoLinkStyles = css({
  display: "inline-block",
  marginBottom: fr.spacing("4v"),
});

const logoImageStyles = css({
  width: "auto",
  height: "65px",
  "@media (max-width: 576px)": {
    height: fr.spacing("8v"),
  },
});

const labelStyles = css({
  color: fr.colors.decisions.text.default.grey.default,
  fontWeight: "bold",
  fontSize: fr.spacing("4v"),
  display: "block",
});

const searchContainerStyles = css({
  width: "100%",
});

const inputStyles = css({
  margin: `${fr.spacing("4v")}`,
  height: fr.spacing("6v"),
  width: "100%",
  fontSize: fr.spacing("4v"),
});

const buttonStyles = css({
  marginTop: `${fr.spacing("3v")}`,
  height: "100%",
  display: "flex",
  alignItems: "center",
  color: fr.colors.decisions.text.actionHigh.blueFrance.default,
  cursor: "pointer",
  background: "transparent",
  border: "none",
  transition: "all 100ms ease-out",
});
