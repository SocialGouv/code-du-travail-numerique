import { round, sum } from "../../../common/utils";
import { getSalaireRef } from "../../indemnite";

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
}) {
  let ancienneteConventionnelle = 0;

  ancienneteConventionnelle += parseFloat(ancienneteLegale);
  // categorie is ETAM or IC
  if (
    (brancheCategorie !== "CEI" || brancheCategorie !== "CENI") &&
    hasBrancheContrat
  ) {
    ancienneteConventionnelle += parseFloat(brancheContrat.duration) / 12;
  }
  return ancienneteConventionnelle;
}

function getSalaireRefConventionnel({
  anciennete,
  salaire,
  hasTempsPartiel = false,
  salairePeriods = [],
  hasSameSalaire = false,
  salaires = [],
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
      : sum(salaires.map((a) => parseFloat(a.salary))) / salaires.length;

    return moyenneSalaires;
  }
}

export function getIndemniteConventionnelle(data) {
  const {
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
    // Ajustement Salaire
    hasBrancheNewSalaire,
    hasBrancheNewRegularSalaire,
    brancheNewRegularSalaire,
    brancheNewIrregularSalaire,
  } = data;
  // First of all, compute the new anciennete
  const ancienneteConventionnelle = getAncienneteConventionnelle({
    ancienneteLegale,
    brancheCategorie,
    brancheContrat,
    hasBrancheContrat,
  });

  let salaireRefConventionnel;
  let error;
  if (brancheCategorie === "CEI") {
    salaireRefConventionnel = round(getSalaireRef(data));
  } else if (hasBrancheNewSalaire) {
    salaireRefConventionnel = getSalaireRefConventionnel({
      hasSameSalaire: hasBrancheNewRegularSalaire,
      hasTempsPartiel: false,
      salaire: brancheNewRegularSalaire,
      salaires: brancheNewIrregularSalaire,
    });
  } else {
    salaireRefConventionnel = getSalaireRefConventionnel({
      anciennete: ancienneteLegale,
      hasSameSalaire,
      hasTempsPartiel,
      salaire,
      salairePeriods,
      salaires,
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

  const indemniteMax = maxMonthIndemnite * salaireRefConventionnel;
  const previousIndemnites =
    hasBrancheContrat &&
    brancheContrat.considered &&
    parseFloat(brancheContrat.indemnite);

  const indemniteConventionnelleNotCeiled = round(
    coefficient * salaireRefConventionnel * ancienneteConventionnelle -
      (previousIndemnites || 0)
  );

  const isCeilingReached = indemniteMax <= indemniteConventionnelleNotCeiled;

  const indemniteConventionnelle = isCeilingReached
    ? indemniteMax
    : indemniteConventionnelleNotCeiled;

  const labels = {
    "Salaire de référence (Sref)": round(salaireRefConventionnel),
    ...(isCeilingReached && {
      "Plafond d'indemnité conventionnel en mois (Pmois)": maxMonthIndemnite,
    }),
    ...(!isCeilingReached && {
      "Coefficient d'indemnité conventionnel (C)": round(coefficient),
    }),
    ...(!isCeilingReached && {
      "Ancienneté conventionnelle (A)": round(ancienneteConventionnelle),
    }),
    ...(!isCeilingReached &&
      previousIndemnites && {
        "Indemnité de licenciement perçue précédemment ( I )":
          previousIndemnites,
      }),
  };

  const formula = isCeilingReached
    ? `Pmois * Sref`
    : `(C * Sref * A${previousIndemnites ? " - I" : ""})`;

  return {
    error,
    indemniteConventionnelle,
    infoCalculConventionnel: { formula, labels },
  };
}
