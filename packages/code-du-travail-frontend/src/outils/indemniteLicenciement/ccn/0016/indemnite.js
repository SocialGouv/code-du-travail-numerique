import { round, sum } from "../../math";
import { CADRE, TAM, OUVRIER } from "./Categorie";
/**
 * calcul de l’indemnite de licenciement conventionnelle
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
  categorie
}) {
  const primeValues = primes.map(a => a.prime);
  const salaryValues = salaires.map(a => a.salary);

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
  hasRetirementAge
}) {
  let error;
  let indemniteConventionnelle = 0;
  let formula = "";

  if (Math.floor(anciennete) < 2) {
    error =
      "Aucune indemnité de licenciement n’est prévue en deça de 2 ans d’ancienneté.";
  } else if (categorie === OUVRIER || categorie === TAM) {
    const bareme2_3 = {
      [OUVRIER]: { value: 1 / 10, label: "1/10" },
      [TAM]: { value: 1 / 10, label: "1/10" }
    };

    const bareme3plus = {
      [OUVRIER]: { value: 2 / 10, label: "2/10" },
      [TAM]: { value: 3 / 10, label: "3/10" }
    };
    const bareme = anciennete >= 3 ? bareme3plus : bareme2_3;
    indemniteConventionnelle =
      bareme[categorie].value * salaireRef * anciennete;
    formula = `${bareme[categorie].label} * ${round(salaireRef)} * ${round(
      anciennete
    )}`;
  } else {
    // categorie === CADRE
    if (anciennete >= 3) {
      // 4/10 * salaire de référence * ancienneté_cadres en années
      // + 3/10 * salaire de référence * ancienneté TAM et employé en années
      indemniteConventionnelle =
        (4 / 10) * salaireRef * (cadreDuration / 12) +
        (3 / 10) * salaireRef * (tamDuration / 12);

      formula = `4/10 * ${round(salaireRef)} * ${round(
        cadreDuration / 12
      )} + 3/10 * ${round(salaireRef)} * ${round(tamDuration / 12)}`;
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
      indemniteConventionnelle += majoration - minoration;
      formula += ` ${majoration > 0 ? ` + ${majoration}` : ""}- ${minoration}`;
    }
  }

  return {
    indemniteConventionnelle: round(indemniteConventionnelle),
    formula,
    error
  };
}
