"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { Enterprise } from "../types";
import { useEffect, useRef } from "react";
import { focusableTitle } from "src/modules/common/focusableTitle";

type Props = {
  enterprise: Omit<Enterprise, "complements">;
  level: 2 | 3;
  hideTitle?: boolean;
};

export const EnterpriseAgreementSelectionDetail = ({
  enterprise,
  level,
  hideTitle = false,
}: Props) => {
  const titleRef = useRef<HTMLParagraphElement>(null);
  const TitleTag = `h${level}` as "h2" | "h3";
  useEffect(() => {
    setTimeout(() => {
      titleRef?.current?.focus();
      titleRef?.current?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  }, []);

  const { label, address, activitePrincipale, siret } =
    enterprise.matchingEtablissementCount === 1
      ? {
          label:
            enterprise.firstMatchingEtablissement?.nomCommercial ??
            enterprise.label,
          address:
            enterprise.firstMatchingEtablissement?.address ??
            enterprise.address,
          activitePrincipale:
            enterprise.firstMatchingEtablissement?.activitePrincipale ??
            enterprise.activitePrincipale,
          siret:
            enterprise.firstMatchingEtablissement?.siret ?? enterprise.siret,
        }
      : {
          ...enterprise,
        };

  return (
    <>
      <p
        className={`${fr.cx("fr-h4", "fr-mt-2w", "fr-mb-0")} ${focusableTitle}`}
        ref={titleRef}
        tabIndex={-1}
        id={"your-enterprise"}
      >
        Votre entreprise
      </p>
      <TitleTag className={fr.cx("fr-h6", "fr-m-0", "fr-mt-2w")}>
        {label}
      </TitleTag>
      {activitePrincipale && (
        <p className={fr.cx("fr-m-0")}>Activité&nbsp;: {activitePrincipale}</p>
      )}
      <p className={fr.cx("fr-mb-2w")}>{address}</p>
    </>
  );
};
