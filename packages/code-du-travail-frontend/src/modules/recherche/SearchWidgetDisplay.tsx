"use client";

import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { useSearchTracking, MatomoWidgetEvent } from "./tracking";
import Image from "next/image";
import Button from "@codegouvfr/react-dsfr/Button";
import Link from "next/link";
import { useIframeResizer } from "../../common/hooks";

export const SearchWidgetDisplay: React.FC = () => {
  const { emitSearchEvent, emitWidgetEvent } = useSearchTracking();
  useIframeResizer();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const input = form.querySelector('input[name="q"]') as HTMLInputElement;
    const query = input?.value?.trim();

    emitWidgetEvent(MatomoWidgetEvent.SUBMIT_SEARCH);
    window.parent?.postMessage({ name: "button-search", kind: "click" }, "*");

    if (query) {
      emitSearchEvent(query);
    }

    form.submit();
  };

  const onClickLogo = () => {
    window.parent?.postMessage({ name: "logo-link", kind: "click" }, "*");
    emitWidgetEvent(MatomoWidgetEvent.CLICK_LOGO);
  };

  return (
    <div className={`${containerStyles} ${fr.cx("fr-p-2w")}`}>
      <div className={fr.cx("fr-mb-3w")}>
        <Link
          title="Le Code du travail numérique - Obtenez les réponses à vos questions sur le droit du travail."
          href="/"
          target="_blank"
          className={logoLinkStyles}
        >
          <Image
            src="/static/assets/img/logo.svg"
            alt="Code du travail numérique"
            width={144}
            height={65}
            onClick={onClickLogo}
          />
        </Link>
      </div>

      <form target="_blank" action="/recherche" onSubmit={handleSubmit}>
        <label
          htmlFor="cdtn-search"
          className={`${labelStyles} ${fr.cx("fr-mb-3w")}`}
        >
          Trouvez les réponses à vos questions en droit du travail
        </label>

        <div className={searchContainerStyles}>
          <input
            name="q"
            autoComplete="off"
            type="text"
            id="cdtn-search"
            placeholder="Période d'essai"
            aria-label="Votre recherche sur le code du travail numérique"
            className={fr.cx("fr-input")}
          />

          <Button
            id="button-search"
            type="submit"
            iconId="fr-icon-search-line"
            priority="primary"
          >
            Rechercher
          </Button>
        </div>
      </form>
    </div>
  );
};

const containerStyles = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
});

const logoLinkStyles = css({
  _after: {
    display: "none !important",
  },
});

const labelStyles = css({
  fontWeight: "bold",
  display: "block",
  textAlign: "center",
});

const searchContainerStyles = css({
  width: "100%",
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});
