import React, { useEffect } from "react";

import { Highlight, SectionTitle } from "../../common/stepStyles";
import { WizardStepProps } from "../../common/type/WizardType";
import { usePublicodes } from "../../publicodes";
import { mapToPublicodesSituation } from "../../publicodes/Utils";

function ResultStep({ form }: WizardStepProps): JSX.Element {
  const publicodesContext = usePublicodes();

  useEffect(() => {
    publicodesContext.setSituation(
      mapToPublicodesSituation(form.getState().values)
    );
  }, [form]);

  return (
    <>
      <SectionTitle>Durée du préavis</SectionTitle>
      <p>
        À partir des éléments que vous avez saisis, la durée du préavis de
        départ à la retraite est estimée à&nbsp;
        <Highlight>{publicodesContext.result}</Highlight> mois.
      </p>
    </>
  );
}

export { ResultStep };
