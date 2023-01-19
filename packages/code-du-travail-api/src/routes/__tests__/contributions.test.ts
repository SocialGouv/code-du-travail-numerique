import Koa from "koa";
import request from "supertest";

import router from "../contributions";

const app = new Koa();
app.use(router.routes());

describe("Contributions", () => {
  describe("/contributions", () => {
    it("returns the list of all top level contributions", async () => {
      const response = await request(app.callback()).get(
        "/api/v1/contributions"
      );
      expect(response.status).toBe(200);
      const contribs = response.body;
      const themes = Object.keys(contribs);
      expect(themes.length).toEqual(15);
      expect(themes[0]).toEqual("Embauche et contrat de travail");
      expect(contribs[themes[0]].length).toEqual(15);
      expect(contribs[themes[0]][0].title).toEqual(
        "La période d’essai peut-elle être renouvelée ?"
      );
    });
  });
});
