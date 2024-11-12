"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useIframeResizer } from "../../common/hooks";
import Link from "next/link";
import { useIsDark } from "@codegouvfr/react-dsfr/useIsDark";
import { useEffect } from "react";

export function WidgetWithIframeResizer({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const { setIsDark } = useIsDark();

  useEffect(() => {
    setIsDark(false);
  }, [setIsDark]);

  useIframeResizer();

  return (
    <div className={fr.cx("fr-container--fluid", "fr-p-1v")}>
      <div
        className={fr.cx(
          "fr-grid-row",
          "fr-grid-row--gutters",
          "fr-grid-row--center"
        )}
      >
        <div className={fr.cx("fr-col-12", "fr-col-md-9")}>
          <h1>{title}</h1>
        </div>

        <div className={fr.cx("fr-col-4", "fr-col-offset-md-1", "fr-col-md-2")}>
          <Link
            title="Code du travail numérique, Ministère du Travail"
            href="/"
          >
            <img
              className="fr-responsive-img"
              src="/static/assets/img/logo.svg"
              alt="Code du travail numérique"
              data-fr-js-ratio="true"
            />
          </Link>
        </div>
        <div className={fr.cx("fr-col-12", "fr-col-md-9")}>{children}</div>
      </div>
    </div>
  );
}
