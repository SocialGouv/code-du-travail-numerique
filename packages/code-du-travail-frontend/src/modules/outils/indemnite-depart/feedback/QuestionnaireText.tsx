"use client";

import { Input } from "@codegouvfr/react-dsfr/Input";
import { useState } from "react";

type QuestionnaireItemProps = {
  className?: string;
  title: string;
  placeholder?: string;
  onChange: (text: string) => void;
  id: string;
};

export const QuestionnaireText = ({
  title,
  placeholder,
  onChange,
  id,
}: QuestionnaireItemProps) => {
  const maxCharacters = 200;
  const [remainingChars, setRemainingChars] = useState(maxCharacters);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentLength = e.target.value.length;
    setRemainingChars(maxCharacters - currentLength);
    onChange(e.target.value);
  };

  return (
    <div>
      <Input
        label={title}
        textArea
        nativeTextAreaProps={
          {
            id: id,
            onChange: handleChange,
            maxLength: maxCharacters,
            "aria-describedby": `${id}-hint ${id}-remaining`,
          } as any
        }
        hintText={placeholder}
        state="info"
        stateRelatedMessage={`${remainingChars} caractères restants`}
      />
    </div>
  );
};
