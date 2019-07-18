import { round, sum } from "../../../common/math";

const COEFF_ETAM_0 = 1 / 4;
const COEFF_ETAM_1 = 0.3;
const MAX_MONTH_INDEMNITE_ETAM = 10;
const COEFF_IC = 1 / 3;
const MAX_MONTH_INDEMNITE_IC = 12;
const COEFF_CEI = 1 / 5;
const MAX_MONTH_INDEMNITE_CEI = 7;

export const ERROR_LABEL =
  "Aucune indemnité de licenciement conventionnelle n’est prévue en deçà de 2 ans d’ancienneté.";

function getAncienneteConventionnelle({
  brancheCategorie,
  ancienneteLegale,
  hasBrancheContrat,
  brancheContrat,
  brancheAncienneteCE,
  brancheAncienneteEnqueteur
}) {
  let ancienneteConventionnelle = 0;
  if (brancheCategorie === "CEI" || brancheCategorie === "CENI") {
    ancienneteConventionnelle +=
      parseFloat(brancheAncienneteCE) / 12 +
      parseInt(brancheAncienneteEnqueteur); // We only accept round years
  } else {
    // categorie is ETAM or IC
    ancienneteConventionnelle += parseFloat(ancienneteLegale);
    if (hasBrancheContrat) {
      ancienneteConventionnelle += parseFloat(brancheContrat.duration) / 12;
    }
  }
  return ancienneteConventionnelle;
}

function getSalaireRefConventionnel({
  anciennete,
  salaire,
  hasTempsPartiel = false,
  salairePeriods = [],
  hasSameSalaire = false,
  salaires = []
}) {
  // beware this one below is a code duplication from indemniteLegale which does not take primes into account
  if (hasTempsPartiel) {
    return salairePeriods.reduce(
      (salaire, period) =>
        parseFloat(salaire) +
        (parseFloat(period.salary, 10) * parseFloat(period.duration, 10)) /
          12 /
          parseFloat(anciennete),
      0
    );
  } else {
    const moyenneSalaires = hasSameSalaire
      ? parseFloat(salaire)
      : sum(salaires.map(a => parseFloat(a.salary))) / salaires.length;

    return moyenneSalaires;
  }
}

export function getIndemniteConventionnelle(
  {
    // Generiques
    anciennete: ancienneteLegale,
    salaire,
    hasSameSalaire,
    salaires,
    hasTempsPartiel,
    salairePeriods,
    // Specifiques branches
    brancheCategorie,
    // Ancienneté ETAM/CI
    hasBrancheContrat,
    brancheContrat,
    // Ancienneté CE
    brancheAncienneteCE,
    brancheAncienneteEnqueteur,
    // Ajustement Salaire
    hasBrancheNewSalaire,
    hasBrancheNewRegularSalaire,
    brancheNewRegularSalaire,
    brancheNewIrregularSalaire
  },
  salaireRefLegal
) {
  // First of all, compute the new anciennete
  const ancienneteConventionnelle = getAncienneteConventionnelle({
    brancheCategorie,
    ancienneteLegale,
    hasBrancheContrat,
    brancheContrat,
    brancheAncienneteCE,
    brancheAncienneteEnqueteur
  });

  let salaireRefConventionnel;
  let formula;
  let error;
  if (brancheCategorie === "CEI") {
    salaireRefConventionnel = round(salaireRefLegal);
  } else if (hasBrancheNewSalaire) {
    salaireRefConventionnel = getSalaireRefConventionnel({
      hasTempsPartiel: false,
      hasSameSalaire: hasBrancheNewRegularSalaire,
      salaire: brancheNewRegularSalaire,
      salaires: brancheNewIrregularSalaire
    });
  } else {
    salaireRefConventionnel = getSalaireRefConventionnel({
      anciennete: ancienneteLegale,
      salaire,
      hasTempsPartiel,
      salairePeriods,
      hasSameSalaire,
      salaires
    });
  }

  let coefficient = 0;
  let maxMonthIndemnite = 0;
  if (ancienneteConventionnelle >= 2) {
    if (brancheCategorie === "ETAM" || brancheCategorie === "CENI") {
      maxMonthIndemnite = MAX_MONTH_INDEMNITE_ETAM;
      if (ancienneteConventionnelle < 20) {
        coefficient = COEFF_ETAM_0;
      } else {
        coefficient = COEFF_ETAM_1;
      }
    } else {
      // categorie IC or CEI
      if (brancheCategorie === "CEI") {
        maxMonthIndemnite = MAX_MONTH_INDEMNITE_CEI;
        coefficient = COEFF_CEI;
      } else {
        maxMonthIndemnite = MAX_MONTH_INDEMNITE_IC;
        coefficient = COEFF_IC;
      }
    }
  } else {
    error = ERROR_LABEL;
  }

  const inedmniteMax = maxMonthIndemnite * salaireRefConventionnel;
  const previousIndemnites =
    hasBrancheContrat &&
    brancheContrat.considered &&
    parseFloat(brancheContrat.indemnite);

  let labels = {
    "Coefficient d'indemnité conventionnel (C)": round(coefficient),
    "Salaire de référence (Sref)": round(salaireRefConventionnel),
    "Ancienneté conventionnelle (A)": round(ancienneteConventionnelle),
    "Plafond d'indemnité conventionnel en mois (Pmois)": maxMonthIndemnite,
    ...(previousIndemnites && {
      "Indemnité de licenciement perçue précédemment ( I )": previousIndemnites
    })
  };

  formula = `(C * Sref * A${previousIndemnites ? " - I" : ""}) <= Pmois * Sref`;
  const indemniteConventionnelleNotFloored = round(
    coefficient * salaireRefConventionnel * ancienneteConventionnelle -
      (previousIndemnites || 0)
  );

  const indemniteConventionnelle = Math.min(
    indemniteConventionnelleNotFloored,
    inedmniteMax
  );

  return {
    indemniteConventionnelle,
    infoCalculConventionnel: { formula, labels },
    error
  };
}
