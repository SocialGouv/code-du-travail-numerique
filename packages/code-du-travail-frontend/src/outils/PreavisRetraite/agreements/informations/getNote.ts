import { PublicodesInformation } from "../../../CommonIndemniteDepart/steps/Informations/store";
import { DepartOuMiseRetraite } from "../../steps/OriginStep/store";

export const getNote = (
  typeDepart: DepartOuMiseRetraite,
  publicodesInformations: PublicodesInformation[],
): string | undefined => {
  if (
    publicodesInformations.find(
      (info) =>
        info.question.name ===
        "contrat salarié - convention collective - particuliers employeurs et emploi à domicile - catégorie professionnelle",
    )?.info === "'Assistants maternels du particulier employeur'" &&
    typeDepart === "mise-retraite"
  ) {
    return "Les règles concernant la rupture du contrat de travail par le particulier employeur sont prévues par la convention collective et le Code de l’action sociale et des familles. Ces textes n’envisagent pas la mise à la retraite. Pour obtenir une durée de préavis, il doit s'agir d'un départ volontaire du salarié à la retraite (étape n°2 du simulateur).";
  }
  return undefined;
};
