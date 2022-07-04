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

export const mapToPublicodesSituationForIndemniteLicenciement = (
  ccn: number | undefined,
  seniority: IndemniteLicenciementSeniority,
  salaireRef: number,
  salaireAgreementRef: number | undefined,
  inaptitude: boolean
): Record<string, string> => {
  const agreement: Record<string, string> = ccn
    ? {
        "contrat salarié - convention collective": `'IDCC${ccn
          .toString()
          .padStart(4, "0")}'`,
      }
    : { "contrat salarié - convention collective": "''" };

  // paramétrer la bonne cc
  const agreementRefSalary: Record<string, string> = salaireAgreementRef
    ? {
        "contrat salarié - convention collective - organismes de formation - indemnité de licenciement - salaire de référence":
          formatNumberAsString(salaireAgreementRef),
      }
    : {};

  return {
    ...agreement,
    ...agreementRefSalary,
    ...{
      "contrat salarié - salaire de référence":
        formatNumberAsString(salaireRef),
      "contrat salarié . absence pour accident de trajet": formatNumberAsString(
        seniority.absenceAccidentTrajet
      ),
      "contrat salarié . absence pour congé création d'entreprise":
        formatNumberAsString(seniority.absenceCongesCreationEntreprise),
      "contrat salarié . absence pour congé parental d'éducation":
        formatNumberAsString(seniority.absenceCongesParentalEducation),
      "contrat salarié . absence pour congé paternité": formatNumberAsString(
        seniority.absenceCongesPaternite
      ),
      "contrat salarié . absence pour congé sabbatique": formatNumberAsString(
        seniority.absenceCongesSabbatique
      ),
      "contrat salarié . absence pour congé sans solde": formatNumberAsString(
        seniority.absenceCongesSansSolde
      ),
      "contrat salarié . absence pour grève": formatNumberAsString(
        seniority.absenceGreve
      ),
      "contrat salarié . absence pour maladie d'origine non pro":
        formatNumberAsString(seniority.absenceMaladieOrigineNonPro),
      "contrat salarié . absence pour maladie non pro": formatNumberAsString(
        seniority.absenceMaladiePro
      ),
      "contrat salarié . absence pour mise à pied": formatNumberAsString(
        seniority.absenceMiseAPied
      ),
      "contrat salarié . convention collective": "''",
      "contrat salarié . date d'entrée": seniority.entryDate,
      "contrat salarié . date de sortie": seniority.exitDate,
      "contrat salarié . inaptitude suite à un accident ou maladie professionnelle":
        inaptitude ? "oui" : "non",
      "indemnité de licenciement": "oui",
    },
  };
};
