/* globals tarteaucitron */
var currentLanguage = document.documentElement.lang;
window.tarteaucitronForceLanguage = currentLanguage;

const URL_TRACKED = [
  {
    type: "lpcode",
    url: "/",
  },
  {
    type: "contrib",
    url: "/contribution/les-conges-pour-evenements-familiaux",
  },
  {
    type: "contrib",
    url: "/contribution/quelle-est-la-duree-du-preavis-en-cas-de-demission",
  },
  {
    needVariable: true,
    type: "contrib",
    url: "/contribution/quelles-sont-les-consequences-du-non-respect-du-preavis-par-le-salarie-ou-lemployeur",
  },
  {
    needVariable: true,
    type: "courrier",
    url: "/modeles-de-courriers/convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-de-periode-dessai-a-linitiative-de-lemployeur",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-dun-commun-accord-dun-contrat-de-travail-a-duree-determinee",
  },
  {
    needVariable: true,
    type: "courrier",
    url: "/modeles-de-courriers/lettre-de-reclamation-des-documents-de-fin-de-contrat",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers",
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
    url: "/outils",
  },
  {
    type: "dossiers",
    url: "/dossiers/ministere-du-travail-notre-dossier-sur-le-coronavirus",
  },
  {
    needVariable: true,
    type: "dossiers",
    url: "/dossiers/aides-et-accompagnement-embauche-et-perennisation-des-emplois",
  },
  {
    type: "themes",
    url: "/themes/depart-de-lentreprise",
  },
  {
    type: "themes",
    url: "/themes/temps-de-travail",
  },
  {
    type: "themes",
    url: "/themes/embauche-et-contrat-de-travail",
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
  highPrivacy: true /* Disable auto consent */,
  handleBrowserDNTRequest: false /* If Do Not Track == 1, disallow all */,
  removeCredit: true /* Remove credit link */,
  moreInfoLink: true /* Show more info link */,
  useExternalCss: false /* If false, the tarteaucitron.css file will be loaded */,
  readmoreLink:
    "/politique-confidentialite#cookie" /* Change the default readmore link */,
});
tarteaucitron.user.gtagUa = "DC-3048978";
tarteaucitron.user.gtagMore = function () {
  // For DOM loading
  for (let i = 0; i < URL_TRACKED.length; i++) {
    if (URL_TRACKED[i].url === location.pathname) {
      gtag("event", "conversion", {
        allow_custom_scripts: true,
        send_to: `DC-3048978/emplo253/${URL_TRACKED[i].type}+unique`,
        u1: `${location.origin}${URL_TRACKED[i].url}`,
      });
    }
  }
};
(tarteaucitron.job = tarteaucitron.job || []).push("gtag");
