import React, { useEffect, useState } from "react";
import Html from "src/modules/common/Html";
import { xssWrapper } from "src/lib";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { InputUnit } from "../indemnite-depart/steps/Informations/components/PubliQuestion";

type Props = {
  onChange: (value: string) => void;
  error?: string;
  label: string;
  inputType?: "date" | "number" | "text";
  value: string | number | undefined;
  subLabel?: string;
  title?: string;
  id: string;
  dataTestId?: string;
  autoFocus?: boolean;
  unit?: InputUnit;
};

function formatValueToFr(value: string): string {
  if (!value) return value;
  const [year, month, days] = value.split("-");
  return `${days}/${month}/${year}`;
}

function formatValueToEn(value: string): string {
  if (!value) return value;
  const [days, month, year] = value.split("/");
  return `${year}-${month}-${days}`;
}

export function TextQuestion({
  inputType = "text",
  label,
  error,
  value,
  onChange,
  subLabel,
  title,
  id,
  dataTestId,
  unit,
  autoFocus = false,
}: Props) {
  const [inputRef, setInputRef] = useState<HTMLInputElement>();

  useEffect(() => {
    if (inputRef && error) {
      inputRef?.focus();
    }
  }, [inputRef, error]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue =
      inputType === "date"
        ? formatValueToFr(event.target.value)
        : event.target.value;
    onChange(newValue);
  };

  return (
    <Input
      label={<Html as="span">{label}</Html>}
      hintText={
        unit === "an"
          ? "Durée attendue en années"
          : unit === "jour"
            ? "Durée attendue en jours"
            : unit === "mois"
              ? "Durée attendue en mois"
              : unit === "pourcent"
                ? "Pourcentage attendu"
                : unit === "semestre"
                  ? "Durée attendue en semestres"
                  : unit === "€"
                    ? "Montant attendu en euros"
                    : undefined
      }
      nativeInputProps={{
        type: inputType,
        id,
        name: id,
        value:
          inputType === "date"
            ? formatValueToEn(value as string)
            : (value ?? ""),
        onChange: handleChange,
        autoFocus,
        title,
        required: true,
        ref: (ref: HTMLInputElement) => setInputRef(ref),
      }}
      data-testid={dataTestId}
      state={error ? "error" : subLabel ? "info" : "default"}
      iconId={unit === "€" ? "fr-icon-money-euro-circle-line" : undefined}
      stateRelatedMessage={
        error ? (
          <span
            dangerouslySetInnerHTML={{
              __html: xssWrapper(error),
            }}
          />
        ) : (
          subLabel || undefined
        )
      }
    />
  );
}
