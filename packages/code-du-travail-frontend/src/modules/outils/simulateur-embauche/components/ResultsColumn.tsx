"use client";

import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import { AccessibleAlert } from "../../common/components/AccessibleAlert";
import { formatPercentage } from "../domain/amount";
import { SALARY_FIELDS } from "../domain/constants";
import type {
  ContextualMessageKey,
  Period,
  SalaryField,
  SalaryResults,
} from "../domain/types";
import { contextualMessage, inlineNote, resultsArea } from "../styles";
import { AmountField } from "./AmountField";
import { ContextualMessage } from "./ContextualMessage";

type Props = {
  period: Period;
  results: SalaryResults | null;
  status: "idle" | "loading" | "success" | "error";
  messageKey: ContextualMessageKey | null;
  displayValue: (field: SalaryField) => string;
  onFieldChange: (field: SalaryField, value: string) => void;
  onFieldBlur: () => void;
  onMessageClick: (key: ContextualMessageKey) => void;
  onRetry: () => void;
};

export const ResultsColumn = ({
  period,
  results,
  status,
  messageKey,
  displayValue,
  onFieldChange,
  onFieldBlur,
  onMessageClick,
  onRetry,
}: Props) => (
  <div
    className={resultsArea}
    // Pendant un recalcul, les trois champs non édités gardent leurs valeurs :
    // pas de clignotement, pas de saut de mise en page, et surtout aucun
    // `disabled` — désactiver un champ volerait le focus et couperait la frappe.
    aria-busy={status === "loading"}
  >
    {status === "error" ? (
      <AccessibleAlert
        severity="error"
        title="Service temporairement indisponible"
        data-testid="brut-net-erreur"
        description={
          <>
            <p>
              Le calcul n&apos;a pas pu être effectué. Vous pouvez réessayer, ou
              poursuivre sur le simulateur de l&apos;URSSAF.
            </p>
            <Button priority="secondary" size="small" onClick={onRetry}>
              Réessayer
            </Button>
          </>
        }
      />
    ) : (
      <>
        {SALARY_FIELDS.map((field) => (
          <AmountField
            key={field}
            field={field}
            period={period}
            value={displayValue(field)}
            onChange={(value) => onFieldChange(field, value)}
            onBlur={onFieldBlur}
            message={
              field === "salaireNet" && messageKey ? (
                <ContextualMessage
                  messageKey={messageKey}
                  onClick={onMessageClick}
                />
              ) : undefined
            }
            messageClassName={
              field === "salaireNet" ? contextualMessage : undefined
            }
          />
        ))}

        <p
          className={`${fr.cx("fr-text--sm", "fr-mb-0", "fr-mt-3v")} ${inlineNote}`}
        >
          <span
            className={fr.cx("fr-icon-information-fill", "fr-icon--sm")}
            aria-hidden="true"
          />
          <span>
            {results?.tauxImposition == null
              ? "Pour une personne célibataire, sans enfant."
              : `Taux de référence pour une personne célibataire sans enfant : ${formatPercentage(results.tauxImposition)}.`}
          </span>
        </p>
      </>
    )}
  </div>
);
