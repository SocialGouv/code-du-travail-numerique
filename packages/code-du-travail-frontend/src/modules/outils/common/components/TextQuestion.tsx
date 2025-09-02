import React, { useEffect, useState } from "react";
import Html from "src/modules/common/Html";
import { Input } from "@codegouvfr/react-dsfr/Input";
import { InputUnit } from "../../indemnite-depart/steps/Informations/components/PubliQuestion";
import {
  convertISOToFrDate,
  isFrenchDateFormat,
  convertFrToISODate,
} from "../utils";
import { preventScroll } from "src/modules/outils/common/utils/input";
import { defaultInputStyle } from "../styles/input";
import { xssWrapper } from "src/modules/utils/xss";

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

  const errorId = `${id}-error`;

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
          onWheel: preventScroll,
          "aria-invalid": error ? "true" : undefined,
          "aria-describedby": error ? errorId : undefined,
        } as any
      }
      state={error ? "error" : subLabel ? "info" : "default"}
      stateRelatedMessage={
        error ? (
          <p
            id={errorId}
            role="alert"
            dangerouslySetInnerHTML={{ __html: xssWrapper(error) }}
          />
        ) : subLabel ? (
          <span
            id={`${id}-help`}
            dangerouslySetInnerHTML={{ __html: xssWrapper(subLabel) }}
          />
        ) : undefined
      }
      classes={{
        nativeInputOrTextArea: defaultInputStyle,
      }}
    />
  );
}
