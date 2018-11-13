/*

calcul de l'indemnite de licenciement ou rupture conventionnelle

https://github.com/SocialGouv/code-du-travail-explorer/issues/39

*/

const sum = arr => arr.reduce((sum, c) => sum + parseFloat(c), 0);

// todo: ensure effectivity is not at day-1 for isR12342
// https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000019225838&cidTexte=LEGITEXT000006072050

const getIndemnite = data => {
  const {
    salaires,
    primes,
    anciennete,
    isR12342,
    fauteGrave,
    calculConvention
  } = data;

  // a) moyenne des douze derniers mois
  // (a)=moyenne((mois1+prime)+(mois2+prime)... (mois 12+prime))
  const moyenneSalaires =
    (sum(salaires) + (primes || 0)) / salaires.length || 0;
  // b) moyenne des 3 derniers mois
  // (b)=moyenne((mois10+prime)+(mois11+prime)... (mois 12+prime))
  const moyenne3DerniersMois =
    (sum(salaires.filter((_, i) => i < 3)) + (primes / 12) * 3) / 3;
  // si b>a, (c)=(b) sinon (c)=a
  const meilleurMoyenne = Math.max(moyenneSalaires, moyenne3DerniersMois);

  let indemnite = 0;
  const isSmallAnciennete = anciennete / 12 <= 10; // 10 years
  if (isR12342) {
    // "calculavant2017" : date du licenciement < 26 / 09 / 2017
    // Si "ancienneté inférieure ou égale à 10 ans
    if (isSmallAnciennete) {
      // indemnite = 1 / 5 * c * 10
      indemnite = ((1 / 5) * meilleurMoyenne * anciennete) / 12;
    } else {
      // Si ancienneté supérieur à 10 ans:
      // indemnite = 1 / 5 * c * 10 + 2 / 5 * c * d
      indemnite =
        (1 / 5) * meilleurMoyenne * 10 +
        (2 / 5) * meilleurMoyenne * (anciennete / 12 - 10);
    }
  } else {
    // Si "ancienneté inférieure ou égale à 10 ans
    if (isSmallAnciennete) {
      // indemnite = 1 / 4 * c * 10
      indemnite = ((1 / 4) * meilleurMoyenne * anciennete) / 12;
    } else {
      // Si ancienneté supérieurd à 10 ans:
      //indemnite = 1 / 4 * c * 10 + 1 / 3 * c * d
      indemnite =
        (1 / 4) * meilleurMoyenne * 10 +
        (1 / 3) * meilleurMoyenne * (anciennete / 12 - 10);
    }
  }

  const errors = [];

  if (anciennete < 12) {
    errors.push({
      type: "warning",
      message:
        "L'indemnité de licenciement est dûe au-delà d'un an d'ancienneté."
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
    meilleurMoyenne,
    indemnite,
    errors,
    calculCC
  };
};

export default getIndemnite;
