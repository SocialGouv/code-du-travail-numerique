import React, { useEffect } from "react";

import PubliReferences from "../../common/PubliReferences";
import ShowDetails from "../../common/ShowDetails";
import { WizardStepProps } from "../../common/type/WizardType";
import { usePublicodes } from "../../publicodes";
import { mapToPublicodesSituation } from "../../publicodes/Utils";
import DecryptedResult from "./component/DecryptedResult";
import ShowResult from "./component/ShowResult";
import { Situation } from "./component/Situation";
import WarningResult from "./component/WarningResult";

function ResultStep({ form }: WizardStepProps): JSX.Element {
  const publicodesContext = usePublicodes();
  const formValues = form.getState().values;

  useEffect(() => {
    publicodesContext.setSituation(
      mapToPublicodesSituation(form.getState().values)
    );
  }, []);

  return (
    <>
      <ShowResult publicodesContext={publicodesContext} />
      <ShowDetails>
        <Situation
          content={formValues}
          elements={publicodesContext.situation}
        />
        <DecryptedResult
          data={formValues}
          publicodesContext={publicodesContext}
        />
        <PubliReferences references={publicodesContext.getReferences()} />
      </ShowDetails>
      <WarningResult publicodesContext={publicodesContext} data={formValues} />
    </>
  );
}

export { ResultStep };
