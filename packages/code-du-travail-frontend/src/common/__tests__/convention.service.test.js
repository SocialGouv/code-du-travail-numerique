import { searchIdcc, searchCompanies, getCompany } from "../convention.service";

describe("convention service", () => {
  it("can search IDCCs", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          hits: {
            hits: [
              {
                title: "Convention des Boulangeries",
                idcc: "3844",
                slug: "3844-convention-des-boulangeries",
                url: "https://legifrance.com/boulangerie"
              }
            ]
          }
        })
    });
    const results = await searchIdcc("foo");
    expect(fetch).toBeCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(/api\.url\/idcc\?q=foo$/);
    expect(results).toMatchSnapshot();
  });

  it("can search companies", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          hits: {
            hits: [
              {
                name: "RENAULT-23499-VILLARD",
                siret: "34048927839394"
              }
            ]
          }
        })
    });
    const results = await searchCompanies("34048927839394");
    expect(fetch).toBeCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(
      /siret2idcc\.url\/api\/v1\/companies\?siret=34048927839394$/
    );
    expect(results).toMatchSnapshot();
  });

  it("removes spaces from sirets when searching for companies", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          hits: {
            hits: [
              {
                name: "RENAULT-23499-VILLARD",
                siret: "34048927839394"
              }
            ]
          }
        })
    });
    await searchCompanies("340 489 278 39394");
    expect(fetch).toBeCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(
      /siret2idcc\.url\/api\/v1\/companies\?siret=34048927839394$/
    );
  });

  it("can get a single company with IDCCs", async () => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () =>
        Promise.resolve({
          name: "RENAULT-23499-VILLARD",
          siret: "34048927839394",
          idccList: [
            { num: "2394", titre: "Convention Des Barrages Hydrauliques" },
            { num: "1234", titre: "Convention Des Laveurs De Carreaux" }
          ]
        })
    });
    const results = await getCompany("34048927839394");
    expect(fetch).toBeCalledTimes(1);
    expect(fetch.mock.calls[0][0]).toMatch(
      /siret2idcc\.url\/api\/v1\/company\/34048927839394$/
    );
    expect(results).toMatchSnapshot();
  });
});
