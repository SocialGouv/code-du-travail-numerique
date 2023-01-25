import Koa from "koa";
import request from "supertest";

import router from "../conventions";

const app = new Koa();
app.use(router.routes());

describe("Conventions", () => {
  describe("/conventions", () => {
    it("returns the list of all cc order by alpha and regionnal metalurgie last", async () => {
      const response = await request(app.callback()).get("/api/v1/conventions");
      expect(response.status).toBe(200);
      expect(response.body.length).toEqual(3);
      expect(response.body[0].title).toEqual("Banque");
      expect(response.body[response.body.length - 1].title).toEqual(
        "Services de l'automobile (Commerce et réparation de l'automobile, du cycle et du motocycle, activités connexes, contrôle technique automobile, formation des conducteurs)"
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
