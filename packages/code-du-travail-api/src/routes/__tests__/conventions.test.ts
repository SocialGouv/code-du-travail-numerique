import Koa from "koa";
import request from "supertest";

import router from "../conventions";

const app = new Koa();
app.use(router.routes());

describe("Conventions", () => {
  describe("/conventions/with-contributions", () => {
    it("retourne la liste de toutes les conventions collectives qui ont des contributions ordonnées par ordre alpha avec les métallurgies régionales à la fin", async () => {
      const response = await request(app.callback()).get(
        "/api/v1/conventions/with-contributions"
      );
      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(4);
      expect(response.body[0].title).toEqual("Banque");
      expect(response.body[response.body.length - 1].title).toEqual(
        "Convention collective régionale test métallurgie"
      );
    });
  });
  describe("/conventions/:slug", () => {
    it("returns the agreement document from idcc 843", async () => {
      const response = await request(app.callback()).get(
        "/api/v1/conventions/843-boulangerie-patisserie-entreprises-artisanales"
      );
      expect(response.status).toBe(200);
      expect(response.body).toMatchSnapshot();
    });

    it("returns 404 when slug match no agreement", async () => {
      const response = await request(app.callback()).get(
        `/api/v1/conventions/slug`
      );
      expect(response.status).toBe(404);
    });
  });
});
