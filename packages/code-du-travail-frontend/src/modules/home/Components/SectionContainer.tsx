import { fr } from "@codegouvfr/react-dsfr";
import { css } from "@styled-system/css";
import { ElementType } from "react";

type Props = {
  sectionId: string;
  isTint?: boolean;
  listAs?: ElementType;
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footerNode: React.ReactNode;
};

export const SectionContainer = (props: Props) => {
  const ListAs = props.listAs ?? "div";
  return (
    <div
      id={props.sectionId}
      className={props.isTint ? mainContainer : undefined}
    >
      <div
        className={fr.cx(
          "fr-my-8w",
          "fr-container",
          props.isTint && "fr-py-6w"
        )}
      >
        <h2>{props.title}</h2>
        {props.subtitle && (
          <p className={fr.cx("fr-text--xl")}>{props.subtitle}</p>
        )}
        <ListAs
          className={fr.cx(
            "fr-grid-row",
            "fr-grid-row--gutters",
            "fr-grid-row--right"
          )}
        >
          {props.children}
        </ListAs>
        {props.footerNode}
      </div>
    </div>
  );
};

const mainContainer = css({
  background: "var(--background-alt-blue-cumulus)",
});
