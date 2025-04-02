import React from "react";
import Alert from "@codegouvfr/react-dsfr/Alert";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  message: string;
};

export const Note = ({ message }: Props): JSX.Element => (
  <Alert
    severity="info"
    title="À noter"
    className={fr.cx("fr-mt-2w")}
    data-testid="alert-3239-mise"
    description={message}
  />
);
