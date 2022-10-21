/* globals tarteaucitron */

var currentLanguage = document.documentElement.lang;
window.tarteaucitronForceLanguage = currentLanguage;

const URL_TRACKED = [
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
    type: "courrier",
    url: "/modeles-de-courriers/lettre-de-demission",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-du-contrat-en-periode-dessai-a-linitiative-du-salarie",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-de-periode-dessai-a-linitiative-de-lemployeur",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/convocation-a-un-entretien-prealable-au-licenciement-pour-motif-personnel",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/rupture-dun-commun-accord-dun-contrat-de-travail-a-duree-determinee",
  },
  {
    type: "courrier",
    url: "/modeles-de-courriers/lettre-de-reclamation-des-documents-de-fin-de-contrat",
  },
  {
    type: "contrib",
    url: "/contribution/quelle-est-la-duree-du-preavis-en-cas-de-demission",
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
    url: "/contribution/quelles-sont-les-consequences-du-non-respect-du-preavis-par-le-salarie-ou-lemployeur",
  },
  {
    type: "infos",
    url: "/information/la-prime-de-partage-de-la-valeur-infographie",
  },
  {
    type: "infos",
    url: "/information/suivi-medical-et-accompagnement-de-certains-salaries",
  },
  {
    type: "convention_collective",
    url: "/convention-collective/1090-services-de-lautomobile-commerce-et-reparation-de-lautomobile-du-cycle",
  },
  {
    type: "convention_collective",
    url: "/convention-collective/3239-particuliers-employeurs-et-emploi-a-domicile",
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
tarteaucitron.user.gtagUa = "DC-3048978";
tarteaucitron.user.gtagMore = function () {
  // For DOM loading
  for (let i = 0; i < URL_TRACKED.length; i++) {
    if (URL_TRACKED[i].url === location.pathname) {
      gtag("event", "conversion", {
        allow_custom_scripts: true,
        send_to: `DC-3048978/emplo253/ttspages+unique`,
        u1: `${location.origin}${URL_TRACKED[i].url}`,
      });
    }
  }
};
(tarteaucitron.job = tarteaucitron.job || []).push("gtag");
