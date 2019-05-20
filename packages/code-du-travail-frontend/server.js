// Custom server using Express.
const Koa = require("koa");
const next = require("next");
const Router = require("koa-router");

const port = process.env.FRONTEND_PORT || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = new Koa();
  const router = new Router();

  // http://localhost:3000/a-propos
  router.get("/a-propos", async ctx => {
    await app.render(ctx.req, ctx.res, "/a-propos", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/annuaire?q=15 rue du levant, Concarneau
  // http://localhost:3000/annuaire?coord=lon:lat
  router.get("/annuaire", async ctx => {
    await app.render(ctx.req, ctx.res, "/annuaire", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/code-du-travail/L2253-1
  router.get("/code-du-travail/:slug", async ctx => {
    await app.render(ctx.req, ctx.res, "/code-du-travail", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/fiche-ministere-travail/duree-du-travail
  router.get("/fiche-ministere-travail/:slug", async ctx => {
    await app.render(ctx.req, ctx.res, "/fiche-ministere-travail", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/fiche-service-public/duree-du-travail
  router.get("/fiche-service-public/:slug", async ctx => {
    await app.render(ctx.req, ctx.res, "/fiche-service-public", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/kali/1930-nouvelle-convention-collective-nationale-des-metiers-de-la-transformation-des-gr
  router.get("/kali-idcc/:idccNum", async ctx => {
    await app.render(ctx.req, ctx.res, "/kali", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/kali/1930-nouvelle-convention-collective-nationale-des-metiers-de-la-transformation-des-gr
  router.get("/kali/:slug", async ctx => {
    await app.render(ctx.req, ctx.res, "/kali", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/mentions-legales
  router.get("/mentions-legales", async ctx => {
    await app.render(ctx.req, ctx.res, "/mentions-legales", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/modeles-de-courrier
  router.get("/modeles-de-courriers", async ctx => {
    await app.render(ctx.req, ctx.res, "/modeles-de-courriers", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/modele-de-courrier/L2253-1
  router.get("/modele-de-courrier/:slug", async ctx => {
    await app.render(ctx.req, ctx.res, "/modele-de-courrier", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/outils/indemnite-licenciement
  router.get("/outils/:slug", async ctx => {
    await app.render(ctx.req, ctx.res, "/outils", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/question/duree-du-travail
  router.get("/question/:slug", async ctx => {
    await app.render(ctx.req, ctx.res, "/question", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/recherche?q=travail
  router.get("/recherche", async ctx => {
    await app.render(ctx.req, ctx.res, "/recherche", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/themes
  // http://localhost:3000/themes/rupture-de-contrat
  router.get("/themes/:slug*", async ctx => {
    await app.render(ctx.req, ctx.res, "/themes", ctx.params);
    ctx.respond = false;
  });
  // http://localhost:3000/
  // http://localhost:3000/?q=travail
  router.get("/", async ctx => {
    await app.render(ctx.req, ctx.res, "/index", ctx.params);
    ctx.respond = false;
  });

  router.get("*", async ctx => {
    await handle(ctx.req, ctx.res);
    ctx.respond = false;
  });

  server.use(async (ctx, next) => {
    ctx.res.statusCode = 200;
    await next();
  });

  server.use(router.routes());
  server.listen(port, () => {
    console.log(`
      > Ready on http://localhost:${port}

      Environment:

        - process.env.NODE_ENV : ${process.env.NODE_ENV}

    `);
  });
});
