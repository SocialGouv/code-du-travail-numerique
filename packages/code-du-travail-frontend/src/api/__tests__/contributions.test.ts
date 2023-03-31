import request from "supertest";
import server from "nextjs-http-supertest";

describe("Contributions", () => {
  afterAll(() => {
    server.close();
  });

  it("should return all contributions", async () => {
    const res = await request(server).get("/api/contributions");
    expect(res.status).toBe(200);
    const contribs = res.body;

    expect(contribs).toMatchSnapshot();
    const themes = Object.keys(contribs);
    expect(themes.length).toEqual(2);
    expect(themes[0]).toEqual("Congés et repos");
    expect(contribs[themes[0]].length).toEqual(1);
    expect(contribs[themes[0]][0].title).toEqual(
      "Les congés pour événements familiaux"
    );
  });
});
