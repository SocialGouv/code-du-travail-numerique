"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useIframeResizer } from "../../common/hooks";
import Link from "next/link";

export function WidgetWithIframeResizer({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  useIframeResizer();

  return (
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
        <Link title="Code du travail numérique, Ministère du Travail" href="/">
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
  );
}
