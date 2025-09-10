"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { Enterprise } from "../types";
import { useEffect, useRef } from "react";

type Props = {
  enterprise: Omit<Enterprise, "complements">;
};

export const EnterpriseAgreementSelectionDetail = ({ enterprise }: Props) => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    setTimeout(() => {
      titleRef?.current?.focus();
      titleRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  return (
    <>
      <p
        className={fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")}
        ref={titleRef}
        tabIndex={-1}
        id={"your-enterprise"}
      >
        Votre entreprise
      </p>
      <h2 className={fr.cx("fr-h6", "fr-m-0", "fr-mt-2w")}>
        {enterprise.label}
      </h2>
      {enterprise.activitePrincipale && (
        <p className={fr.cx("fr-m-0")}>
          Activité&nbsp;: {enterprise.activitePrincipale}
        </p>
      )}
      <p className={fr.cx("fr-mb-2w")}>{enterprise.address}</p>
    </>
  );
};
