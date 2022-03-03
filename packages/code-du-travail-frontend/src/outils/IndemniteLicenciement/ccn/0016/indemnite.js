import { round, sum } from "../../../common/utils";
import { CADRE, OUVRIER, TAM } from "./Categorie";
/**
 * calcul de l'indemnite de licenciement conventionnelle
 * TRANSPORTS ROUTIERS ET ACTIVITÉS AUXILIAIRES DU TRANSPORT- IDCC 16
 * https://github.com/SocialGouv/code-du-travail-numerique/issues/896
 */

export function getSalaireRef({
  hasTempsPartiel = false,
  hasSameSalaire = false,
  salaire,
  salairePeriods,
  salaires = [],
  primes = [],
  anciennete,
  categorie,
}) {
  const primeValues = primes.map((a) => a.prime);
  const salaryValues = salaires.map((a) => a.salary);

  // calcul du salaire de reference
  if (hasTempsPartiel) {
    return salairePeriods.reduce(
      (salaire, period) =>
        salaire +
        (parseInt(period.salary, 10) * parseInt(period.duration, 10)) /
          12 /
          anciennete,
      0
    );
  } else {
    if (categorie === CADRE || categorie === TAM) {
      return hasSameSalaire ? salaire : salaryValues[0];
    }
    return hasSameSalaire
      ? salaire
      : (sum(salaryValues.slice(0, 3)) -
          sum(primeValues) +
          sum(primeValues) / 12) /
          3;
  }
}

export function getIndemnite({
  age,
  categorie,
  salaireRef,
  indemnite,
  anciennete,
  tamDuration,
  cadreDuration,
  hasRetirementAge,
}) {
  let error;
  let indemniteConventionnelle = 0;
  let formula = "-";
  const labels = {
    "Salaire de référence (Sref)": salaireRef,
    ...(!tamDuration &&
      !cadreDuration && { "Ancienneté totale, en année, (A)": anciennete }),
    Catégorie: categorie,
    ...(cadreDuration > 0 && {
      "Durée comme cadre, en mois, (Dc)": cadreDuration,
    }),
    ...(tamDuration > 0 && { "durée comme TAM, en mois, (Dt)": tamDuration }),
    "En âge de partir à la retraite": hasRetirementAge ? "oui" : "non",
  };

  if (Math.floor(anciennete) < 2) {
    error =
      "Aucune indemnité de licenciement n’est prévue en deçà de 2 ans d’ancienneté.";
  } else if (categorie === OUVRIER || categorie === TAM) {
    const bareme2_3 = {
      [OUVRIER]: { label: "1/10", value: 1 / 10 },
      [TAM]: { label: "1/10", value: 1 / 10 },
    };

    const bareme3plus = {
      [OUVRIER]: { label: "2/10", value: 2 / 10 },
      [TAM]: { label: "3/10", value: 3 / 10 },
    };
    const bareme = anciennete >= 3 ? bareme3plus : bareme2_3;
    indemniteConventionnelle =
      bareme[categorie].value * salaireRef * anciennete;
    formula = `${bareme[categorie].label} * Sref * A`;
  } else {
    // categorie === CADRE
    if (anciennete >= 3) {
      // 4/10 * salaire de référence * ancienneté_cadres en années
      // + 3/10 * salaire de référence * ancienneté TAM et employé en années
      indemniteConventionnelle =
        (2 / 5) * salaireRef * (cadreDuration / 12) +
        (3 / 10) * salaireRef * (tamDuration / 12);

      formula = `2 / 5 * Sref * Dc + 3 / 10 * Sref * Dt`;
    } else {
      // 2 <= ancienete < 3
      indemniteConventionnelle = indemnite;
    }
  }

  // minoration // majoration
  let minoration = 0;
  let majoration = 0;
  if (age >= 61 && hasRetirementAge) {
    minoration = (age - 60) * 0.2 * indemniteConventionnelle;
    if (categorie === CADRE && cadreDuration / 12 >= 5) {
      const baremeMajorationAnciennete = [0, 2, 5, 9];
      const tranche = Math.min(
        Math.floor(anciennete / 10),
        baremeMajorationAnciennete.length - 1
      );
      majoration = salaireRef * baremeMajorationAnciennete[tranche];
    }
    if (majoration < minoration) {
      labels.majoration = majoration;
      labels.minoration = minoration;
      indemniteConventionnelle += majoration - minoration;
      formula += ` ${majoration > 0 ? ` + majoration` : ""} - minoration`;
    }
  }
  return {
    error,
    indemniteConventionnelle: round(indemniteConventionnelle),
    infoCalculConventionnel: { formula, labels },
  };
}
