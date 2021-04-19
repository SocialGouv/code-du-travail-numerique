import React, { useEffect } from "react";

import { Highlight, SectionTitle } from "../../common/stepStyles";
import { WizardStepProps } from "../../common/type/WizardType";
import { usePublicodes } from "../../publicodes";

function ResultStep({
  form,
}: WizardStepProps<Record<string, string>>): JSX.Element {
  const publicodesContext = usePublicodes();

  useEffect(() => {
    publicodesContext.setSituation(form.getState().values);
  }, [form, publicodesContext]);

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
