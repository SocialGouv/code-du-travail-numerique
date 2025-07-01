import React from "react";
import { IndemnitePrecariteStepName } from "../types";
import { Agreement3127Informations } from "./3127-entreprises-services-a-la-personne";
import { Agreement1486Informations } from "./1486-bureaux-etudes-techniques";
import { Agreement2511Informations } from "./2511-sport";
import { Agreement1516Informations } from "./1516-organismes-formation";

type Props = {
  idcc: number;
  step: IndemnitePrecariteStepName;
};

export default function AgreementsInjector(props: Props) {
  switch (true) {
    // Convention collective 1486 - Questions spécifiques pour l'étape Informations
    case 1486 === props.idcc &&
      props.step === IndemnitePrecariteStepName.InfosGenerales:
      return <Agreement1486Informations />;
    // Convention collective 1516 - Questions spécifiques pour l'étape Informations
    case 1516 === props.idcc &&
      props.step === IndemnitePrecariteStepName.InfosGenerales:
      return <Agreement1516Informations />;
    // Convention collective 2511 - Questions spécifiques pour l'étape Informations
    case 2511 === props.idcc &&
      props.step === IndemnitePrecariteStepName.InfosGenerales:
      return <Agreement2511Informations />;
    // Convention collective 3127 - Questions spécifiques pour l'étape Informations
    case 3127 === props.idcc &&
      props.step === IndemnitePrecariteStepName.InfosGenerales:
      return <Agreement3127Informations />;
    default:
      return <></>;
  }
}
