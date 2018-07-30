const routes = require('next-routes');

module.exports = routes()
  .add('index', '/:type(result)/:id');
