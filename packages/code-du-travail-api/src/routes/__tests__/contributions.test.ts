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
      expect(response.body.length).toEqual(42);
      expect(response.body[0].title).toEqual(
        "Arrêt maladie pendant la période d'essai : quelles sont les règles ?"
      );
      expect(response.body[0].theme).toEqual("Embauche et contrat de travail");
      expect(response.body[response.body.length - 1].title).toEqual(
        "À quelles indemnités peut prétendre un salarié qui part à la retraite ?"
      );
    });
  });
});
