import { fr } from "@codegouvfr/react-dsfr";
import Button from "@codegouvfr/react-dsfr/Button";
import Tooltip from "@codegouvfr/react-dsfr/Tooltip";
import React from "react";

type SymmaryItemProps = {
  data: string | JSX.Element;
  info?: string;
  onClick: () => void;
  noButton?: boolean;
  noCheck?: boolean;
};

export const SummaryItem = ({
  data,
  info,
  onClick,
  noButton = false,
}: SymmaryItemProps) => {
  return (
    <li className={!noButton ? fr.cx("fr-text--bold") : undefined}>
      {data}
      {info && <Tooltip title={info} kind="hover" />}
      <br />
      {!noButton && (
        <Button
          size="small"
          priority="secondary"
          iconPosition="right"
          iconId="fr-icon-arrow-go-back-line"
          onClick={onClick}
          data-testid={`modify-${data}`}
          className={fr.cx("fr-mt-1w", "fr-mb-3w")}
        >
          Modifier
        </Button>
      )}
    </li>
  );
};
