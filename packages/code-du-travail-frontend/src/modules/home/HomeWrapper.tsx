import { fr } from "@codegouvfr/react-dsfr";
import { css } from "../../../styled-system/css";
import Link from "next/link";

type BaseButtonProps = {
  isTint?: boolean;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
};

export type HomeWrapperWithButtonProps = BaseButtonProps & {
  hasButton: true;
  buttonLink: string;
  buttonText: string;
  onButtonClick: () => void;
};

export type HomeWrapperWithoutButtonProps = BaseButtonProps & {
  hasButton?: false;
};

export type HomeWrapperProps =
  | HomeWrapperWithButtonProps
  | HomeWrapperWithoutButtonProps;

export const HomeWrapper = (props: HomeWrapperProps) => (
  <div className={props.isTint ? mainContainer : undefined}>
    <div
      className={fr.cx("fr-my-8w", "fr-container", props.isTint && "fr-py-6w")}
    >
      <h2>{props.title}</h2>
      {props.subtitle && <p>{props.subtitle}</p>}
      <div
        className={fr.cx(
          "fr-grid-row",
          "fr-grid-row--gutters",
          "fr-grid-row--right"
        )}
      >
        {props.children}
      </div>
      {props.hasButton && (
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
      )}
    </div>
  </div>
);

const mainContainer = css({
  background: "var(--background-alt-blue-cumulus)",
});

const buttonContainer = css({
  display: "flex",
  justifyContent: "center",
});
