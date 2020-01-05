const fiches = require("./fiches-mt.json");

const hasNoTheme = fiche =>
  !fiche.breadcrumbs || fiche.breadcrumbs.length === 0;

const themeLessFiches = fiches.filter(hasNoTheme);
console.log(`
### Fiches travail.gouv.fr sans thème : ${themeLessFiches.length}/${
  fiches.length
}

${themeLessFiches.map(fiche => ` - [${fiche.title}](${fiche.url})`).join("\n")}

`);
