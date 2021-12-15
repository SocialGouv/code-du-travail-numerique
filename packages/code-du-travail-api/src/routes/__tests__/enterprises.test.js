import routes from "../enterprises";

const request = require("supertest");
const Koa = require("koa");
const fetch = require("node-fetch");

const app = new Koa();
app.use(routes.routes());
jest.mock("node-fetch");

describe("Test enterprise endpoint", () => {
  beforeEach(() => {
    fetch.mockReset();
  });

  test("Call returns 404 if no enterprises found", async () => {
    const apiEnterpriseResponse = {
      body: "Not found",
      status: 404,
    };

    fetch.mockResolvedValueOnce(apiEnterpriseResponse);

    const response = await request(app.callback()).get(
      "/api/v1/enterprises?q=NOT-FOUND"
    );

    expect(response.status).toEqual(404);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api-recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?q=NOT-FOUND&onlyWithConvention=true`
    );

    expect(response.text).toEqual("Not found");
  });

  test("Call encode query params", async () => {
    const apiEnterpriseResponse = {
      json: () => ({}),
      status: 200,
    };

    fetch.mockResolvedValueOnce(apiEnterpriseResponse);

    const response = await request(app.callback()).get(
      "/api/v1/enterprises?q=La pêche à la ligne"
    );

    expect(response.status).toEqual(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api-recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?q=La%20p%C3%AAche%20%C3%A0%20la%20ligne&onlyWithConvention=true"
    );
  });

  test("A call to retrieve agreements from an enterprise", async () => {
    const apiEnterpriseResponse = {
      json: () => ({
        entreprises: [
          {
            activitePrincipale:
              "Entretien et réparation de véhicules automobiles",
            conventions: [
              {
                etat: "VIGUEUR_ETEN",
                id: "KALICONT000005635191",
                idcc: 1098,
                mtime: 1562873918,
                shortTitle:
                  "Services de l'automobile (Commerce et réparation de l'automobile, du cycle et du motocycle, activités connexes, contrôle technique automobile, formation des conducteurs)",
                texte_de_base: "KALITEXT000005685156",
                title:
                  "Convention collective nationale du commerce et de la réparation de l'automobile, du cycle et du motocycle et des activités connexes, ainsi que du contrôle technique automobile du 15 janvier 1981. Etendue par arrêté du 30 octobre 1981 JONC 3 décembre 1981.",
                url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635191",
              },
            ],
            etablissements: 1,
            highlightLabel: "<b><u>AUTOEXPRESS</b></u>",
            label: "AUTOEXPRESS",
            matching: 1,
            matchingEtablissement: {
              address: "1 Rue Clément Ader 08110 Carignan",
              siret: "75280280100023",
            },
            simpleLabel: "AUTOEXPRESS",
            siren: "752802801",
          },
        ],
      }),
      status: 200,
    };

    fetch.mockResolvedValueOnce(apiEnterpriseResponse);

    const response = await request(app.callback()).get(
      "/api/v1/enterprises?q=AUTOEXPRESS"
    );

    expect(response.status).toEqual(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api-recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?q=AUTOEXPRESS&onlyWithConvention=true`
    );

    expect(response.body).toEqual(apiEnterpriseResponse.json());
  });

  test("Call should pass address if provided", async () => {
    const apiEnterpriseResponse = {
      json: () => ({}),
      status: 200,
    };

    fetch.mockResolvedValueOnce(apiEnterpriseResponse);

    const response = await request(app.callback()).get(
      "/api/v1/enterprises?q=hello&a=my address"
    );

    expect(response.status).toEqual(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://api-recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?q=hello&a=my%20address&onlyWithConvention=true"
    );
  });

  test("Call retrieving agreement with a highlight from an enterprise", async () => {
    const apiEnterpriseResponse = {
      json: () => ({
        entreprises: [
          {
            conventions: [
              {
                idcc: 1090,
              },
            ],
          },
        ],
      }),
      status: 200,
    };

    fetch.mockResolvedValueOnce(apiEnterpriseResponse);

    const response = await request(app.callback()).get(
      "/api/v1/enterprises?q=AUTOEXPRESS"
    );

    expect(response.status).toEqual(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api-recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?q=AUTOEXPRESS&onlyWithConvention=true`
    );

    expect(response.body.entreprises).toHaveLength(1);
    expect(response.body.entreprises[0].conventions).toHaveLength(1);
    expect(response.body.entreprises[0].conventions[0].highlight).toEqual({
      content: "Contenu à afficher dans l'alerte",
      searchInfo: "Information complémentaire affichée lors d'une recherche",
      title: "Titre du highlight",
    });
  });

  test("Call retrieving agreements with highlight and no highlight from an enterprise", async () => {
    const apiEnterpriseResponse = {
      json: () => ({
        entreprises: [
          {
            conventions: [
              {
                idcc: 1090,
              },
              {
                idcc: 2120,
              },
            ],
          },
        ],
      }),
      status: 200,
    };

    fetch.mockResolvedValueOnce(apiEnterpriseResponse);

    const response = await request(app.callback()).get(
      "/api/v1/enterprises?q=AUTOEXPRESS"
    );

    expect(response.status).toEqual(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api-recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?q=AUTOEXPRESS&onlyWithConvention=true`
    );

    expect(response.body.entreprises).toHaveLength(1);
    expect(response.body.entreprises[0].conventions).toHaveLength(2);
    expect(
      response.body.entreprises[0].conventions.find(
        (agreement) => agreement.idcc === 1090
      ).highlight
    ).toEqual({
      content: "Contenu à afficher dans l'alerte",
      searchInfo: "Information complémentaire affichée lors d'une recherche",
      title: "Titre du highlight",
    });

    expect(
      response.body.entreprises[0].conventions.find(
        (agreement) => agreement.idcc === 2120
      ).highlight
    ).toEqual(undefined);
  });

  test("Call retrieving agreement not in elastic from an enterprise", async () => {
    const apiEnterpriseResponse = {
      json: () => ({
        entreprises: [
          {
            conventions: [
              {
                idcc: 123456,
              },
            ],
          },
        ],
      }),
      status: 200,
    };

    fetch.mockResolvedValueOnce(apiEnterpriseResponse);

    const response = await request(app.callback()).get(
      "/api/v1/enterprises?q=AUTOEXPRESS"
    );

    expect(response.status).toEqual(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api-recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?q=AUTOEXPRESS&onlyWithConvention=true`
    );

    expect(response.body).toEqual(apiEnterpriseResponse.json());
  });

  test("Call retrieving enterprise without conventions", async () => {
    const apiEnterpriseResponse = {
      json: () => ({
        entreprises: [
          {
            activitePrincipale:
              "Entretien et réparation de véhicules automobiles",
            conventions: [],
          },
        ],
      }),
      status: 200,
    };

    fetch.mockResolvedValueOnce(apiEnterpriseResponse);

    const response = await request(app.callback()).get(
      "/api/v1/enterprises?q=AUTOEXPRESS"
    );

    expect(response.status).toEqual(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api-recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?q=AUTOEXPRESS&onlyWithConvention=true`
    );

    expect(response.body).toEqual(apiEnterpriseResponse.json());
  });

  test("Call retrieving agreements for multiple enterprise", async () => {
    const apiEnterpriseResponse = {
      json: () => ({
        entreprises: [
          {
            conventions: [
              {
                idcc: 1090,
              },
            ],
          },
          {
            conventions: [
              {
                idcc: 1090,
              },
            ],
          },
        ],
      }),
      status: 200,
    };

    fetch.mockResolvedValueOnce(apiEnterpriseResponse);

    const response = await request(app.callback()).get(
      "/api/v1/enterprises?q=AUTOEXPRESS"
    );

    expect(response.status).toEqual(200);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      `https://api-recherche-entreprises.fabrique.social.gouv.fr/api/v1/search?q=AUTOEXPRESS&onlyWithConvention=true`
    );

    expect(response.body.entreprises).toHaveLength(2);
    response.body.entreprises.forEach((enterprise) => {
      expect(enterprise.conventions).toHaveLength(1);
      expect(enterprise.conventions[0].idcc).toEqual(1090);
      expect(enterprise.conventions[0].highlight).not.toEqual(undefined);
    });
  });
});
