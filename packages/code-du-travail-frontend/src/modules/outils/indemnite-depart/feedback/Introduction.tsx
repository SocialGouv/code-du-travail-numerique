import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";

type IntroductionProps = {
  onClick: () => void;
};

export const Introduction = ({ onClick }: IntroductionProps) => {
  return (
    <div className={containerStyle}>
      <h2 className={fr.cx("fr-text--lg", "fr-mb-2w", "fr-text--bold")}>
        Votre avis sur ce simulateur nous intéresse
      </h2>
      <Button priority="secondary" onClick={onClick}>
        Donner mon avis
      </Button>
    </div>
  );
};

const containerStyle = css({
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
});
