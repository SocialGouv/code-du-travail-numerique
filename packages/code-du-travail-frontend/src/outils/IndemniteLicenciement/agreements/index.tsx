import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";
import React from "react";
import Agreement1516 from "./1516-organismes-formation/Component";

type Props = {
  idcc: SupportedCcIndemniteLicenciement;
};

export default function AgreementsInjector(props: Props) {
  switch (props.idcc) {
    case SupportedCcIndemniteLicenciement.IDCC1516:
      return <Agreement1516 />;
    default:
      return <></>;
  }
}
