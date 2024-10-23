import { fr } from "@codegouvfr/react-dsfr";
import { css } from "../../../../styled-system/css";
import { Button } from "@codegouvfr/react-dsfr/Button";

type Props = {
  buttonLink: string;
  buttonText: string;
  onButtonClick: () => void;
};

export const HomeButton = (props: Props) => (
  <div className={`${fr.cx("fr-mt-3w")} ${buttonContainer}`}>
    <Button
      linkProps={{
        href: props.buttonLink,
        onClick: props.onButtonClick,
      }}
      iconId="fr-icon-arrow-right-line"
      iconPosition="right"
      priority="secondary"
      size="large"
    >
      {props.buttonText}
    </Button>
  </div>
);

const buttonContainer = css({
  display: "flex",
  justifyContent: "center",
});
