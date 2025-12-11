import React, { useEffect, useState, useRef } from "react";
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
  ariaLive?: "polite" | "assertive" | "off";
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
  ariaLive = "polite",
}: Props) {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [localValue, setLocalValue] = useState(value || "");

  useEffect(() => {
    setLocalValue(value || "");
  }, [value]);

  useEffect(() => {
    if (inputRef.current && error) {
      inputRef.current?.focus();
      inputRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  }, [error]);

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current?.focus();
    }
  }, [autoFocus]);

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
  const hintId = `${id}-help`;

  useEffect(() => {
    if (typeof document !== "undefined") {
      const messagesGroup = document.getElementById(`${id}-messages-group`);
      if (messagesGroup) {
        messagesGroup.setAttribute("aria-live", ariaLive);
      }
    }
  }, [id, ariaLive]);

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
          ref: inputRef,
          "data-testid": dataTestId,
          onWheel: preventScroll,
          "aria-invalid": error ? "true" : undefined,
        } as any
      }
      state={error ? "error" : subLabel ? "info" : "default"}
      aria-describedby={error ? errorId : subLabel ? hintId : undefined}
      stateRelatedMessage={
        error ? (
          <span
            id={errorId}
            dangerouslySetInnerHTML={{ __html: xssWrapper(error) }}
          />
        ) : subLabel ? (
          <span
            id={hintId}
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
