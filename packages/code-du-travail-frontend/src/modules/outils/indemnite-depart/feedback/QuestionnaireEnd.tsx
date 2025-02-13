import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";

export const QuestionnaireEnd = (): JSX.Element => {
  return (
    <div className={containerStyle}>
      <p className={fr.cx("fr-text--lg", "fr-mb-2w", "fr-text--bold")}>
        Merci pour votre aide !
      </p>
      <p>Votre évaluation sera étudiée au plus vite par nos équipes</p>
    </div>
  );
};

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
