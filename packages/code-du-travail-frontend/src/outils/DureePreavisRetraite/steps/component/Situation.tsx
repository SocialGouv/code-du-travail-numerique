import { Text } from "@socialgouv/cdtn-ui";
import { supportedCcn } from "@socialgouv/modeles-social";
import React from "react";

import PubliSituation from "../../../common/PubliSituation";
import { FormContent } from "../../../common/type/WizardType";
import { SituationElement } from "../../../publicodes";
import { SeniorityMaximum } from "../constants";

type Props = {
  content: FormContent;
  elements: SituationElement[];
};

export const Situation: React.FC<Props> = ({ content, elements }) => {
  const overrideSituation = (element: SituationElement): JSX.Element | null => {
    if (element.name === "contrat salarié - convention collective") {
      return <>{content.ccn?.selected?.shortTitle}</>;
    }
    if (
      element.name === "contrat salarié - ancienneté" &&
      content.seniorityMaximum
    ) {
      return element.value === SeniorityMaximum.GREATER_THAN_5_YEARS ? (
        <>Plus de 5 ans</>
      ) : (
        <>Plus de 2 ans</>
      );
    }
    if (
      element.name === "contrat salarié - travailleur handicapé" &&
      element.value === "oui"
    ) {
      return (
        <>
          Oui<sup>*</sup>
        </>
      );
    }

    return null;
  };

  const getAnnotations = (content: FormContent): JSX.Element[] => {
    if (
      content.infos &&
      content.infos["contrat salarié - travailleur handicapé"] === "oui"
    ) {
      if (content["contrat salarié - mise à la retraite"] === "oui") {
        if (content.ccn && supportedCcn.includes(content.ccn.selected?.num)) {
          return [
            <Text key="handicap">
              Le salarié étant reconnu en tant que travailleur handicapé, la
              durée du préavis de mise à la retraite est doublée mais ne peut
              pas dépasser un maximum de 3 mois. Si la durée de préavis prévue
              par la convention collective est supérieure à 3 mois, le résultat
              conventionnel n’est pas doublé et c’est cette durée qui s’applique
              car elle est plus favorable.
            </Text>,
          ];
        }
      }

      return [
        <Text key="handicap">
          Le salarié étant reconnu en tant que travailleur handicapé, la durée
          du préavis de départ à la retraite est doublée mais ne peut pas
          dépasser un maximum de 3 mois.
        </Text>,
      ];
    }
    return [];
  };
  return (
    <PubliSituation
      situation={elements}
      onOverrideInput={overrideSituation}
      annotations={getAnnotations(content)}
    />
  );
};
