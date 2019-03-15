const prevFiches = require("./fiches-sp-travail.old.json");
const nextFiches = require("./fiches-sp-travail.json");

// Toutes les fiches précédentes qui ne sont plus dans les fiches suivantes
const suppressedFiches = prevFiches.filter(prevFiche =>
    !nextFiches.some((nextFiche) =>
        nextFiche.url === prevFiche.url
    )
);
// Toutes les fiches suivantes qui ne sont pas dans les fiches précédentes
const addedFiches = nextFiches.filter(nextFiche =>
    !prevFiches.some(prevFiche =>
        prevFiche.url === nextFiche.url
    )
);

console.log(`
    ## ${suppressedFiches.length} Fiches supprimées
    ${suppressedFiches.map(fiche => `[${fiche.id} - ${fiche.title}] ${fiche.url}`).join("\n")}
    ## ${addedFiches.length} Fiches ajoutées
    ${addedFiches.map(fiche => `[${fiche.id} -${fiche.title}] ${fiche.url}`).join("\n")}
`);
