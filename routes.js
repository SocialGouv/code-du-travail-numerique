const routes = require("next-routes");

module.exports = routes()
  // The main search route. Parameters are optional. Can be used as:
  // - http://localhost:3000/
  // - http://localhost:3000/?q=travail
  // - http://localhost:3000/questions/Zm5o72QB0wLMRXWgrAhM
  .add("index", "/:type(questions)/:id")

  .add("explorer", "/explorer");
