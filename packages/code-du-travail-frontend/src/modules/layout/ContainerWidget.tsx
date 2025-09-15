"use client";
import { ReactNode } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import Link from "../common/Link";
import { LogoLink } from "../common/LogoLink";
import { useIframeResizer } from "../utils/useIframeResizer";

type Props = {
  children: ReactNode;
};

export const ContainerWidget = ({ children }: Props) => {
  useIframeResizer();
  return (
    <>
      <meta name="robots" content="noindex,nofollow" />
      {children}
      <div
        className={fr.cx(
          "fr-grid-row",
          "fr-grid-row--middle",
          "fr-grid-row--gutters",
          "fr-mx-md-3w",
          "fr-mx-1w"
        )}
      >
        <div className={fr.cx("fr-col-md-10", "fr-col-sm-8", "fr-col-6")}>
          <Link
            href="/politique-confidentialite"
            target="_blank"
            title="Politique de confidentialité"
          >
            Politique de confidentialité
          </Link>
        </div>
        <div className={fr.cx("fr-col-md-2", "fr-col-sm-4", "fr-col-6")}>
          <LogoLink />
        </div>
      </div>
    </>
  );
};
