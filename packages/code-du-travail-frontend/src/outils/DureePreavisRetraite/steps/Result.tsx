import React, { useEffect } from "react";

import { Highlight, SectionTitle } from "../../common/stepStyles";
import { usePublicode } from "../../publicodes/PubliContext";

function ResultStep({ form }) {
  const publicodeContext = usePublicode();

  useEffect(() => {
    publicodeContext.setSituation(form.getState().values);
  }, [form]);

  return (
    <>
      <SectionTitle>Durée du préavis</SectionTitle>
      <p>
        À partir des éléments que vous avez saisis, la durée du préavis de
        départ à la retraite est estimée à&nbsp;
        <Highlight>{publicodeContext.result}</Highlight> mois.
      </p>
    </>
  );
}

export { ResultStep };
