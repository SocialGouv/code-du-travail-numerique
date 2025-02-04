import React from "react";
import { css } from "@styled-system/css";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  children: React.ReactNode;
};

const BlueCard = ({ children, ...props }: Props): JSX.Element => {
  return (
    <div
      {...props}
      className={`${fr.cx("fr-px-1w", "fr-px-md-3w", "fr-py-3w", "fr-mb-6w")} ${block}`}
    >
      {children}
    </div>
  );
};

export default BlueCard;

const block = css({
  background: "var(--background-alt-blue-cumulus)",
});
