import React, { useEffect } from "react";

import PubliReferences from "../../common/PubliReferences";
import ShowDetails from "../../common/ShowDetails";
import { WizardStepProps } from "../../common/type/WizardType";
import {
  mapToPublicodesSituationForPreavisDeRetraite,
  PublicodesPreavisRetraiteResult,
  usePublicodes,
} from "../../publicodes";
import DecryptedResult from "./component/DecryptedResult";
import ShowResult from "./component/ShowResult";
import { Situation } from "./component/Situation";
import WarningResult from "./component/WarningResult";

function ResultStep({ form }: WizardStepProps): JSX.Element {
  const publicodesContext = usePublicodes<PublicodesPreavisRetraiteResult>();
  const formValues = form.getState().values;

  useEffect(() => {
    publicodesContext.setSituation(
      mapToPublicodesSituationForPreavisDeRetraite(form.getState().values)
    );
  }, []);

  return (
    <>
      <ShowResult />
      <ShowDetails>
        <Situation
          content={formValues}
          elements={publicodesContext.situation}
        />
        <DecryptedResult data={formValues} />
        <PubliReferences references={publicodesContext.getReferences()} />
      </ShowDetails>
      <WarningResult
        resultValueInDays={publicodesContext.result.valueInDays}
        type={
          formValues["contrat salarié - mise à la retraite"] === "oui"
            ? "mise"
            : "depart"
        }
        ccNumber={formValues?.ccn?.num}
      />
    </>
  );
}

export { ResultStep };
