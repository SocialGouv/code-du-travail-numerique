import React from "react";

import { RuleType, SituationElement } from "../publicodes";
import { reverseValues } from "../publicodes/Utils";
import { SectionTitle } from "./stepStyles";

type PublicodesInputProps = {
  element: SituationElement;
};

const SituationInput = ({ element }: PublicodesInputProps): JSX.Element => {
  switch (element.rawNode.cdtn?.type) {
    case RuleType.Liste:
      return <>{reverseValues(element.rawNode.cdtn.valeurs)[element.value]}</>;
    case RuleType.OuiNon:
      return <>{element.value === "oui" ? "Oui" : "Non"}</>;
  }
  return (
    <>
      {element.value} {element.rawNode.unité}
    </>
  );
};

type Props = {
  situation: SituationElement[];
  annotations?: JSX.Element[];
  onOverrideInput?: (element: SituationElement) => JSX.Element;
};

const PubliSituation = ({
  situation,
  annotations,
  onOverrideInput,
}: Props): JSX.Element => (
  <>
    <SectionTitle>Les éléments saisis</SectionTitle>
    <ul>
      {situation.map((element) => {
        const overriden = onOverrideInput && onOverrideInput(element);
        return (
          <li key={element.name}>
            {element.rawNode.titre}:{" "}
            <b>
              {overriden ? overriden : <SituationInput element={element} />}
            </b>
          </li>
        );
      })}
    </ul>
    {annotations &&
      annotations.map((annotation, index) => (
        <p key={index}>
          <i>*&nbsp;{annotation}</i>
        </p>
      ))}
  </>
);

export default PubliSituation;
