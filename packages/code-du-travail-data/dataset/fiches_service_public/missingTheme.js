const fiches = require("./fiches-sp-travail");

const isFicheInfo = fiche => fiche.type !== "Fiche Question-réponse";
const isFicheQR = fiche => fiche.type === "Fiche Question-réponse";
const isFicheParticulier = fiche => fiche.url.match(/particuliers/);
const isFicheAssociation = fiche => fiche.url.match(/associations/);
const isFicheEntreprise = fiche => fiche.url.match(/professionnels/);
const hasNoTheme = fiche =>
  !fiche.breadcrumbs || fiche.breadcrumbs.length === 0;
const printFicheLink = fiche => console.log(`- [${fiche.id}](${fiche.url})`);

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

console.log(`### ${fichesParticulierQR.length} fiches Q/R particuliers`);
fichesParticulierQR.forEach(printFicheLink);

console.log(`### ${fichesParticulierInfo.length} fiches Info particuliers`);
fichesParticulierInfo.forEach(printFicheLink);

console.log(`### ${fichesEntrepriseQR.length} fiches Q/R entreprise`);
fichesEntrepriseQR.forEach(printFicheLink);

console.log(`### ${fichesEntrepriseInfo.length} fiches Info entreprise`);
fichesEntrepriseInfo.forEach(printFicheLink);

console.log(`### ${fichesAssociationQR.length} fiches Q/R Association`);
fichesAssociationQR.forEach(printFicheLink);

console.log(`### ${fichesAssociationInfo.length} fiches Info Association`);
fichesAssociationInfo.forEach(printFicheLink);
