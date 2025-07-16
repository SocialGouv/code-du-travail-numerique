import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import React, { forwardRef } from "react";

export const QuestionnaireEnd = forwardRef<HTMLHeadingElement>(
  (_, ref): React.ReactElement => {
    return (
      <div className={containerStyle}>
        <h2
          ref={ref}
          tabIndex={-1}
          className={fr.cx("fr-text--lg", "fr-mb-2w", "fr-text--bold")}
        >
          Merci pour votre aide !
        </h2>
        <p>Votre évaluation sera étudiée au plus vite par nos équipes</p>
      </div>
    );
  }
);

QuestionnaireEnd.displayName = "SatisfactionQuestionnaireEnd";

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
