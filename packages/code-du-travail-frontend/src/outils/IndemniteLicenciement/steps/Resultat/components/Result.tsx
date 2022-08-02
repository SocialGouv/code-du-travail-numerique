import React from "react";
import { HighlightResult, SectionTitle } from "../../../../common/stepStyles";

type Props = {
  maxResult: string;
};

export default function Result(props: Props) {
  return (
    <>
      <SectionTitle>Indemnité</SectionTitle>
      <p>
        À partir des éléments que vous avez saisis, l’indemnité de licenciement
        est estimée à&nbsp;:&nbsp;
        <HighlightResult>{`${props.maxResult} € brut.`}</HighlightResult>
      </p>
    </>
  );
}
