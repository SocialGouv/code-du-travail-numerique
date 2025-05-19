"use client";

import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { useSearchTracking, MatomoWidgetEvent } from "./tracking";
import Image from "next/image";
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

  return (
    <div className={fr.cx("fr-container")}>
      <div className={containerStyles}>
        <a
          href="/"
          title="Le Code du travail numérique - Obtenez les réponses à vos questions sur le droit du travail."
          onClick={() => {
            window.parent?.postMessage(
              { name: "logo-link", kind: "click" },
              "*"
            );
            emitWidgetEvent(MatomoWidgetEvent.CLICK_LOGO);
          }}
          target="_blank"
          className={logoLinkStyles}
        >
          <Image
            src="/static/assets/img/logo-cdtn.svg"
            alt="Code du travail numérique"
            width={200}
            height={65}
            className={logoImageStyles}
          />
        </a>

        <form
          target="_blank"
          action="/recherche"
          onSubmit={handleSubmit}
          className={formStyles}
        >
          <label htmlFor="cdtn-search" className={labelStyles}>
            Trouvez les réponses à vos questions en droit du travail
          </label>

          <div className={searchContainerStyles}>
            <Image
              alt="Recherche"
              src="/static/assets/img/logo-marianne.png"
              width={32}
              height={20}
              className={marianneImageStyles}
            />

            <input
              name="q"
              autoComplete="off"
              type="text"
              id="cdtn-search"
              placeholder="période d'essai"
              aria-label="Votre recherche"
              className={inputStyles}
            />

            <Button
              id="button-search"
              type="submit"
              iconId="fr-icon-search-line"
              priority="tertiary no outline"
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

const formStyles = css({
  padding: `0 ${fr.spacing("2v")}`,
});

const labelStyles = css({
  color: fr.colors.decisions.text.default.grey.default,
  fontWeight: "bold",
  fontSize: fr.spacing("4v"),
  margin: `${fr.spacing("2v")} 0 ${fr.spacing("4v")}`,
  display: "block",
});

const searchContainerStyles = css({
  position: "relative",
  width: "100%",
  borderRadius: fr.spacing("1v"),
  boxShadow: `${fr.colors.decisions.background.alt.blueFrance.default} 0 ${fr.spacing("1v")} ${fr.spacing("3v")}`,
});

const marianneImageStyles = css({
  position: "absolute",
  zIndex: 0,
  height: fr.spacing("5v"),
  left: fr.spacing("3v"),
  top: "calc(50% - 10px)",
});

const inputStyles = css({
  position: "relative",
  padding: `${fr.spacing("4v")} ${fr.spacing("6v")} ${fr.spacing("4v")} 84px`,
  height: fr.spacing("6v"),
  width: "100%",
  fontSize: fr.spacing("4v"),
  WebkitAppearance: "none",
  backgroundColor: "transparent",
  border: "none",
});

const buttonStyles = css({
  position: "absolute",
  zIndex: 2,
  top: 0,
  right: 0,
  padding: `0 ${fr.spacing("3v")}`,
  height: "100%",
  display: "flex",
  alignItems: "center",
  color: fr.colors.decisions.text.actionHigh.blueFrance.default,
  cursor: "pointer",
  background: "transparent",
  border: "none",
  transition: "all 100ms ease-out",
  WebkitAppearance: "none",
  "&:hover": {
    opacity: 0.5,
    transform: "translateY(-2px)",
  },
});
