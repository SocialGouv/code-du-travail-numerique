"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { useCallback, useEffect, useMemo } from "react";
import { AccessibleAlert } from "../../common/components/AccessibleAlert";
import { formatAmount } from "../domain/amount";
import {
  FIELD_DESCRIPTORS,
  PERIOD_SUFFIX,
  SALARY_FIELDS,
} from "../domain/constants";
import { selectContextualMessage } from "../domain/contextualMessage";
import type { ContextualMessageKey, SmicReference } from "../domain/types";
import { simulatorGrid } from "../styles";
import { useHiringSimulatorTracking } from "../tracking";
import { useSalarySimulation } from "../useSalarySimulation";
import { DeepDiveCards } from "./DeepDiveCards";
import { ParametersColumn } from "./ParametersColumn";
import { PeriodRadio } from "./PeriodRadio";
import { ResultsColumn } from "./ResultsColumn";
import { UrssafSimulatorLink } from "./UrssafSimulatorLink";

type Props = {
  /** SMIC préchargé côté serveur. `null` si le préchargement a échoué. */
  smicReference: SmicReference | null;
};

export const BrutNetSimulator = ({ smicReference }: Props) => {
  const {
    emitApiError,
    emitAutofill,
    emitContextualMessageClicked,
    emitContextualMessageShown,
    emitDeepDiveClicked,
    emitFieldEdited,
    emitUrssafSimulatorClicked,
  } = useHiringSimulatorTracking();

  const {
    period,
    contract,
    results,
    status,
    displayValue,
    editField,
    commitField,
    fillWith,
    setPeriod,
    setContract,
    retry,
  } = useSalarySimulation({ onApiError: emitApiError });

  /**
   * Le SMIC net vient en priorité de la dernière évaluation : le message reste
   * ainsi correct même si le préchargement serveur a échoué, puisque chaque
   * réponse le renvoie de toute façon.
   */
  const smicNetMensuel =
    results?.smicNetMensuel ?? smicReference?.netMensuel ?? null;

  const messageKey = useMemo(
    () =>
      selectContextualMessage({
        salaireNetMensuel: results?.salaireNetMensuel,
        smicNetMensuel,
      }),
    [results?.salaireNetMensuel, smicNetMensuel]
  );

  useEffect(() => {
    if (messageKey) {
      emitContextualMessageShown(messageKey);
    }
  }, [messageKey, emitContextualMessageShown]);

  const handleFieldChange = useCallback(
    (field: Parameters<typeof editField>[0], value: string) => {
      emitFieldEdited(field);
      editField(field, value);
    },
    [editField, emitFieldEdited]
  );

  const handleFill = useCallback(
    (amountMonthly: number, name: "salaire_median" | "smic") => {
      emitAutofill(name);
      fillWith(amountMonthly);
    },
    [emitAutofill, fillWith]
  );

  const handleMessageClick = useCallback(
    (key: ContextualMessageKey) => emitContextualMessageClicked(key),
    [emitContextualMessageClicked]
  );

  /**
   * Annonce lue par les lecteurs d'écran, dans une région dédiée.
   *
   * Elle est délibérément séparée du conteneur des champs : poser `aria-live`
   * sur celui-ci ferait annoncer chaque changement, y compris celui du champ où
   * l'usager est en train de taper. On n'annonce donc qu'un résultat stabilisé.
   */
  const announcement = useMemo(() => {
    if (status !== "success" || !results) {
      return "";
    }
    const amounts = SALARY_FIELDS.map(
      (field) =>
        `${FIELD_DESCRIPTORS[field].label.toLowerCase()} ${formatAmount(results[field])} €`
    ).join(", ");
    return `Résultats mis à jour : ${amounts}, ${PERIOD_SUFFIX[period].replace("€ ", "")}.`;
  }, [status, results, period]);

  return (
    <>
      <div className={simulatorGrid}>
        <PeriodRadio period={period} onChange={setPeriod} />
        <ResultsColumn
          period={period}
          results={results}
          status={status}
          messageKey={messageKey}
          displayValue={displayValue}
          onFieldChange={handleFieldChange}
          onFieldBlur={commitField}
          onMessageClick={handleMessageClick}
          onRetry={retry}
        />
        <ParametersColumn
          contract={contract}
          onContractChange={setContract}
          smicReference={smicReference}
          onFill={handleFill}
        />
      </div>

      <p
        className={fr.cx("fr-sr-only")}
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {announcement}
      </p>

      <div className={fr.cx("fr-mt-4w")}>
        <UrssafSimulatorLink
          period={period}
          contract={contract}
          salaireBrutMensuel={results?.salaireBrut ?? null}
          onClick={emitUrssafSimulatorClicked}
        />
      </div>

      <DeepDiveCards onCardClick={emitDeepDiveClicked} />

      <AccessibleAlert
        className={["fr-mt-6w"]}
        severity="info"
        title="Informations"
        data-testid="brut-net-informations"
        description="Les calculs sont indicatifs. Ils sont faits à partir des éléments que vous avez saisis et des éléments réglementaires applicables, mais ils ne tiennent pas compte de l'ensemble de votre situation. Le net après impôt est estimé au taux neutre : il ne tient pas compte de votre taux personnalisé. Ils ne se substituent pas aux décomptes réels de l'Urssaf, de l'administration fiscale ou de tout autre organisme."
      />
    </>
  );
};
