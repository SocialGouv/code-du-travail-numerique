"use client";

import { PreviousResponse } from "src/questionnaire/type";
import { useContext } from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { DossierLicenciementContext } from "src/questionnaire";
import { useStore } from "src/questionnaire/store";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { Responses } from "./Responses";

export const Summary = ({ responses }: { responses: PreviousResponse[] }) => {
  const store = useContext(DossierLicenciementContext);
  const toolSlug = useStore(store, (state) => state.toolSlug);

  const displayableResponses = responses.filter(({ text }) => !!text);
  return (
    <div className={fr.cx("fr-mt-2w", "fr-ml-md-15v")}>
      <Responses responses={displayableResponses} />
      <div className={fr.cx("fr-mt-4w")}>
        <Button
          linkProps={{
            href: `/outils/${toolSlug}`,
          }}
          iconId="fr-icon-arrow-go-back-line"
          iconPosition="right"
        >
          Changer de situation
        </Button>
      </div>
    </div>
  );
};
