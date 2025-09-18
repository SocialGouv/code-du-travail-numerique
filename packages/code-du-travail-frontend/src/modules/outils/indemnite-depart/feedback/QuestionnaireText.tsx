"use client";

import { fr } from "@codegouvfr/react-dsfr";
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

  const charactersCountThresholds = [100, 50, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0];

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const currentLength = e.target.value.length;
    setRemainingChars(maxCharacters - currentLength);
    onChange(e.target.value);
  };

  return (
    <div>
      <label htmlFor={id} className={fr.cx("fr-label")}>
        {title}
        {placeholder && <span className="fr-hint-text">{placeholder}</span>}
      </label>
      <textarea
        id={id}
        className={fr.cx("fr-input")}
        maxLength={maxCharacters}
        aria-describedby={`${id}-remaining`}
        data-testid={id}
        onChange={handleChange}
      />
      <p
        id={`${id}-remaining`}
        aria-live={
          charactersCountThresholds.indexOf(remainingChars) !== -1
            ? "polite"
            : "off"
        }
        aria-atomic="true"
        role="status"
        className="fr-info-text"
      >
        {`${remainingChars} caractère${
          remainingChars > 1 ? "s" : ""
        } restant${remainingChars > 1 ? "s" : ""}`}
      </p>
    </div>
  );
};
