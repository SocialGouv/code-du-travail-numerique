const routes = require("next-routes");

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
  
  // http://localhost:3000/modeles_de_courriers/L2253-1
  .add({
    name: "modeles-de-courriers",
    page: "modeles-de-courriers",
    pattern: "/modeles-de-courriers/:slug"
  })

  // theme navigation
  //
  // http://localhost:3000/themes
  .add({ name: "themes", page: "theme", pattern: "/themes" })

  // http://localhost:3000/theme/rupture-de-contrat
  // http://localhost:3000/theme/rupture-de-contrat/la-rupture-conventionnelle
  .add({ name: "theme", page: "theme", pattern: "/themes/:slug+" }) // slug is an array of slugs

  // http://localhost:3000/a-propos
  .add({ name: "about", page: "about", pattern: "/a-propos" })

  // The main search route. Parameters are optional.
  //
  // http://localhost:3000/
  // http://localhost:3000/?q=travail
  .add({ name: "index", page: "index", pattern: "/" });
