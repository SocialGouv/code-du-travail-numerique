import { Accordion } from "@socialgouv/cdtn-ui";
import React from "react";

import PubliReferences from "../../common/PubliReferences";
import { WizardStepProps } from "../../common/type/WizardType";
import { usePublicodes } from "../../publicodes";
import DecryptedResult from "./component/DecryptedResult";
import ShowResult from "./component/ShowResult";
import { Situation } from "./component/Situation";
import WarningResult from "./component/WarningResult";

function ResultStep({ form }: WizardStepProps): JSX.Element {
  const publicodesContext = usePublicodes();

  const formValues = form.getState().values;

  return (
    <>
      <ShowResult publicodesContext={publicodesContext} />
      <Accordion
        items={[
          {
            body: (
              <>
                <Situation
                  content={formValues}
                  elements={publicodesContext.situation}
                />
                <DecryptedResult
                  data={formValues}
                  publicodesContext={publicodesContext}
                />
                <PubliReferences
                  references={publicodesContext.getReferences()}
                />
              </>
            ),
            title: <p>Voir le détail du calcul</p>,
          },
        ]}
      />
      <WarningResult publicodesContext={publicodesContext} data={formValues} />
    </>
  );
}

export { ResultStep };
