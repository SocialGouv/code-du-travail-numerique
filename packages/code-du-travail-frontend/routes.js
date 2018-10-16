const routes = require("next-routes");

//
// routes define :
//  - server-rendered pages for SEO and URL sharing
//  - client-side-navigation when available
//

module.exports = routes()
  // content detail page
  // http://localhost:3000/contenu/code-du-travail/L2253-1
  // http://localhost:3000/contenu/question/duree-du-travail
  // http://localhost:3000/contenu/modeles-de-courriers/lettre-demission
  // http://localhost:3000/contenu/idcc/899
  .add({
    name: "contenu",
    page: "content",
    pattern: "/contenu/:source/:slug"
  })

  // theme navigation
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
