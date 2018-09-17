const routes = require("next-routes");

module.exports = routes()
  // The main search route. Parameters are optional. Can be used as:
  // - http://localhost:3000/
  // - http://localhost:3000/?q=travail
  // - http://localhost:3000/questions/Zm5o72QB0wLMRXWgrAhM

  .add({ name: "question", page: "question", pattern: "/questions/:slug" })
  .add({
    name: "fiche-service-public",
    page: "fiche-service-public",
    pattern: "/fiche-service-public/:slug"
  })

  .add({ name: "theme", page: "theme", pattern: "/themes/:slug+" }) // slug is an array of slugs
  .add({ name: "themes", page: "theme", pattern: "/themes" })

  .add({ name: "explorer", page: "explorer", pattern: "/explorer" })

  .add({ name: "index", page: "index", pattern: "/" });
