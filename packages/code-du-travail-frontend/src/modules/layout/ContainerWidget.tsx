"use client";
import { ReactNode } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { useIframeResizer } from "../../../src/common/hooks";
import Button from "@codegouvfr/react-dsfr/Button";
import Link from "next/link";

type Props = {
  children: ReactNode;
};

export const ContainerWidget = ({ children }: Props) => {
  useIframeResizer();
  return (
    <>
      <meta name="robots" content="noindex,nofollow" />
      {children}
      <div className={fr.cx("fr-grid-row")}>
        <div>
          <Link href="/politique-confidentialite" target="_blank">
            Politique de confidentialité
          </Link>
        </div>

        <Link
          title="Code du travail numérique, Ministère du Travail"
          href="/"
          target="_blank"
          className={noTarget}
        >
          <img
            className="fr-responsive-img"
            src="/static/assets/img/logo.svg"
            alt="Code du travail numérique"
            data-fr-js-ratio="true"
          />
        </Link>
      </div>
    </>
  );
};

const noTarget = css({
  _after: {
    display: "none !important",
  },
});
