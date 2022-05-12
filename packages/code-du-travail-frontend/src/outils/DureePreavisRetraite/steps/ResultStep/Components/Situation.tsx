import { Text } from "@socialgouv/cdtn-ui";
import { SituationElement } from "@socialgouv/modeles-social";
import React from "react";

import PubliSituation from "../../../../common/PubliSituation";
import { PreavisRetraiteFormState } from "../../../form";
import { getSupportedCC } from "../../AgreementStep/RenderStep";

type Props = {
  content: PreavisRetraiteFormState;
  elements: SituationElement[];
  minSeniorityYear: number;
};

const Situation: React.FC<Props> = ({
  content,
  elements,
  minSeniorityYear,
}) => {
  const overrideSituation = (element: SituationElement): JSX.Element | null => {
    if (element.name === "contrat salarié - convention collective") {
      return <>{content.ccn?.selected?.shortTitle}</>;
    }
    if (
      element.name === "contrat salarié - ancienneté" &&
      content.seniority?.moreThanXYear
    ) {
      return <>Plus de {minSeniorityYear} ans</>;
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

  const getAnnotations = (content: PreavisRetraiteFormState): JSX.Element[] => {
    if (
      content.infos &&
      content.infos["contrat salarié - travailleur handicapé"] === "oui"
    ) {
      if (content.origin?.isRetirementMandatory) {
        if (
          content.ccn &&
          content.ccn.selected &&
          getSupportedCC()
            .map((v) => v.idcc)
            .includes(content.ccn.selected.num)
        ) {
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

export default Situation;
