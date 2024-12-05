"use client";
import { ReactNode, useEffect } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { useIframeResizer } from "../../../src/common/hooks";
import Link from "next/link";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { LogoLink } from "../common/LogoLink";

type Props = {
  children: ReactNode;
};

export const ContainerWidget = ({ children }: Props) => {
  const { setIsDark } = useIsDark();

  useEffect(() => {
    setIsDark(false);
  }, []);

  useIframeResizer();
  return (
    <>
      <meta name="robots" content="noindex,nofollow" />
      {children}
      <div className={fr.cx("fr-grid-row", "fr-grid-row--middle")}>
        <div className={fr.cx("fr-col-md-10", "fr-col-sm-8", "fr-col-6")}>
          <Link href="/politique-confidentialite" target="_blank">
            Politique de confidentialité
          </Link>
        </div>
        <div
          className={fr.cx(
            "fr-col-md-2",
            "fr-col-sm-4",
            "fr-col-6",
            "fr-mt-md-0",
            "fr-mt-2w"
          )}
        >
          <LogoLink />
        </div>
      </div>
    </>
  );
};
