import React from "react";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  message: string;
};

export const Note = ({ message }: Props) => {
  return (
    <div className={fr.cx("fr-alert", "fr-alert--warning")}>
      <p className={fr.cx("fr-alert__title")}>Attention</p>
      <p>{message}</p>
    </div>
  );
};
