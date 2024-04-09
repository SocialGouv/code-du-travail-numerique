// @ts-ignore
import fs from "fs";

export const downloadAllUrlsToValidate = async () => {
  const urls: string[] = [
    "/convention-collective",
    "/contribution",
    "/information/cdd-multi-remplacements-en-quoi-consiste-le-dispositif-et-dans-quels-secteurs-peut-il-etre-conclu",
    "/information/covid-19-le-regime-post-crise-sanitaire-a-compter-du-14-mars-2022",
    "/information/en-pratique-que-doivent-faire-les-entreprises-a-partir-du-14-mars-2022-dans-le-cadre-de-lallegement-des-mesures-de-prevention-des-risques-de-contamination-au-covid-19",
    "/information/grand-licenciement-collectif-au-moins-10-salaries-pour-motif-economique-dans-une-entreprise-de-50-salaries-et-plus-avec-cse-le-contrat-de-securisation-professionnelle-csp",
    "/information/grand-licenciement-collectif-au-moins-10-salaries-pour-motif-economique-dans-une-entreprise-de-moins-de-50-salaries-avec-cse-le-conge-de-reclassement",
    "/information/grand-licenciement-collectif-au-moins-10-salaries-pour-motif-economique-dans-une-entreprise-de-moins-de-50-salaries-avec-cse-le-contrat-de-securisation-professionnelle-csp",
    "/information/grand-licenciement-collectif-au-moins-10-salaries-pour-motif-economique-dans-une-entreprise-de-moins-de-50-salaries-sans-cse-le-conge-de-reclassement",
    "/information/grand-licenciement-collectif-au-moins-10-salaries-pour-motif-economique-dans-une-entreprise-de-moins-de-50-salaries-sans-cse-le-contrat-de-securisation-professionnelle-csp",
    "/information/grand-licenciement-collectif-pour-motif-economique-dans-une-entreprise-de-50-salaries-et-plus-avec-cse-le-conge-de-reclassement",
    "/information/grand-licenciement-collectif-pour-motif-economique-dans-une-entreprise-de-50-salaries-et-plus-sans-cse-le-conge-de-reclassement",
    "/information/grand-licenciement-collectif-pour-motif-economique-dans-une-entreprise-de-50-salaries-et-plus-sans-cse-le-contrat-de-securisation-professionnelle-csp",
    "/information/informations-principales-sur-la-relation-de-travail-a-partir-du-1er-novembre-2023-quels-elements-doit-fournir-lemployeur-au-salarie-lors-de-son-embauche",
    "/information/la-prime-de-partage-de-la-valeur-infographie",
    "/information/la-rupture-conventionnelle-est-elle-possible-pour-les-assistants-maternels-et-salaries-du-particulier-employeur",
    "/information/licenciement-individuel-pour-motif-economique-le-conge-de-reclassement-cr",
    "/information/licenciement-individuel-pour-motif-economique-le-contrat-de-securisation-professionnelle-csp",
    "/information/licenciement-pour-inaptitude-medicale",
    "/information/licenciement-pour-motif-disciplinaire",
    "/information/licenciement-pour-motif-non-disciplinaire",
    "/information/licenciement-suite-a-un-accord-de-performance-collective-apc",
    "/information/metallurgie-lessentiel-de-la-nouvelle-convention-collective",
    "/information/particuliers-employeurs-et-emploi-a-domicile-lessentiel-de-la-nouvelle-convention-collective",
    "/information/personnes-vulnerables-reprise-dactivite-ou-activite-partielle",
    "/information/petit-licenciement-collectif-2-a-9-salaries-pour-motif-economique-dans-une-entreprise-avec-cse-le-conge-de-reclassement",
    "/information/petit-licenciement-collectif-2-a-9-salaries-pour-motif-economique-dans-une-entreprise-avec-cse-le-contrat-de-securisation-professionnelle-csp",
    "/information/petit-licenciement-collectif-pour-motif-economique-dans-une-entreprise-sans-cse-la-mise-en-place-du-conge-de-reclassement-cr",
    "/information/petit-licenciement-collectif-pour-motif-economique-dans-une-entreprise-sans-cse-le-contrat-de-securisation-professionnelle-csp",
    "/information/quelles-sont-les-consequences-du-refus-dun-cdi-par-le-salarie-en-cdd-ou-le-salarie-interimaire-a-qui-lentreprise-propose-un-tel-contrat",
    "/information/quelles-sont-les-consequences-dun-abandon-de-poste-sur-le-contrat-de-travail",
    "/information/rupture-conventionnelle-individuelle-la-procedure-en-details",
    "/information/suivi-medical-et-accompagnement-de-certains-salaries",
  ];

  const response = await fetch(
    "https://code-du-travail-numerique-preprod.ovh.fabrique.social.gouv.fr/api/plan-du-site"
  );
  const data = await response.json();

  data.agreements.forEach((doc) => {
    urls.push("/convention-collective/" + doc.slug);
  });

  fs.writeFileSync(
    "./cypress/support/urls-to-validate.json",
    JSON.stringify(urls)
  );
  console.log(
    "Urls à valider sauvegardées dans le fichier ./cypress/support/urls-to-validate.json"
  );

  const urlsContributions: string[] = [];
  data.contributions.forEach((contrib) => {
    urlsContributions.push("/contribution/" + contrib.generic.slug);
    contrib.agreements.forEach((doc) => {
      urlsContributions.push("/contribution/" + doc.slug);
    });
  });

  const firstPart = urlsContributions.slice(0, 1000);
  fs.writeFileSync(
    "./cypress/support/urls-contributions-to-validate-1.json",
    JSON.stringify(firstPart)
  );

  const secondPart = urlsContributions.slice(1000);
  fs.writeFileSync(
    "./cypress/support/urls-contributions-to-validate-2.json",
    JSON.stringify(secondPart)
  );
  console.log(
    `Urls des contributions à valider sauvegardées dans les fichier "./cypress/support/urls-contributions-to-validate-1.json" (${firstPart.length} urls) and "./cypress/support/urls-contributions-to-validate-2.json" (${secondPart.length} urls)`
  );
};
