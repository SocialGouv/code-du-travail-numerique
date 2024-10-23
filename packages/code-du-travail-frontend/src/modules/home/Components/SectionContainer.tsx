import { fr } from "@codegouvfr/react-dsfr";
import { css } from "../../../../styled-system/css";

type Props = {
  sectionId: string;
  isTint?: boolean;
  title: string;
  subtitle?: string;
  children?: React.ReactNode;
  footerNode?: React.ReactNode;
};

export const SectionContainer = (props: Props) => (
  <div
    id={props.sectionId}
    className={props.isTint ? mainContainer : undefined}
  >
    <div
      className={fr.cx("fr-my-8w", "fr-container", props.isTint && "fr-py-6w")}
    >
      <h2>{props.title}</h2>
      {props.subtitle && (
        <p className={fr.cx("fr-text--xl")}>{props.subtitle}</p>
      )}
      <div
        className={fr.cx(
          "fr-grid-row",
          "fr-grid-row--gutters",
          "fr-grid-row--right"
        )}
      >
        {props.children}
      </div>
      {props.footerNode}
    </div>
  </div>
);

const mainContainer = css({
  background: "var(--background-alt-blue-cumulus)",
});
