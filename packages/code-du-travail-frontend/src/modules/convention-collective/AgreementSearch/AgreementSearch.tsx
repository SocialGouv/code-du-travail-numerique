"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { useState } from "react";

import Button from "@codegouvfr/react-dsfr/Button";
import { ButtonStyle } from "../style";
import { AgreementSearchInput } from "./AgreementSearchInput";
import { useAgreementSearchTracking } from "../tracking";

export const AgreementSearch = () => {
  const [noResult, setNoResult] = useState(false);
  const { emitPreviousEvent } = useAgreementSearchTracking();
  return (
    <>
      <AgreementSearchInput
        onSearch={(query, result) => {
          setNoResult(query.length > 2 && !result?.length);
        }}
      />
      <div className={fr.cx("fr-mt-2w")}>
        <Button
          linkProps={{
            href: "/outils/convention-collective",
            onClick: emitPreviousEvent,
          }}
          priority="secondary"
          className={ButtonStyle}
        >
          Précédent
        </Button>
        {noResult && (
          <Button
            linkProps={{ href: `/outils/convention-collective/entreprise` }}
            priority="secondary"
            className={`${fr.cx("fr-ml-md-2w", "fr-mt-2w", "fr-mt-md-0")} ${ButtonStyle}`}
          >
            Rechercher par entreprise
          </Button>
        )}
      </div>
    </>
  );
};
