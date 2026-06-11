import React from "react";
import Html from "src/modules/common/Html";
import { Checkbox } from "@codegouvfr/react-dsfr/Checkbox";
import { xssWrapper } from "src/modules/utils/xss";

export type CheckboxOption<K extends string> = {
  key: K;
  label: string;
  hintText?: string;
};

type Props<K extends string> = {
  name: string;
  legend: string;
  hintText?: string;
  options: CheckboxOption<K>[];
  values: Partial<Record<K, boolean>>;
  onChange: (key: K, checked: boolean) => void;
  error?: string;
};

export function CheckboxesQuestion<K extends string>({
  name,
  legend,
  hintText,
  options,
  values,
  onChange,
  error,
}: Props<K>) {
  const errorId = `${name}-error`;
  const hintId = `${name}-help`;

  return (
    <Checkbox
      legend={<Html as="p">{legend}</Html>}
      hintText={hintText}
      options={options.map((option) => ({
        label: option.label,
        hintText: option.hintText,
        nativeInputProps: {
          name: `${name}-${option.key}`,
          checked: values[option.key] === true,
          onChange: (event: React.ChangeEvent<HTMLInputElement>) =>
            onChange(option.key, event.target.checked),
          "data-testid": `${name}-${option.key}-checkbox`,
        } as any,
      }))}
      state={error ? "error" : "default"}
      aria-describedby={error ? errorId : hintText ? hintId : undefined}
      stateRelatedMessage={
        error ? (
          <span
            id={errorId}
            dangerouslySetInnerHTML={{
              __html: xssWrapper(error),
            }}
          />
        ) : undefined
      }
    />
  );
}
