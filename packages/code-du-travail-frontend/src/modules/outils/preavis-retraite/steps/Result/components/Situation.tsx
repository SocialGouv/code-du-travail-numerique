import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { DepartOuMiseRetraite } from "../../OriginStep/store";
import { getSenioritySituationMessage } from "../../../agreements/seniority/messages";
import { AgreementInformation } from "src/modules/outils/indemnite-depart/common";
import { Agreement } from "src/modules/outils/indemnite-depart/types";
import { publicodesUnitTranslator } from "src/modules/outils/common/publicodes";

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
      <h2>Les éléments saisis</h2>
      <ul>
        <li key="originDepart" data-testid="situation-originDepart">
          Origine du départ :{" "}
          <strong>
            {originDepart === "depart-retraite"
              ? "Départ à la retraite"
              : "Mise à la retraite"}
          </strong>
        </li>
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
            {publicodesUnitTranslator(
              info.value.replace(/&apos;/g, ""),
              info.unit
            )}
          </li>
        ))}
        {seniorityInMonths && (
          <li key="ancienneté" data-testid="situation-ancienneté">
            Ancienneté du salarié : <strong>{seniorityInMonths} mois</strong>
          </li>
        )}
        {seniorityMoreThanXYears && (
          <li key="ancienneté" data-testid="situation-ancienneté">
            Ancienneté du salarié :{" "}
            <strong>{getSenioritySituationMessage(agreement?.num)}</strong>
          </li>
        )}
      </ul>
      {hasHandicap &&
      originDepart === "mise-retraite" &&
      isAgreementSupported ? (
        <p
          className={fr.cx("fr-text--xs")}
          style={{ fontStyle: "italic" }}
          data-testid="situation-note-handicap-1"
        >
          *&nbsp;Le salarié étant reconnu en tant que travailleur handicapé, la
          durée du préavis de mise à la retraite est doublée mais ne peut pas
          dépasser un maximum de 3 mois. Si la durée de préavis prévue par la
          convention collective est supérieure à 3 mois, le résultat
          conventionnel n&apos;est pas doublé et c&apos;est cette durée qui
          s&apos;applique car elle est plus favorable.
        </p>
      ) : (
        hasHandicap && (
          <p
            className={fr.cx("fr-text--xs")}
            style={{ fontStyle: "italic" }}
            data-testid="situation-note-handicap-2"
          >
            *&nbsp;Le salarié étant reconnu en tant que travailleur handicapé,
            la durée du préavis de départ à la retraite est doublée mais ne peut
            pas dépasser un maximum de 3 mois.
          </p>
        )
      )}
    </>
  );
};

export default Situation;
