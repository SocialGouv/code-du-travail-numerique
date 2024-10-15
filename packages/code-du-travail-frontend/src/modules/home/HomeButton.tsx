import { fr } from "@codegouvfr/react-dsfr";
import Link from "next/link";
import { css } from "../../../styled-system/css";

type Props = {
  buttonLink: string;
  buttonText: string;
  onButtonClick: () => void;
};

export const HomeButton = (props: Props) => (
  <div className={`${fr.cx("fr-mt-3w")} ${buttonContainer}`}>
    <Link
      href={props.buttonLink}
      className={fr.cx(
        "fr-btn",
        "fr-btn--secondary",
        "fr-btn--icon-right",
        "fr-icon-arrow-right-fill"
      )}
      onClick={props.onButtonClick}
    >
      {props.buttonText}
    </Link>
  </div>
);

const buttonContainer = css({
  display: "flex",
  justifyContent: "center",
});
