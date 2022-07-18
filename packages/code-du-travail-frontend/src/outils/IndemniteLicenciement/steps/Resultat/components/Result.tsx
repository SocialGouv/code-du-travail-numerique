import React from "react";
import { HighlightResult, SectionTitle } from "../../../../common/stepStyles";

type Props = {
  legalResult?: string;
  agreementResult?: string;
};

export default function Result(props: Props) {
  const maxResult = React.useMemo(
    () =>
      Math.max(
        props.legalResult ? parseInt(props.legalResult) : 0,
        props.agreementResult ? parseInt(props.agreementResult) : 0
      ),
    [props.legalResult, props.agreementResult]
  );
  return (
    <>
      <SectionTitle>Indemnité</SectionTitle>
      <p>
        À partir des éléments que vous avez saisis, l’indemnité de licenciement
        est estimée à&nbsp;:&nbsp;
        <HighlightResult>{`${maxResult} € brut.`}</HighlightResult>
      </p>
    </>
  );
}
