import React from "react";
import { Agreement } from "../../../../types";
import { SectionTitle } from "../../../../common/stepStyles";
import { DepartOuMiseRetraite } from "../../OriginStep/store";
import { Paragraph } from "@socialgouv/cdtn-ui";
import { PublicodesInformation } from "../../../../CommonIndemniteDepart/steps/Informations/store";

type Props = {
  situations: PublicodesInformation[];
  seniorityInMonths?: string;
  agreement?: Agreement;
  hasHandicap?: boolean;
  originDepart: DepartOuMiseRetraite;
  isAgreementSupported?: boolean;
};

const Situation: React.FC<Props> = ({
  situations,
  agreement,
  seniorityInMonths,
  hasHandicap,
  originDepart,
  isAgreementSupported,
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
        {agreement && (
          <li
            key="convention-collective"
            data-testid="situation-convention collective"
          >
            Convention collective : <strong>{agreement.shortTitle}</strong>
          </li>
        )}
        {hasHandicap && (
          <li key="handicap" data-testid="situation-handicap">
            Travailleur handicapé :{" "}
            <strong>
              Oui<sup>*</sup>
            </strong>
          </li>
        )}
        )
        {situations.map((element) => {
          return (
            <li key={element.id} data-testid={`situation-${element.id}`}>
              {element.question.name}&nbsp;:&nbsp;
              <strong>{element.info}</strong>
            </li>
          );
        })}
      </ul>
      {hasHandicap &&
      originDepart === "mise-retraite" &&
      isAgreementSupported ? (
        <Paragraph italic>
          *&nbsp;Le salarié étant reconnu en tant que travailleur handicapé, la
          durée du préavis de mise à la retraite est doublée mais ne peut pas
          dépasser un maximum de 3 mois. Si la durée de préavis prévue par la
          convention collective est supérieure à 3 mois, le résultat
          conventionnel n’est pas doublé et c’est cette durée qui s’applique car
          elle est plus favorable.
        </Paragraph>
      ) : (
        hasHandicap && (
          <Paragraph italic>
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
