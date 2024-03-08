import React from "react";
import { CalculateurIndemnite } from "../CommonIndemniteDepart";
import { IndemniteDepartType } from "../types";

type Props = {
  icon: string;
  title: string;
  displayTitle: string;
};

export const CalculateurIndemniteLicenciement = ({
  icon,
  title,
  displayTitle,
}: Props): JSX.Element => {
  return (
    <CalculateurIndemnite
      icon={icon}
      title={title}
      displayTitle={displayTitle}
      tool={IndemniteDepartType.INDEMNITE_LICENCIEMENT}
    />
  );
};
