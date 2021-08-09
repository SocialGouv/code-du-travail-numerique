import { Accordion } from "@socialgouv/cdtn-ui";
import React from "react";

import PubliReferences from "../../common/PubliReferences";
import PubliSituation from "../../common/PubliSituation";
import { FormContent, WizardStepProps } from "../../common/type/WizardType";
import { PublicodesContextInterface, usePublicodes } from "../../publicodes";
import DecryptedResult from "./component/DecryptedResult";
import ShowResult from "./component/ShowResult";
import WarningResult from "./component/WarningResult";

interface Props {
  content: FormContent;
  publicodesContext: PublicodesContextInterface;
}

const ResultDetail: React.FC<Props> = ({ content, publicodesContext }) => {
  const references = publicodesContext.getReferences();

  return (
    <>
      <PubliSituation situation={publicodesContext.situation} form={content} />
      <DecryptedResult data={content} publicodesContext={publicodesContext} />
      <PubliReferences references={references} />
    </>
  );
};

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
              <ResultDetail
                content={formValues}
                publicodesContext={publicodesContext}
              />
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
