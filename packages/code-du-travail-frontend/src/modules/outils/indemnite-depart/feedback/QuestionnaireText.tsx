"use client";

import { Input } from "@codegouvfr/react-dsfr/Input";
import { fr } from "@codegouvfr/react-dsfr";
import { useState } from "react";

type QuestionnaireItemProps = {
  className?: string;
  title: string;
  placeholder?: string;
  onChange: (text: string) => void;
  dataTestId?: string;
};

export const QuestionnaireText = ({
  title,
  placeholder,
  onChange,
  dataTestId,
}: QuestionnaireItemProps): JSX.Element => {
  const maxCharacters = 200;
  const [remainingChars, setRemainingChars] = useState(maxCharacters);
  const textareaId = `textarea-feedback`;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentLength = e.target.value.length;
    setRemainingChars(maxCharacters - currentLength);
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor={textareaId} className={fr.cx("fr-label")}>
        {title}
      </label>
      {/* @ts-ignore */}
      <Input
        textArea
        nativeTextAreaProps={
          {
            id: textareaId,
            onChange: handleChange,
            maxLength: maxCharacters,
            "aria-describedby": `${textareaId}-hint ${textareaId}-remaining`,
            "data-testid": dataTestId,
          } as any
        }
        hintText={placeholder}
        state="info"
        stateRelatedMessage={`${remainingChars} caractères restants`}
      />
    </div>
  );
};
