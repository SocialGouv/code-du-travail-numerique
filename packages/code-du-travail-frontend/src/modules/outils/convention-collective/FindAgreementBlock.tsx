import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import AgreementSearch from "../../convention-collective/AgreementSearch.svg";
import { css } from "@styled-system/css";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  title?: string;
  description?: string;
  noBackground?: boolean;
};

export const FindAgreementBlock = ({
  children,
  title = "Trouver sa convention collective",
  noBackground = false,
}: Props) => {
  return (
    <div
      id="convention-collective"
      className={`${fr.cx("fr-px-3w", "fr-pt-4w", "fr-pb-11v")} ${noBackground ? "" : block}`}
    >
      <div className={"fr-grid-row"}>
        <Image
          priority
          src={AgreementSearch}
          alt={title}
          className={fr.cx("fr-unhidden-md", "fr-hidden")}
        />
        <h1 className={fr.cx("fr-h3", "fr-mt-1w", "fr-mb-1w")}>{title}</h1>
      </div>
      <div>{children}</div>
    </div>
  );
};

const block = css({
  background: "var(--background-alt-blue-cumulus) !important",
});
