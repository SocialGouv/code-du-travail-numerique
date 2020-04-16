const fiches = require("./fiches-mt.json");

const hasNoTheme = (fiche) =>
  !fiche.breadcrumbs || fiche.breadcrumbs.length === 0;

const printFicheLink = (fiche) =>
  console.log(`- [${fiche.title}](${fiche.url})`);

const themeLessFiches = fiches.filter(hasNoTheme);
console.log(`### ${themeLessFiches.length}/${fiches.length} fiches sans theme`);

themeLessFiches.forEach(printFicheLink);

const UNDEFINED_KEY = "UNDEFINED";

const undefinedReferences = fiches.filter((fiche) => {
  const refErrors = fiche.sections.filter((section) => {
    return section.references && UNDEFINED_KEY in section.references;
  });

  return refErrors.length > 0;
});

const printMissingRef = (fiche) => {
  console.log(
    `#### [${fiche.title}](https://master-code-travail.dev.fabrique.social.gouv.fr/fiche-ministere-travail/${fiche.slug})`
  );
  fiche.sections.forEach((section) => {
    if (section.references && UNDEFINED_KEY in section.references) {
      console.log(`- ${section.anchor}`);
      const fmt = section.references[UNDEFINED_KEY].articles.map((ref) =>
        ref.article.replace(".", "").replace(" ", "").replace(/\D*$/, "")
      );
      console.log(`> ${Array.from(new Set(fmt)).join(" / ")}`);
    }
  });
};

console.log(
  `### ${undefinedReferences.length}/${fiches.length} fiches aux références non résolues.`
);
undefinedReferences.map((fiche) => printMissingRef(fiche));
