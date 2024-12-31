import { fr } from "@codegouvfr/react-dsfr";
import Alert from "@codegouvfr/react-dsfr/Alert";
import React from "react";

type Props = {
  title: string;
  message: string;
  dataTestId?: string;
};

export const Disclaimer = ({
  title,
  message,
  dataTestId,
}: Props): JSX.Element => (
  <Alert
    severity="warning"
    data-testid={dataTestId}
    title={title}
    description={message}
    className={fr.cx("fr-my-2w")}
  />
);
