const routes = require("@socialgouv/next-routes");

//
// routes define :
//  - server-rendered pages for SEO and URL sharing
//  - client-side-navigation when available
//

module.exports = routes()
  // unique item routes
  //
  // http://localhost:3000/question/duree-du-travail
  .add({ name: "question", page: "question", pattern: "/question/:slug" })
  // http://localhost:3000/fiche-service-public/duree-du-travail
  .add({
    name: "fiche-service-public",
    page: "fiche-service-public",
    pattern: "/fiche-service-public/:slug"
  })

  // http://localhost:3000/fiche-ministere-travail/duree-du-travail
  .add({
    name: "fiche-ministere-travail",
    page: "fiche-ministere-travail",
    pattern: "/fiche-ministere-travail/:slug"
  })

  // http://localhost:3000/code-du-travail/L2253-1
  .add({
    name: "code-du-travail",
    page: "code-du-travail",
    pattern: "/code-du-travail/:slug"
  })
  // http://localhost:3000/modeles-de-courriers
  .add({
    name: "modeles",
    page: "modeles",
    pattern: "/modeles-de-courriers"
  })
  // http://localhost:3000/modeles-de-courriers/L2253-1
  .add({
    name: "modeles-de-courriers",
    page: "modeles-de-courriers",
    pattern: "/modeles-de-courriers/:slug"
  })

  // http://localhost:3000/convention-collective/1930-nouvelle-convention-collective-nationale-des-metiers-de-la-transformation-des-gr
  .add({
    name: "convention-collective",
    page: "convention-collective",
    pattern: "/convention-collective/:slug"
  })

  // http://localhost:3000/convention-collective-idcc/1930
  .add({
    name: "convention-collective-idcc",
    page: "convention-collective",
    pattern: "/convention-collective-idcc/:idccNum"
  })

  // http://localhost:3000/outils/indemnite-licenciement
  .add({
    name: "outils",
    page: "outils",
    pattern: "/outils/:slug"
  })

  // theme navigation
  //
  // http://localhost:3000/themes
  // http://localhost:3000/theme/rupture-de-contrat
  // http://localhost:3000/theme/rupture-de-contrat/la-rupture-conventionnelle
  .add({ name: "themes", page: "theme", pattern: "/themes/:slug*" })

  // http://localhost:3000/droit-du-travail
  .add({
    name: "droit-du-travail",
    page: "droit-du-travail",
    pattern: "/droit-du-travail"
  })
  // http://localhost:3000/a-propos
  .add({ name: "about", page: "about", pattern: "/a-propos" })

  // http://localhost:3000/stats
  .add({ name: "stats", page: "stats", pattern: "/stats" })

  // http://localhost:3000/mentions-legales
  .add({
    name: "mentions-legales",
    page: "mentions-legales",
    pattern: "/mentions-legales"
  })

  // search results page
  //
  // http://localhost:3000/recherche?q=travail
  .add({ name: "recherche", page: "recherche", pattern: "/recherche" })

  // annuaire results page
  //
  // http://localhost:3000/annuaire?q=15 rue du levant, Concarneau
  // http://localhost:3000/annuaire?coord=lon:lat
  .add({ name: "annuaire", page: "annuaire", pattern: "/annuaire" })

  // The home route
  //
  // http://localhost:3000/
  // http://localhost:3000/?q=travail
  .add({ name: "index", page: "index", pattern: "/" });
