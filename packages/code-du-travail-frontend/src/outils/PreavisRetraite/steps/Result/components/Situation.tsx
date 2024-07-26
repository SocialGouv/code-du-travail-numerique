import React from "react";
import { Agreement } from "../../../../types";
import { SectionTitle } from "../../../../common/stepStyles";
import { DepartOuMiseRetraite } from "../../OriginStep/store";
import { Paragraph } from "@socialgouv/cdtn-ui";
import { publicodesUnitTranslator } from "../../../../publicodes";
import { AgreementInformation } from "../../../../CommonIndemniteDepart/common";
import { getSenioritySituationMessage } from "../../../agreements/seniority/messages";

type Props = {
  situations: AgreementInformation[];
  seniorityInMonths?: string;
  agreement?: Agreement;
  originDepart: DepartOuMiseRetraite;
  isAgreementSupported?: boolean;
  hasHandicap?: boolean;
  seniorityMoreThanXYears?: boolean;
};

const Situation: React.FC<Props> = ({
  situations,
  agreement,
  seniorityInMonths,
  originDepart,
  isAgreementSupported,
  hasHandicap,
  seniorityMoreThanXYears,
}) => {
  return (
    <>
      <SectionTitle>Les éléments saisis</SectionTitle>
      <ul>
        <li key="originDepart" data-testid="situation-originDepart">
          Origine du départ :{" "}
          <strong>
            {originDepart === "depart-retraite"
              ? "Départ à la retraite"
              : "Mise à la retraite"}
          </strong>
        </li>
        {seniorityInMonths && (
          <li key="ancienneté" data-testid="situation-ancienneté">
            Ancienneté : <strong>{seniorityInMonths} mois</strong>
          </li>
        )}
        {seniorityMoreThanXYears && (
          <li key="ancienneté" data-testid="situation-ancienneté">
            Ancienneté :{" "}
            <strong>{getSenioritySituationMessage(agreement?.num)}</strong>
          </li>
        )}
        {agreement && (
          <li
            key="convention-collective"
            data-testid="situation-convention collective"
          >
            Convention collective : <strong>{agreement.shortTitle}</strong>
          </li>
        )}
        {situations.map((info, index) => (
          <li
            key={"agreement-" + index}
            data-testid={`situation-${info.label}`}
          >
            {info.label}&nbsp;:&nbsp;
            <strong>
              {info.value.replace(/^'|'$/g, "")}
              {info.label === "Travailleur handicapé" &&
                info.value === "'Oui'" && <sup>*</sup>}
            </strong>
            &nbsp;
            {publicodesUnitTranslator(info.value.replace(/'/g, ""), info.unit)}
          </li>
        ))}
      </ul>
      {hasHandicap &&
      originDepart === "mise-retraite" &&
      isAgreementSupported ? (
        <Paragraph italic data-testid="situation-note-handicap-1">
          *&nbsp;Le salarié étant reconnu en tant que travailleur handicapé, la
          durée du préavis de mise à la retraite est doublée mais ne peut pas
          dépasser un maximum de 3 mois. Si la durée de préavis prévue par la
          convention collective est supérieure à 3 mois, le résultat
          conventionnel n’est pas doublé et c’est cette durée qui s’applique car
          elle est plus favorable.
        </Paragraph>
      ) : (
        hasHandicap && (
          <Paragraph italic data-testid="situation-note-handicap-2">
            *&nbsp;Le salarié étant reconnu en tant que travailleur handicapé,
            la durée du préavis de départ à la retraite est doublée mais ne peut
            pas dépasser un maximum de 3 mois.
          </Paragraph>
        )
      )}
    </>
  );
};

export default Situation;
