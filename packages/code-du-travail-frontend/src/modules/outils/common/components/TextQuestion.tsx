import React, { FunctionComponent, useEffect, useState } from "react";
import { Tooltip } from "./types";
import Html from "src/modules/common/Html";
import { xssWrapper } from "src/lib";

type Props = {
  onChange: (value: string) => void;
  error?: string;
  label: string;
  tooltip?: Tooltip;
  inputType?: "date" | "number" | "text";
  value: string | number | undefined;
  placeholder?: string;
  subLabel?: string;
  smallText?: string;
  title?: string;
  showRequired?: boolean;
  icon?: FunctionComponent;
  id: string;
  dataTestId?: string;
  text?: string;
  autoFocus?: boolean;
};

export default function TextQuestion({
  tooltip,
  inputType,
  label,
  error,
  value,
  placeholder,
  onChange,
  smallText,
  subLabel,
  title,
  showRequired,
  icon,
  id,
  dataTestId,
  text,
  autoFocus = false,
}: Props) {
  const [inputRef, setInputRef] = useState<HTMLInputElement>();
  useEffect(() => {
    if (inputRef && error) {
      inputRef?.focus();
    }
  }, [inputRef, error]);
  return (
    <div>
      <p>
        <Html as="span">{label}</Html>
      </p>
      {smallText && <p>{smallText}</p>}
      {subLabel && <p>{subLabel}</p>}
      <div>
        {/* <input
          id={id}
          name={id}
          value={value}
          onChange={(e) => onChange(inputType === "date" ? e : e.target.value)}
          invalid={!!error}
          placeholder={placeholder}
          icon={icon}
          text={text}
          type={inputType === "date" ? "text" : inputType}
          updateOnScrollDisabled
          data-testid={dataTestId}
          autoFocus={autoFocus}
          title={title}
        /> */}
      </div>
      {error && (
        <p>
          <span
            dangerouslySetInnerHTML={{
              __html: xssWrapper(error),
            }}
          />
        </p>
      )}
    </div>
  );
}
