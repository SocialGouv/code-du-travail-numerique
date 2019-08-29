const fiches = require("./fiches-min-travail.json");

const hasNoTheme = fiche => !fiche.parents || fiche.parents.length === 0;
const printFicheLink = fiche => console.log(`- [${fiche.title}](${fiche.url})`);

const themeLessFiches = fiches.filter(hasNoTheme);
console.log(`### ${themeLessFiches.length}/${fiches.length} fiches sans theme`);

themeLessFiches.forEach(printFicheLink);
