import { Paragraph } from "@socialgouv/cdtn-ui";
import React from "react";

import { reverseValues, RuleType, SituationElement } from "../publicodes";
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
  onOverrideInput?: (element: SituationElement) => JSX.Element | null;
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
          <>
            {element.rawNode.titre && (
              <li key={element.name}>
                {element.rawNode.titre}&nbsp;:&nbsp;
                <strong>
                  {overriden ? overriden : <SituationInput element={element} />}
                </strong>
              </li>
            )}
          </>
        );
      })}
    </ul>
    {annotations &&
      annotations.map((annotation, index) => (
        <Paragraph key={index}>
          <i>*&nbsp;{annotation}</i>
        </Paragraph>
      ))}
  </>
);

export default PubliSituation;
