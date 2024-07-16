import {
  searchWithMultiplePostalCodeMockResponse,
  searchWithNameMockResponse,
  searchWithNoResponse,
  searchWithOnePostalCodeMockResponse,
  searchWithSiretMockResponse,
} from "../__mocks__/fetchEnterprises.mock";
import { fetchEnterprises } from "../fetchEnterprises";

describe("Test enterprise endpoint", () => {
  test("Return empty array if no enterprises found", async () => {
    (global as any).fetch = jest.fn(() => ({
      json: () => searchWithNoResponse,
      ok: true,
      status: 200,
    }));

    const response = await fetchEnterprises("query", []);

    expect(response).toEqual({ entreprises: [] });

    expect(fetch).toHaveBeenCalledWith(
      "https://api-entreprise/search?q=query&page=1&per_page=25&etat_administratif=A&sort_by_size=true"
    );
  });

  test("A call to retrieve enterprises from an enterprise", async () => {
    (global as any).fetch = jest.fn(() => ({
      json: () => searchWithNameMockResponse,
      ok: true,
      status: 200,
    }));

    const response = await fetchEnterprises("query", []);

    expect(response).toEqual({
      entreprises: [
        {
          activitePrincipale: "Autre distribution de crédit",
          address:
            "ZAE SAINT GUENAULT 1 RUE JEAN MERMOZ 91000 EVRY-COURCOURONNES",
          conventions: [
            {
              id: "0478",
              idcc: 478,
              shortTitle: "Convention collective 0478",
              title: "Convention collective 0478",
            },
            {
              id: "2120",
              idcc: 2120,
              shortTitle: "Convention collective 2120",
              title: "Convention collective 2120",
            },
          ],
          etablissements: 69,
          firstMatchingEtablissement: {
            address: "13 QUAI DE LA MARNE 51200 EPERNAY",
            siret: "31381151501076",
          },
          highlightLabel: "CARREFOUR BANQUE",
          label: "CARREFOUR BANQUE",
          matching: 69,
          simpleLabel: "CARREFOUR BANQUE",
          siren: "313811515",
        },
      ],
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api-entreprise/search?q=query&page=1&per_page=25&etat_administratif=A&sort_by_size=true"
    );
  });

  test("A call to retrieve enterprises from an enterprise with one postal code", async () => {
    (global as any).fetch = jest.fn(() => ({
      json: () => searchWithOnePostalCodeMockResponse,
      ok: true,
      status: 200,
    }));

    const response = await fetchEnterprises("query", ["75018"]);

    expect(response).toEqual({
      entreprises: [
        {
          activitePrincipale:
            "Création artistique relevant des arts plastiques",
          address: "BAT A - 5EME ETAGE 4 IMPASSE MOLIN 75018 PARIS",
          conventions: [],
          etablissements: 1,
          firstMatchingEtablissement: {
            address: "BAT A - 5EME ETAGE 4 IMPASSE MOLIN 75018 PARIS",
            siret: "42990443600020",
          },
          highlightLabel: "JEREMIE BOUILLON",
          label: "JEREMIE BOUILLON",
          matching: 1,
          simpleLabel: "JEREMIE BOUILLON",
          siren: "429904436",
        },
        {
          activitePrincipale: "Services des traiteurs",
          address: "17 RUE JACQUES KABLE 75018 PARIS",
          conventions: [],
          etablissements: 1,
          firstMatchingEtablissement: {
            address: "17 RUE JACQUES KABLE 75018 PARIS",
            siret: "89320859500015",
          },
          highlightLabel: "LEO BOUILLON",
          label: "LEO BOUILLON",
          matching: 1,
          simpleLabel: "LEO BOUILLON",
          siren: "893208595",
        },
      ],
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api-entreprise/search?q=query&page=1&per_page=25&etat_administratif=A&sort_by_size=true&code_postal=75018"
    );
  });

  test("A call to retrieve enterprises from an enterprise with multiple postals codes", async () => {
    (global as any).fetch = jest.fn(() => ({
      json: () => searchWithMultiplePostalCodeMockResponse,
      ok: true,
      status: 200,
    }));

    const response = await fetchEnterprises("query", [
      "75001",
      "75002",
      "75003",
      "75004",
      "75005",
      "75006",
      "75007",
      "75008",
      "75009",
      "75010",
      "75011",
      "75012",
      "75013",
      "75014",
      "75015",
      "75016",
      "75017",
      "75018",
      "75019",
      "75020",
    ]);

    expect(response).toEqual({
      entreprises: [
        {
          activitePrincipale:
            "Autres commerces de détail sur éventaires et marchés",
          address: "47 RUE MESLAY 75003 PARIS",
          conventions: [],
          etablissements: 1,
          firstMatchingEtablissement: {
            address: "47 RUE MESLAY 75003 PARIS",
            siret: "71101713700011",
          },
          highlightLabel: "CHARLES BOUILLON",
          label: "CHARLES BOUILLON",
          matching: 1,
          simpleLabel: "CHARLES BOUILLON",
          siren: "711017137",
        },
      ],
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api-entreprise/search?q=query&page=1&per_page=25&etat_administratif=A&sort_by_size=true&code_postal=75001,75002,75003,75004,75005,75006,75007,75008,75009,75010,75011,75012,75013,75014,75015,75016,75017,75018,75019,75020"
    );
  });

  test("A call to retrieve enterprises from an enterprise with siret", async () => {
    (global as any).fetch = jest.fn(() => ({
      json: () => searchWithSiretMockResponse,
      ok: true,
      status: 200,
    }));

    const response = await fetchEnterprises("22760540900019", []);

    expect(response).toEqual({
      entreprises: [
        {
          activitePrincipale: "Administration publique générale",
          address: "HOTEL DU DEPARTEMENT QUAI JEAN MOULIN 76100 ROUEN",
          conventions: [
            {
              id: "5021",
              idcc: 5021,
              shortTitle: "Convention collective 5021",
              title: "Convention collective 5021",
            },
            {
              id: "3228",
              idcc: 3228,
              shortTitle: "Convention collective 3228",
              title: "Convention collective 3228",
            },
            {
              id: "9999",
              idcc: 9999,
              shortTitle: "Convention collective 9999",
              title: "Convention collective 9999",
            },
          ],
          etablissements: 169,
          firstMatchingEtablissement: {
            address: "HOTEL DU DEPARTEMENT QUAI JEAN MOULIN 76100 ROUEN",
            siret: "22760540900019",
          },
          highlightLabel: "DEPARTEMENT DE LA SEINE MARITIME",
          label: "DEPARTEMENT DE LA SEINE MARITIME",
          matching: 169,
          simpleLabel: "DEPARTEMENT DE LA SEINE MARITIME",
          siren: "227605409",
        },
      ],
    });

    expect(fetch).toHaveBeenCalledWith(
      "https://api-entreprise/search?q=22760540900019&page=1&per_page=25&etat_administratif=A&sort_by_size=true"
    );
  });

  test("Call with error should be thrown", async () => {
    (global as any).fetch = jest.fn(() => ({
      json: () => searchWithSiretMockResponse,
      status: 500,
      statusText: "Mon erreur",
    }));

    await expect(async () => {
      await fetchEnterprises("22760540900019", []);
    }).rejects.toThrowErrorMatchingInlineSnapshot(
      '"Erreur lors de la récupération des entreprises depuis annuaire-entreprise, code : 500 (Mon erreur)"'
    );
  });
});
