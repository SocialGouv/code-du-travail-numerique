"use client";

import Input from "@codegouvfr/react-dsfr/Input";
import type { ReactNode } from "react";
import {
  FIELD_DESCRIPTORS,
  PERIOD_ACCESSIBLE_UNIT,
  PERIOD_SUFFIX,
} from "../domain/constants";
import type { Period, SalaryField } from "../domain/types";
import { amountInput, amountInputWrap, amountSuffix } from "../styles";

type Props = {
  field: SalaryField;
  value: string;
  period: Period;
  onChange: (value: string) => void;
  onBlur: () => void;
  /** Message contextuel DSFR affiché sous le champ, en état « succès ». */
  message?: ReactNode;
  messageClassName?: string;
};

export const AmountField = ({
  field,
  value,
  period,
  onChange,
  onBlur,
  message,
  messageClassName,
}: Props) => {
  const { label, hint } = FIELD_DESCRIPTORS[field];

  return (
    <Input
      label={label}
      // L'unité fait partie du nom accessible du champ : le suffixe visuel
      // « € par mois » est décoratif et masqué aux lecteurs d'écran.
      hintText={`${hint}, ${PERIOD_ACCESSIBLE_UNIT[period]}`}
      state={message ? "success" : "default"}
      stateRelatedMessage={message}
      classes={{
        wrap: amountInputWrap,
        nativeInputOrTextArea: amountInput,
        ...(messageClassName ? { message: messageClassName } : {}),
      }}
      addon={
        <span className={amountSuffix} aria-hidden="true">
          {PERIOD_SUFFIX[period]}
        </span>
      }
      nativeInputProps={{
        // Surtout pas `type="number"` : il refuse la virgule décimale et les
        // espaces de milliers, qui sont précisément la façon dont un montant
        // s'écrit en français.
        type: "text",
        inputMode: "decimal",
        autoComplete: "off",
        value,
        onChange: (event) => onChange(event.target.value),
        onBlur,
      }}
    />
  );
};
