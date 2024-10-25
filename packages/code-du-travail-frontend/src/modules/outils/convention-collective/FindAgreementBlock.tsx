import { fr } from "@codegouvfr/react-dsfr";
import Image from "next/image";
import AgreementSearch from "../../convention-collective/AgreementSearch.svg";
import { css } from "../../../../styled-system/css";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

export const FindAgreementBlock = ({ children }: Props) => {
  return (
    <div
      id="convention-collective"
      className={`${fr.cx("fr-p-3w", "fr-mb-6w")} ${block}`}
    >
      <div className={"fr-grid-row"}>
        <Image
          priority
          src={AgreementSearch}
          alt="Trouver sa convention collective"
          className={fr.cx("fr-unhidden-md", "fr-hidden")}
        />
        <h1 className={fr.cx("fr-h3", "fr-mt-1w", "fr-mb-1w")}>
          Trouver sa convention collective
        </h1>
      </div>
      <div>{children}</div>
    </div>
  );
};

const block = css({
  background: "var(--background-alt-blue-cumulus) !important",
});
