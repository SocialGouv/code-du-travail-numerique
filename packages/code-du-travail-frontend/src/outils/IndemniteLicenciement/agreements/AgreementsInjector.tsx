import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";
import React from "react";
import { IndemniteLicenciementStepName } from "..";
import {
  Agreement1516,
  Agreement1516Informations,
} from "./1516-organismes-formation";
import { Agreement1527, Agreement1527Informations } from "./1527-immobilier";

type Props = {
  idcc: SupportedCcIndemniteLicenciement;
  step: IndemniteLicenciementStepName;
};

export default function AgreementsInjector(props: Props) {
  switch (true) {
    case SupportedCcIndemniteLicenciement.IDCC1516 === props.idcc &&
      props.step === IndemniteLicenciementStepName.Salaires:
      return <Agreement1516 />;
    case SupportedCcIndemniteLicenciement.IDCC1516 === props.idcc &&
      props.step === IndemniteLicenciementStepName.Resultat:
      return <Agreement1516Informations />;
    case SupportedCcIndemniteLicenciement.IDCC1527 === props.idcc &&
      props.step === IndemniteLicenciementStepName.Salaires:
      return <Agreement1527 />;
    case SupportedCcIndemniteLicenciement.IDCC1527 === props.idcc &&
      props.step === IndemniteLicenciementStepName.Resultat:
      return <Agreement1527Informations />;
    default:
      return <></>;
  }
}
