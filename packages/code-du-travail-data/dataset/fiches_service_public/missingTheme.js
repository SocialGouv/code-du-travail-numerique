const fiches = require("./fiches-sp.json");

const isFicheInfo = fiche => fiche.type !== "Fiche Question-réponse";
const isFicheQR = fiche => fiche.type === "Fiche Question-réponse";
const isFicheParticulier = fiche => fiche.url.match(/particuliers/);
const isFicheAssociation = fiche => fiche.url.match(/associations/);
const isFicheEntreprise = fiche => fiche.url.match(/professionnels/);
const hasNoTheme = fiche =>
  !fiche.breadcrumbs || fiche.breadcrumbs.length === 0;
const printFicheLink = fiche =>
  console.log(`  - [${fiche.id} - ${fiche.title}](${fiche.url})`);

const themeLessFiches = fiches.filter(hasNoTheme);
const fichesParticulier = themeLessFiches.filter(isFicheParticulier);
const fichesParticulierQR = fichesParticulier.filter(isFicheQR);
const fichesParticulierInfo = fichesParticulier.filter(isFicheInfo);

const fichesEntreprise = themeLessFiches.filter(isFicheEntreprise);
const fichesEntrepriseQR = fichesEntreprise.filter(isFicheQR);
const fichesEntrepriseInfo = fichesEntreprise.filter(isFicheInfo);

const fichesAssociation = themeLessFiches.filter(isFicheAssociation);
const fichesAssociationQR = fichesAssociation.filter(isFicheQR);
const fichesAssociationInfo = fichesAssociation.filter(isFicheInfo);

console.log(`### ${themeLessFiches.length}/${fiches.length} fiches sans theme`);

console.log(`- __${fichesParticulierQR.length} fiches__ Q/R particuliers`);
fichesParticulierQR.forEach(printFicheLink);

console.log(`- __${fichesParticulierInfo.length} fiches__ Info particuliers`);
fichesParticulierInfo.forEach(printFicheLink);

console.log(`- __${fichesEntrepriseQR.length} fiches__ Q/R entreprise`);
fichesEntrepriseQR.forEach(printFicheLink);

console.log(`- __${fichesEntrepriseInfo.length} fiches__ Info entreprise`);
fichesEntrepriseInfo.forEach(printFicheLink);

console.log(`- __${fichesAssociationQR.length} fiches__ Q/R Association`);
fichesAssociationQR.forEach(printFicheLink);

console.log(`- __${fichesAssociationInfo.length} fiches__ Info Association`);
fichesAssociationInfo.forEach(printFicheLink);
