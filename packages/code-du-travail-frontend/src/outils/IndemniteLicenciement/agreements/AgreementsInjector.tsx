import { SupportedCcIndemniteLicenciement } from "@socialgouv/modeles-social";
import React from "react";
import { IndemniteLicenciementStepName } from "..";
import {
  Agreement1516,
  Agreement1516Informations,
} from "./1516-organismes-formation";
import { Agreement1527, Agreement1527Informations } from "./1527-immobilier";
import { Agreement16, Agreement16Informations } from "./16-transports-routiers";
import {
  Agreement29,
  Agreement29Informations,
} from "./29-hospitalisation-privee-but-non-lucratif";
import {
  Agreement44,
  Agreement44Informations,
} from "./44-industries-chimiques";
import { Agreement2609, Agreement2609Informations } from "./2609-batiment-etam";

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
    case SupportedCcIndemniteLicenciement.IDCC0016 === props.idcc &&
      props.step === IndemniteLicenciementStepName.Salaires:
      return <Agreement16 />;
    case SupportedCcIndemniteLicenciement.IDCC0016 === props.idcc &&
      props.step === IndemniteLicenciementStepName.Resultat:
      return <Agreement16Informations />;
    case SupportedCcIndemniteLicenciement.IDCC0044 === props.idcc &&
      props.step === IndemniteLicenciementStepName.Salaires:
      return <Agreement44 />;
    case SupportedCcIndemniteLicenciement.IDCC0044 === props.idcc &&
      props.step === IndemniteLicenciementStepName.Resultat:
      return <Agreement44Informations />;
    case SupportedCcIndemniteLicenciement.IDCC0029 === props.idcc &&
      props.step === IndemniteLicenciementStepName.Salaires:
      return <Agreement29 />;
    case SupportedCcIndemniteLicenciement.IDCC0029 === props.idcc &&
      props.step === IndemniteLicenciementStepName.Resultat:
      return <Agreement29Informations />;
    case SupportedCcIndemniteLicenciement.IDCC2609 === props.idcc &&
      props.step === IndemniteLicenciementStepName.Salaires:
      return <Agreement2609 />;
    case SupportedCcIndemniteLicenciement.IDCC2609 === props.idcc &&
      props.step === IndemniteLicenciementStepName.Resultat:
      return <Agreement2609Informations />;
    default:
      return <></>;
  }
}
