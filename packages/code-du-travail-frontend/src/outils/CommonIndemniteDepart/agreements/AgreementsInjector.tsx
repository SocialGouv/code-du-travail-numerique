import { SupportedCc } from "@socialgouv/modeles-social";
import React from "react";
import { IndemniteDepartStepName } from "..";
import {
  Agreement1516,
  Agreement1516Informations,
} from "./1516-organismes-formation";
import { Agreement1527, Agreement1527Informations } from "./1527-immobilier";
import { Agreement16, Agreement16Informations } from "./16-transports-routiers";
import {
  Agreement44,
  Agreement44Informations,
} from "./44-industries-chimiques";
import { Agreement2609, Agreement2609Informations } from "./2609-batiment-etam";
import { Agreement2596, Agreement2596Informations } from "./2596-coiffure";
import { Agreement2148 } from "./2148-telecommunications";
import Agreement2148Informations from "./2148-telecommunications/Informations";
import { Agreement2614 } from "./2614-travaux-public";
import {
  Agreement1672,
  Agreement1672Informations,
} from "./1672-societes-assurances";
import {
  Agreement1483,
  Agreement1483Informations,
} from "./1483-habillement-textiles-commerce-de-detail";
import {
  Agreement1702,
  Agreement1702Informations,
} from "./1702-ouvriers-travaux-public";
import {
  Agreement1740,
  Agreement1740Informations,
} from "./1740-batiment-region-parisienne";
import { Agreement2120, Agreement2120Informations } from "./2120-banques";
import { IndemniteDepartType } from "../../types";

type Props = {
  idcc: SupportedCc | null | undefined;
  step: IndemniteDepartStepName;
  type: IndemniteDepartType;
};

export default function AgreementsInjector(props: Props) {
  switch (true) {
    case SupportedCc.IDCC0016 === props.idcc &&
      props.step === IndemniteDepartStepName.Salaires:
      return <Agreement16 />;
    case SupportedCc.IDCC0016 === props.idcc &&
      props.step === IndemniteDepartStepName.Resultat:
      return <Agreement16Informations />;
    case SupportedCc.IDCC0044 === props.idcc &&
      props.step === IndemniteDepartStepName.Salaires:
      return <Agreement44 />;
    case SupportedCc.IDCC0044 === props.idcc &&
      props.step === IndemniteDepartStepName.Resultat:
      return <Agreement44Informations />;
    case SupportedCc.IDCC1516 === props.idcc &&
      props.step === IndemniteDepartStepName.Salaires:
      return <Agreement1516 />;
    case SupportedCc.IDCC1516 === props.idcc &&
      props.step === IndemniteDepartStepName.Resultat:
      return <Agreement1516Informations />;
    case SupportedCc.IDCC1527 === props.idcc &&
      props.step === IndemniteDepartStepName.Salaires:
      return <Agreement1527 />;
    case SupportedCc.IDCC1527 === props.idcc &&
      props.step === IndemniteDepartStepName.Resultat:
      return <Agreement1527Informations />;
    case SupportedCc.IDCC2596 === props.idcc &&
      props.step === IndemniteDepartStepName.Salaires:
      return <Agreement2596 />;
    case SupportedCc.IDCC2596 === props.idcc &&
      props.step === IndemniteDepartStepName.Resultat:
      return <Agreement2596Informations />;
    case SupportedCc.IDCC2609 === props.idcc &&
      props.step === IndemniteDepartStepName.Salaires:
      return <Agreement2609 />;
    case SupportedCc.IDCC2614 === props.idcc &&
      props.step === IndemniteDepartStepName.Salaires:
      return <Agreement2614 />;
    case SupportedCc.IDCC2609 === props.idcc &&
      props.step === IndemniteDepartStepName.Resultat:
      return <Agreement2609Informations />;
    case SupportedCc.IDCC2120 === props.idcc &&
      props.step === IndemniteDepartStepName.Salaires:
      return <Agreement2120 type={props.type} />;
    case SupportedCc.IDCC2120 === props.idcc &&
      props.step === IndemniteDepartStepName.Resultat:
      return <Agreement2120Informations />;
    case SupportedCc.IDCC2148 === props.idcc &&
      props.step === IndemniteDepartStepName.Salaires:
      return <Agreement2148 />;
    case SupportedCc.IDCC2148 === props.idcc &&
      props.step === IndemniteDepartStepName.Resultat:
      return <Agreement2148Informations />;
    case SupportedCc.IDCC1672 === props.idcc &&
      props.step === IndemniteDepartStepName.Salaires:
      return <Agreement1672 />;
    case SupportedCc.IDCC1672 === props.idcc &&
      props.step === IndemniteDepartStepName.Resultat:
      return <Agreement1672Informations />;
    case SupportedCc.IDCC1483 === props.idcc &&
      props.step === IndemniteDepartStepName.Salaires:
      return <Agreement1483 />;
    case SupportedCc.IDCC1483 === props.idcc &&
      props.step === IndemniteDepartStepName.Resultat:
      return <Agreement1483Informations />;
    case SupportedCc.IDCC1702 === props.idcc &&
      props.step === IndemniteDepartStepName.Salaires:
      return <Agreement1702 />;
    case SupportedCc.IDCC1702 === props.idcc &&
      props.step === IndemniteDepartStepName.Resultat:
      return <Agreement1702Informations />;
    case SupportedCc.IDCC1740 === props.idcc &&
      props.step === IndemniteDepartStepName.Salaires:
      return <Agreement1740 />;
    case SupportedCc.IDCC1740 === props.idcc &&
      props.step === IndemniteDepartStepName.Resultat:
      return <Agreement1740Informations />;
    default:
      return <></>;
  }
}
