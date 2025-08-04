"use client";
import { fr } from "@codegouvfr/react-dsfr";
import { useState } from "react";

import Button from "@codegouvfr/react-dsfr/Button";
import { AgreementSearchInput } from "./AgreementSearchInput";
import {
  TrackingAgreementSearchAction,
  useAgreementSearchTracking,
} from "../tracking";

export const AgreementSearch = () => {
  const [noResult, setNoResult] = useState(false);
  const { emitPreviousEvent, emitSelectEvent } = useAgreementSearchTracking();
  return (
    <>
      <AgreementSearchInput
        onSearch={(query, result) => {
          setNoResult(query.length > 2 && !result?.length);
        }}
        lineAsLink
        trackingActionName={TrackingAgreementSearchAction.AGREEMENT_SEARCH}
        onAgreementSelect={(agreement) => {
          if (agreement) {
            emitSelectEvent(
              `idcc${agreement.num}`,
              "Trouver sa convention collective"
            );
          }
        }}
      />
      <div className={fr.cx("fr-mt-2w", "fr-grid-row")}>
        <Button
          linkProps={{
            href: "/outils/convention-collective",
            onClick: emitPreviousEvent,
          }}
          priority="secondary"
          iconId="fr-icon-arrow-left-line"
        >
          Précédent
        </Button>
        {noResult && (
          <Button
            linkProps={{ href: `/outils/convention-collective/entreprise` }}
            priority="secondary"
            className={fr.cx("fr-ml-2w")}
          >
            Rechercher par entreprise
          </Button>
        )}
      </div>
    </>
  );
};
