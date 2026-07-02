import { getAccordsEntreprise } from "../service";

const mockFetch = jest.fn();

// Explicit factory instead of automock: the real @socialgouv/dila-api-client pulls
// in @hapi/wreck and can perform real HTTP requests. Automocking it was flaky under
// the full test suite — when the automock failed to apply, DilaApiClient.fetch hit
// the network ("The content-type is not JSON compatible"). A factory never loads the
// real module, keeping the test hermetic and deterministic.
jest.mock("@socialgouv/dila-api-client", () => ({
  DilaApiClient: jest.fn(() => ({
    fetch: mockFetch,
  })),
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const mockSearchResponse = {
  totalResultNumber: 1,
  results: [
    {
      titles: [{ id: "accord-123", cid: "cid-1", title: "Accord test" }],
      raisonSociale: "Entreprise Test",
      dateSignature: "2023-01-01",
      dateDiffusion: "2023-01-15",
      reference: "REF001",
      themes: [],
      conforme: true,
    },
  ],
};

const mockAccordDetail = {
  acco: {
    id: "accord-123",
    titreTexte: "Accord sur le télétravail",
    themes: [{ code: "TH01", libelle: "Télétravail", groupe: "Organisation" }],
    dateTexte: new Date("2023-03-15").getTime(),
    dateEffet: new Date("2023-04-01").getTime(),
    dateFin: 32472144000000,
    conformeVersionIntegrale: true,
    syndicats: [
      { code: "SYN01", libelle: "CFDT" },
      { code: "SYN02", libelle: "CGT" },
    ],
    attachementUrl: "",
    fileSize: "100",
    data: "",
    numero: "1",
    siret: "12345678901234",
    dateMaj: 0,
    dateDepot: 0,
    relevantDate: 0,
    dateDiffusion: 0,
    codeApe: "",
    codeIdcc: null,
    raisonSociale: "Entreprise Test",
    secteur: "",
    signataires: [],
    attachment: {
      content: "",
      modified: 0,
      date: 0,
      content_type: "",
      content_length: 0,
      language: "",
    },
  },
};

describe("getAccordsEntreprise", () => {
  it("retourne les accords formatés pour un siret donné", async () => {
    mockFetch
      .mockResolvedValueOnce(mockSearchResponse)
      .mockResolvedValueOnce(mockAccordDetail);

    const result = await getAccordsEntreprise("12345678901234");

    expect(result).toEqual({
      total: 1,
      accords: [
        {
          id: "accord-123",
          title: "Accord sur le télétravail",
          themes: ["Télétravail"],
          dateSignature: "15/03/2023",
          dateDebut: "01/04/2023",
          dateFin: undefined,
          texteIntegral: true,
          signataires: ["CFDT", "CGT"],
        },
      ],
    });
  });

  it("inclut dateFin quand elle n'est pas la valeur sentinel", async () => {
    const accordWithDateFin = {
      acco: {
        ...mockAccordDetail.acco,
        dateFin: new Date("2025-12-31").getTime(),
      },
    };

    mockFetch
      .mockResolvedValueOnce(mockSearchResponse)
      .mockResolvedValueOnce(accordWithDateFin);

    const result = await getAccordsEntreprise("12345678901234");

    expect(result.accords[0].dateFin).toBe("31/12/2025");
  });

  it("retourne un total et une liste vide si aucun accord trouvé", async () => {
    mockFetch.mockResolvedValueOnce({
      totalResultNumber: 0,
      results: [],
    });

    const result = await getAccordsEntreprise("00000000000000");

    expect(result).toEqual({ total: 0, accords: [] });
  });

  it("appelle l'API search avec les bons paramètres", async () => {
    mockFetch
      .mockResolvedValueOnce(mockSearchResponse)
      .mockResolvedValueOnce(mockAccordDetail);

    await getAccordsEntreprise("12345678901234");

    expect(mockFetch).toHaveBeenNthCalledWith(1, {
      path: "search",
      method: "POST",
      params: expect.objectContaining({
        fond: "ACCO",
        recherche: expect.objectContaining({
          filtres: [
            {
              valeurs: ["12345678901234"],
              facette: "SIRET_RAISON_SOCIALE",
            },
          ],
        }),
      }),
    });
  });

  it("appelle l'API consult avec l'id du titre", async () => {
    mockFetch
      .mockResolvedValueOnce(mockSearchResponse)
      .mockResolvedValueOnce(mockAccordDetail);

    await getAccordsEntreprise("12345678901234");

    expect(mockFetch).toHaveBeenNthCalledWith(2, {
      path: "consult/acco",
      method: "POST",
      params: { id: "accord-123" },
    });
  });
});
