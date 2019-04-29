const fiches = require("./fiches-sp-travail")

const isFicheInfo = fiche => fiche.type !== "Fiche Question-réponse"
const isFicheQR = fiche => fiche.type === "Fiche Question-réponse"
const isFicheParticulier = fiche => fiche.url.match(/particuliers/)
const isFicheEntreprise = fiche => !fiche.url.match(/particuliers/)
const hasNoTheme = fiche => fiche.themeCdtn.length === 0
const printFicheLink = fiche => console.log(`- [${fiche.id}](${fiche.url})`)

const themeLessFiches = fiches.filter(hasNoTheme)
const fichesParticulier = themeLessFiches.filter(isFicheParticulier)
const fichesParticulierQR = fichesParticulier.filter(isFicheQR)
const fichesParticulierInfo = fichesParticulier.filter(isFicheInfo)

const fichesEntreprise = themeLessFiches.filter(isFicheEntreprise)
const fichesEntrepriseQR = fichesEntreprise.filter(isFicheQR)
const fichesEntrepriseInfo = fichesEntreprise.filter(isFicheInfo)

console.log(`### ${themeLessFiches.length}/${fiches.length} fiches sans theme`)

console.log(`### ${fichesParticulierQR.length} fiches Q/R particuliers`)
fichesParticulierQR.forEach(printFicheLink);

console.log(`### ${fichesParticulierInfo.length} fiches Info particuliers`)
fichesParticulierInfo.forEach(printFicheLink);

console.log(`### ${fichesEntrepriseQR.length} fiches Q/R entreprise`)
fichesEntrepriseQR.forEach(printFicheLink);

console.log(`### ${fichesEntrepriseInfo.length} fiches Info entreprise`)
fichesEntrepriseInfo.forEach(printFicheLink);


