import React, { useEffect, useState } from "react";
import Html from "src/modules/common/Html";
import { xssWrapper } from "src/lib";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { InputUnit } from "../../indemnite-depart/steps/Informations/components/PubliQuestion";
import {
  convertISOToFrDate,
  isFrenchDateFormat,
  convertFrToISODate,
} from "../utils";
import { css } from "@styled-system/css";
import { DEFAULT_MIN_INPUT_SIZE } from "src/modules/config/size";

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
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  useEffect(() => {
    if (inputRef && error && autoFocus) {
      inputRef?.focus();
    }
  }, [inputRef, error, autoFocus]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    setLocalValue(newValue);
    if (inputType === "date" && newValue.length === 10) {
      onChange(convertISOToFrDate(newValue));
    } else if (inputType !== "date") {
      onChange(newValue);
    }
  };

  const displayValue =
    inputType === "date" &&
    typeof localValue === "string" &&
    isFrenchDateFormat(localValue)
      ? convertFrToISODate(localValue)
      : localValue;

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
      nativeInputProps={
        {
          type: inputType,
          id,
          name: id,
          value: displayValue,
          onChange: handleChange,
          autoFocus,
          title,
          required: true,
          ref: (ref: HTMLInputElement) => setInputRef(ref),
          "data-testid": dataTestId,
        } as any
      }
      state={error ? "error" : subLabel ? "info" : "default"}
      stateRelatedMessage={
        error ? (
          <span dangerouslySetInnerHTML={{ __html: xssWrapper(error) }} />
        ) : (
          subLabel && (
            <span dangerouslySetInnerHTML={{ __html: xssWrapper(subLabel) }} />
          )
        )
      }
      classes={{
        nativeInputOrTextArea: inputStyle,
      }}
    />
  );
}

const inputStyle = css({
  maxWidth: `${DEFAULT_MIN_INPUT_SIZE}!`,
});
