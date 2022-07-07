import { formatNumberAsString } from "./common";

export type IndemniteLicenciementSeniority = {
  absenceAccidentTrajet: number;
  absenceCongesCreationEntreprise: number;
  absenceCongesParentalEducation: number;
  absenceCongesPaternite: number;
  absenceCongesSabbatique: number;
  absenceGreve: number;
  absenceMaladieOrigineNonPro: number;
  absenceCongesSansSolde: number;
  absenceMaladiePro: number;
  absenceMiseAPied: number;
  entryDate: string;
  exitDate: string;
};

export const mapToPublicodesSituationForIndemniteLicenciementLegal = (
  seniority: IndemniteLicenciementSeniority,
  salaireRef: number,
  inaptitude: boolean
): Record<string, string> => {
  return {
    ...{
      "contrat salarié . indemnité de licenciement . salaire de référence":
        formatNumberAsString(salaireRef),
      "contrat salarié . indemnité de licenciement . absence pour accident de trajet":
        formatNumberAsString(seniority.absenceAccidentTrajet),
      "contrat salarié . indemnité de licenciement . absence pour congé création d'entreprise":
        formatNumberAsString(seniority.absenceCongesCreationEntreprise),
      "contrat salarié . indemnité de licenciement . absence pour congé parental d'éducation":
        formatNumberAsString(seniority.absenceCongesParentalEducation),
      "contrat salarié . indemnité de licenciement . absence pour congé paternité":
        formatNumberAsString(seniority.absenceCongesPaternite),
      "contrat salarié . indemnité de licenciement . absence pour congé sabbatique":
        formatNumberAsString(seniority.absenceCongesSabbatique),
      "contrat salarié . indemnité de licenciement . absence pour congé sans solde":
        formatNumberAsString(seniority.absenceCongesSansSolde),
      "contrat salarié . indemnité de licenciement . absence pour grève":
        formatNumberAsString(seniority.absenceGreve),
      "contrat salarié . indemnité de licenciement . absence pour maladie d'origine non pro":
        formatNumberAsString(seniority.absenceMaladieOrigineNonPro),
      "contrat salarié . indemnité de licenciement . absence pour maladie non pro":
        formatNumberAsString(seniority.absenceMaladiePro),
      "contrat salarié . indemnité de licenciement . absence pour mise à pied":
        formatNumberAsString(seniority.absenceMiseAPied),
      "contrat salarié . indemnité de licenciement . date d'entrée":
        seniority.entryDate,
      "contrat salarié . indemnité de licenciement . date de sortie":
        seniority.exitDate,
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        inaptitude ? "oui" : "non",
      "indemnité de licenciement": "oui",
    },
  };
};

export const mapToPublicodesSituationForIndemniteLicenciementConventionnel = (
  ccn: number,
  agreementParameters: Record<string, string>,
  seniority: IndemniteLicenciementSeniority,
  salaireRef: number,
  inaptitude: boolean
): Record<string, string> => {
  return {
    ...agreementParameters,
    ...{
      "contrat salarié . indemnité de licenciement . salaire de référence":
        formatNumberAsString(salaireRef),
      "contrat salarié . indemnité de licenciement . absence pour accident de trajet":
        formatNumberAsString(seniority.absenceAccidentTrajet),
      "contrat salarié . indemnité de licenciement . absence pour congé création d'entreprise":
        formatNumberAsString(seniority.absenceCongesCreationEntreprise),
      "contrat salarié . indemnité de licenciement . absence pour congé parental d'éducation":
        formatNumberAsString(seniority.absenceCongesParentalEducation),
      "contrat salarié . indemnité de licenciement . absence pour congé paternité":
        formatNumberAsString(seniority.absenceCongesPaternite),
      "contrat salarié . indemnité de licenciement . absence pour congé sabbatique":
        formatNumberAsString(seniority.absenceCongesSabbatique),
      "contrat salarié . indemnité de licenciement . absence pour congé sans solde":
        formatNumberAsString(seniority.absenceCongesSansSolde),
      "contrat salarié . indemnité de licenciement . absence pour grève":
        formatNumberAsString(seniority.absenceGreve),
      "contrat salarié . absence pour maladie d'origine non pro":
        formatNumberAsString(seniority.absenceMaladieOrigineNonPro),
      "contrat salarié . absence pour maladie non pro": formatNumberAsString(
        seniority.absenceMaladiePro
      ),
      "contrat salarié . indemnité de licenciement . absence pour mise à pied":
        formatNumberAsString(seniority.absenceMiseAPied),
      "contrat salarié . convention collective": `'IDCC${ccn
        .toString()
        .padStart(4, "0")}'`,
      "contrat salarié . indemnité de licenciement . date d'entrée":
        seniority.entryDate,
      "contrat salarié . indemnité de licenciement . date de sortie":
        seniority.exitDate,
      "contrat salarié . indemnité de licenciement . inaptitude suite à un accident ou maladie professionnelle":
        inaptitude ? "oui" : "non",
      "indemnité de licenciement": "oui",
    },
  };
};
