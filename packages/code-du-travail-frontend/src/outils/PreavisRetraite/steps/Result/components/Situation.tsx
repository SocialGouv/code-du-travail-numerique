import { Text } from "@socialgouv/cdtn-ui";
import { SituationElement } from "@socialgouv/modeles-social";
import React from "react";

import { DepartOuMiseRetraite } from "../../OriginStep/store";
import { Agreement } from "../../../../types";

type Props = {
  elements: SituationElement[];
  seniority: number;
};

const getAnnotations = (
  hasHandicap: boolean,
  originDepart: DepartOuMiseRetraite,
  isAgreementSupported: boolean
): JSX.Element[] => {
  if (hasHandicap && originDepart === "mise-retraite" && isAgreementSupported) {
    return [
      <Text key="handicap">
        Le salarié étant reconnu en tant que travailleur handicapé, la durée du
        préavis de mise à la retraite est doublée mais ne peut pas dépasser un
        maximum de 3 mois. Si la durée de préavis prévue par la convention
        collective est supérieure à 3 mois, le résultat conventionnel n’est pas
        doublé et c’est cette durée qui s’applique car elle est plus favorable.
      </Text>,
    ];
  }

  return [
    <Text key="handicap">
      Le salarié étant reconnu en tant que travailleur handicapé, la durée du
      préavis de départ à la retraite est doublée mais ne peut pas dépasser un
      maximum de 3 mois.
    </Text>,
  ];
};

const overrideSituation = (
  agreement: Agreement,
  hasHandicap: boolean,
  seniority?: number
): JSX.Element | null => {
  if (agreement) {
    return <>{agreement?.shortTitle}</>;
  }
  if (seniority) {
    return <>Plus de {seniority} ans</>;
  }
  if (hasHandicap) {
    return (
      <>
        Oui<sup>*</sup>
      </>
    );
  }

  return null;
};

const Situation: React.FC<Props> = () => {
  return <></>;
};

export default Situation;
