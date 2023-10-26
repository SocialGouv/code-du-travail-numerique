/* globals tarteaucitron */

var currentLanguage = document.documentElement.lang;
window.tarteaucitronForceLanguage = currentLanguage;

const URL_TRACKED = [
  {
    type: "lpcode",
    url: "/",
  },
  {
    type: "outils",
    url: "/outils",
  },
  {
    type: "outils",
    url: "/outils/simulateur-embauche",
  },
  {
    type: "outils",
    url: "/outils/indemnite-licenciement",
  },
  {
    type: "outils",
    url: "/outils/convention-collective",
  },
  {
    type: "outils",
    url: "/outils/preavis-demission",
  },
  {
    type: "outils",
    url: "/outils/indemnite-precarite",
  },
  {
    type: "outils",
    url: "/outils/procedure-licenciement",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/lettre-de-demission",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-par-le-salarie",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-de-periode-dessai-par-lemployeur",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-dun-contrat-de-travail-a-duree-determinee-dun-commun-accord",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/promesse-dembauche",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/attestation-de-travail",
  },
  {
    type: "contrib",
    url: "/contribution/les-conges-pour-evenements-familiaux",
  },
  {
    type: "contrib",
    url: "/contribution/en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
  },
  {
    type: "contrib",
    url: "/contribution/est-il-obligatoire-davoir-un-contrat-de-travail-ecrit-et-signe",
  },
  {
    type: "contrib",
    url: "/contribution/quand-le-salarie-a-t-il-droit-a-une-prime-danciennete-quel-est-son-montant",
  },
  {
    type: "contrib",
    url: "/contribution/quelle-est-la-duree-de-preavis-en-cas-de-depart-a-la-retraite",
  },
  {
    type: "contrib",
    url: "/contribution/jours-feries-et-ponts-dans-le-secteur-prive",
  },
  {
    type: "infos",
    url: "/information/rupture-conventionnelle-individuelle-la-procedure-en-details",
  },
  {
    type: "infos",
    url: "/information/suivi-medical-et-accompagnement-de-certains-salaries",
  },
  {
    type: "infos",
    url: "/information/licenciement-pour-inaptitude-medicale",
  },
  {
    type: "infos",
    url: "/information/licenciement-pour-motif-disciplinaire",
  },
  {
    type: "infos",
    url: "/information/licenciement-pour-motif-non-disciplinaire",
  },
  {
    type: "convention_collective",
    url: "/convention-collective/1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle",
  },
  {
    type: "convention_collective",
    url: "/convention-collective/3239-particuliers-employeurs-et-emploi-a-domicile",
  },
  {
    type: "convention_collective",
    url: "/convention-collective/573-commerces-de-gros",
  },
];

tarteaucitron.init({
  privacyUrl: "/politique-confidentialite#cookie" /* Privacy policy url */,
  hashtag: "#tarteaucitron" /* Open the panel with this hashtag */,
  cookieName: "tarteaucitron" /* Cookie name */,
  orientation: "bottom" /* Banner position (top - bottom) */,
  showAlertSmall: false /* Show the small banner on bottom right */,
  cookieslist: false /* Show the cookie list */,
  adblocker: false /* Show a Warning if an adblocker is detected */,
  AcceptAllCta: true /* Show the accept all button when highPrivacy on */,
  DenyAllCta: true,
  highPrivacy: true /* Disable auto consent */,
  handleBrowserDNTRequest: false /* If Do Not Track == 1, disallow all */,
  removeCredit: true /* Remove credit link */,
  moreInfoLink: false /* Show more info link */,
  useExternalCss: false /* If false, the tarteaucitron.css file will be loaded */,
  readmoreLink:
    "/politique-confidentialite#cookie" /* Change the default readmore link */,
});
tarteaucitron.user.adftrackMore = function () {
  // For DOM loading
  for (let i = 0; i < URL_TRACKED.length; i++) {
    if (URL_TRACKED[i].url === location.pathname) {
      window._adftrack = Array.isArray(window._adftrack) ? window._adftrack : (window._adftrack ? [window._adftrack] : []);
      window._adftrack.push({
          HttpHost: 'server.adform.net',
          pm: 2867419,
          divider: encodeURIComponent('|'),
          pagename: encodeURIComponent('2023-10-code.travail.gouv.fr-PageAccueil-ToutesPages'),
          order : { 
              sv1: '<insert sv1 value here>'
          }
      });
    }
  }
};
(tarteaucitron.job = tarteaucitron.job || []).push("adform");
