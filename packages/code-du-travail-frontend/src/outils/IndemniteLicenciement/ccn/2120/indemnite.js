import { sum, round } from "../../../common/math";
import { parse } from "../../../common/date";
import { max, min, isAfter, differenceInMonths } from "date-fns";
import {
  CADRE,
  NON_CADRE,
  NE_SAIT_PAS,
  DISCIPLINAIRE,
  NON_DISCIPLINAIRE,
  ECONOMIQUE,
  optionCategorie,
  optionMotifs
} from "./Step";

function getSalaireRef({
  hasTempsPartiel = false,
  hasSameSalaire = false,
  salaire,
  salairePeriods,
  salaires = [],
  anciennete
}) {
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
  }
  return hasSameSalaire ? (12 / 13) * salaire : (1 / 13) * sum(salaryValues);
}

function getIndemnite({
  salaireRef,
  dateEntree,
  dateSortie,
  anciennete,
  categorie = NON_CADRE,
  motif
}) {
  const dEntree = parse(dateEntree);
  const dSortie = parse(dateSortie);

  let indemniteConventionnelle = 0;
  let formula = "";
  let error;
  let labels = {
    "Salaire de référence (Sref)": round(salaireRef),
    "Motif du licenciement": optionMotifs[motif],
    Catégorie: optionCategorie[categorie]
  };
  if (anciennete < 1) {
    return {
      indemniteConventionnelle,
      infoCalculConventionnel: {
        formula: "-",
        labels
      },
      error:
        "La convention collective prévoit une indemnité conventionnelle de licenciement à partir d'un an d'ancienneté"
    };
  }
  if (motif === DISCIPLINAIRE) {
    return {
      indemniteConventionnelle,
      infoCalculConventionnel: {
        formula: "-",
        labels
      },
      error:
        "La convention collective prévoit le droit à l’indemnité légale en cas de licenciement pour motif disciplinaire, sauf pour faute grave ou lourde"
    };
  }
  const year2002 = new Date("2002-01-01");

  const nbSemestreAvant2002 = Math.floor(
    differenceInMonths(year2002, min([year2002, dEntree])) / 6
  );
  const nbSemestreApres2002 = Math.floor(
    differenceInMonths(dSortie, max([dEntree, year2002])) / 6
  );

  labels["nombre de semestres avant 2002 (S1)"] = round(nbSemestreAvant2002);
  labels["nombre de semestres après 2002 (S2)"] = round(nbSemestreApres2002);

  if (motif === NON_DISCIPLINAIRE) {
    if (nbSemestreAvant2002 > 0) {
      indemniteConventionnelle =
        (1 / 2) * (13 / 14.5) * salaireRef * nbSemestreAvant2002;
      formula = `1/2 * 13/14.5 * Sref * S1 + `;
    }

    indemniteConventionnelle += (1 / 5) * salaireRef * nbSemestreApres2002;
    formula += `1/5 * Sref * S2`;
  } else if (motif === ECONOMIQUE) {
    if (nbSemestreAvant2002 > 0) {
      indemniteConventionnelle = (1 / 2) * salaireRef * nbSemestreAvant2002;
      formula = `1/2 * Sref * S1 + `;
    }
    indemniteConventionnelle += (1 / 4) * salaireRef * nbSemestreApres2002;
    formula += `1/4 * Sref * S2`;
  }

  console.log("Indemnite conv :", indemniteConventionnelle);

  const isEmbaucheAfter1999 = isAfter(dEntree, new Date("1999-12-31"));

  if (isEmbaucheAfter1999) {
    let plafond = {
      [CADRE]: 24,
      [NON_CADRE]: 18,
      [NE_SAIT_PAS]: 18
    };

    if (
      indemniteConventionnelle >
      plafond[categorie] * (13 / 14.5) * salaireRef
    ) {
      indemniteConventionnelle = plafond[categorie] * (13 / 14.5) * salaireRef;
      formula = `${plafond[categorie]} * (13 / 14.5) * Sref)`;
    }
  } else {
    const plafond = {
      [ECONOMIQUE]: 18,
      [NON_DISCIPLINAIRE]: 15
    };

    if (indemniteConventionnelle > plafond[motif] * salaireRef) {
      indemniteConventionnelle = plafond[motif] * salaireRef;
      formula = `${plafond[motif]} * Sref)`;
    }
  }

  return {
    indemniteConventionnelle: round(indemniteConventionnelle),
    infoCalculConventionnel: { formula, labels },
    error
  };
}
export { getSalaireRef, getIndemnite };
