import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { DisqualificationReason } from "../../Informations/store/types";
import { AccessibleAlert } from "src/modules/outils/common/components/AccessibleAlert";

type Props = {
  reason: DisqualificationReason;
};

const CDD_MESSAGES: Record<
  Extract<DisqualificationReason, { kind: "cddCondition" }>["key"],
  string
> = {
  finContratPeriodeDessai:
    "Lorsque le CDD a été rompu pendant la période d'essai, le salarié en CDD n'a pas le droit à une prime de précarité.",
  propositionCDIFindeContrat:
    "Le salarié en CDD qui est immédiatement embauché dans l'entreprise en CDI, sans interruption, sur un même poste ou sur un poste différent, n'a pas le droit à une prime de précarité.",
  refusCDIFindeContrat:
    "Le salarié en CDD qui refuse un CDI pour occuper le même emploi ou un emploi similaire dans l'entreprise avec une rémunération au moins équivalente, n'a pas le droit à une prime de précarité.",
  interruptionFauteGrave:
    "Lorsque le CDD est rompu de manière anticipée à l'initiative du salarié, pour faute grave, pour faute lourde ou en cas de force majeure, le salarié en CDD n'a pas le droit à une prime de précarité.",
  refusRenouvellementAuto:
    "Le salarié en CDD qui refuse le renouvellement de son CDD alors que son contrat prévoyait dès l'origine son renouvellement et ses modalités de renouvellement n'a pas le droit à une prime de précarité.",
};

const CTT_MESSAGES: Record<
  Extract<DisqualificationReason, { kind: "cttCondition" }>["key"],
  string
> = {
  cttFormation:
    "Ce type de contrat ne permet pas au salarié d'avoir droit à une prime de précarité.",
  ruptureContratFauteGrave:
    "Lorsque le contrat de travail temporaire (contrat d'intérim) est rompu de manière anticipée à l'initiative du salarié, pour faute grave du salarié ou en cas de force majeure, le salarié n'a pas le droit à une prime de précarité.",
  propositionCDIFinContrat:
    "Le salarié en contrat de travail temporaire (contrat d'intérim) qui est immédiatement embauché en CDI au sein de l'entreprise dans laquelle il effectuait sa mission n'a pas le droit à une prime de précarité.",
  refusSouplesse:
    "Le salarié en contrat d'intérim qui refuse la mise en œuvre de la souplesse prévue dans son contrat n'a pas le droit à une prime de précarité.",
};

const AGREEMENT_MESSAGES: Record<string, string> = {
  "1486:hasCdiProposal":
    "Selon votre convention collective, le salarié en contrat d'intervention qui, à l'issue de son contrat, a reçu une proposition d'un CDI, n'a pas le droit à une prime d'intervention.",
  "1516:hasCdiRenewal":
    "Selon votre convention collective, le salarié en contrat d'usage qui, à l'issu de son contrat, poursuit par un CDI, n'a pas le droit à une indemnité dite \"d'usage\".",
  "2511:hasCdiRenewal":
    "Selon votre convention collective, lorsque le contrat d'intervention est transformé en CDI, le salarié n'a pas le droit à une prime d'intervention.",
  "3127:hasEquivalentCdiRenewal":
    "Selon votre convention collective, lorsque le contrat de mission ponctuelle est transformé en CDI pour un poste et une durée équivalents, le salarié n'a pas le droit à une prime d'intervention.",
};

export const resolveDisqualificationMessage = (
  reason: DisqualificationReason
): string => {
  switch (reason.kind) {
    case "excludedCddType":
      return "Ce type de contrat ne permet pas au salarié d'avoir droit à une prime de précarité.";
    case "cddCondition":
      return CDD_MESSAGES[reason.key];
    case "cttCondition":
      return CTT_MESSAGES[reason.key];
    case "agreementCondition":
      return (
        AGREEMENT_MESSAGES[`${reason.idcc}:${reason.key}`] ??
        "Ce type de contrat ne permet pas au salarié d'avoir droit à une prime de précarité."
      );
  }
};

const DisqualificationMessage: React.FC<Props> = ({ reason }) => {
  const body = resolveDisqualificationMessage(reason);

  return (
    <div data-testid="disqualification-message">
      <h3 className={fr.cx("fr-mt-3w", "fr-h3")}>Indemnité de précarité</h3>
      <p className={fr.cx("fr-mb-3w", "fr-pr-md-2v")}>
        À partir des éléments que vous avez saisis, le montant de votre
        indemnité est estimé à&nbsp;:
      </p>
      <p>
        <strong className={fr.cx("fr-h2")}>Aucune indemnité</strong>
      </p>
      <AccessibleAlert
        description={body}
        severity="warning"
        className={["fr-mt-3w"]}
      />
    </div>
  );
};

export default DisqualificationMessage;
