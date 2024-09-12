import { fr } from "@codegouvfr/react-dsfr";
import { css } from "../../../../styled-system/css";

export const FeedbackAnswered = () => {
  return (
    <div className={container}>
      <h2 className={fr.cx("fr-h5")}>Merci pour votre réponse.</h2>
      <p>
        L’équipe du Code du travail numérique vous remercie pour votre réponse.
      </p>
    </div>
  );
};

const container = css({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});
