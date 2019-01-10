/*
calcul de l'indemnite de licenciement ou rupture conventionnelle
*/

const sum = arr => arr.reduce((sum, c) => sum + parseFloat(c), 0);
const round = fl => parseInt(fl * 100) / 100;

const getIndemnite = data => {
  const {
    isR12342,
    salaires,
    primes,
    fauteGrave,
    anciennete,
    calculConvention
  } = data;
  let salaireRef;
  let moyenne3DerniersMois;
  let moyenneSalaires;
  let formula;

  if (salaires.isPartiel) {
    salaireRef =
      salaires.periods.reduce(
        (salaire, period) =>
          salaire +
          (parseInt(period.salaire, 10) * parseInt(period.duree, 10)) /
            anciennete,
        0
      ) +
      (primes || 0) / anciennete;
  } else {
    moyenneSalaires =
      (sum(salaires.derniersMois) + (primes || 0)) /
        salaires.derniersMois.length || 0;

    moyenne3DerniersMois =
      (sum(salaires.derniersMois.slice(0, 3)) +
        (primes / salaires.derniersMois.length) * 3) /
      3;

    salaireRef = Math.max(moyenneSalaires, moyenne3DerniersMois);
  }

  let indemnite = 0;
  const isSmallAnciennete = anciennete / 12 <= 10; // 10 years
  if (isR12342) {
    if (isSmallAnciennete) {
      indemnite = ((1 / 5) * salaireRef * anciennete) / 12;
      formula = `(1/5 * ${round(salaireRef)} * ${anciennete}) / 12`;
    } else {
      indemnite =
        ((1 / 5) * salaireRef * anciennete) / 12 +
        (2 / 15) * salaireRef * (anciennete / 12 - 10);
      formula = `(1/5  * ${round(salaireRef)} * 10) + (2/5 * ${round(
        salaireRef
      )} * (${round(anciennete / 12)} - 10))`;
    }
  } else {
    if (isSmallAnciennete) {
      indemnite = ((1 / 4) * salaireRef * anciennete) / 12;
      formula = `(1/4 * ${round(salaireRef)} * ${anciennete}) / 12`;
    } else {
      indemnite =
        (1 / 4) * salaireRef * 10 +
        (1 / 3) * salaireRef * (anciennete / 12 - 10);
      formula = `(1/4 * ${round(salaireRef)} * 10) + (1/3 * ${round(
        salaireRef
      )} * (${round(anciennete / 12)} - 10))`;
    }
  }

  const errors = [];

  if (anciennete < 12 && isR12342) {
    errors.push({
      type: "warning",
      message:
        "L'indemnité de licenciement est dûe au-delà d'un an d'ancienneté."
    });
    indemnite = 0;
  }

  if (anciennete < 8 && !isR12342) {
    errors.push({
      type: "warning",
      message:
        "L'indemnité de licenciement est dûe au-delà de 8mois d'ancienneté."
    });
    indemnite = 0;
  }

  if (fauteGrave) {
    indemnite = 0;
    errors.push({
      type: "warning",
      message: `L’indemnité légale de licenciement n'est pas dûe en cas de faute grave.
        <br/><br/>
        Vous reporter à la lettre de notification de licenciement, lorsqu'il est invoqué le motif de faute grave doit apparaître précisément dans le courrier.`
    });
  }

  let calculCC;

  if (calculConvention) {
    calculCC = calculConvention({ ...data, indemnite });
  }
  return {
    isSmallAnciennete,
    anciennete,
    isR12342,
    moyenneSalaires,
    moyenne3DerniersMois,
    salaireRef,
    salaires,
    indemnite,
    errors,
    formula,
    calculCC
  };
};

export default getIndemnite;
