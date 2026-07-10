import { getAccordsEntrepriseFromEs } from "../service";
import { getAccordsBySiret } from "../queries";

const mockSearch = jest.fn();

jest.mock("../../../utils", () => ({
  elasticAccordsIndex: "cdtn_accords",
  elasticsearchClient: {
    search: (...args: unknown[]) => mockSearch(...args),
  },
}));

beforeEach(() => {
  jest.clearAllMocks();
});

const esHit = {
  _source: {
    id: "accord-123",
    title: "Accord sur le télétravail",
    siret: "12345678901234",
    dateDepot: "2023-03-15",
    dateEffet: "2023-04-01",
    dateFin: "2025-12-31",
    conformeVersionIntegrale: true,
    themes: ["Télétravail"],
    signataires: ["01", "03"],
  },
};

const buildEsResponse = (hits, total) => ({
  hits: {
    total: { value: total, relation: "eq" },
    hits,
  },
});

describe("getAccordsEntrepriseFromEs", () => {
  it("interroge l'index accords avec le siret", async () => {
    mockSearch.mockResolvedValueOnce(buildEsResponse([], 0));

    await getAccordsEntrepriseFromEs("12345678901234");

    expect(mockSearch).toHaveBeenCalledWith({
      index: "cdtn_accords",
      ...getAccordsBySiret("12345678901234"),
    });
  });

  it("mappe les documents ES vers la réponse attendue", async () => {
    mockSearch.mockResolvedValueOnce(buildEsResponse([esHit], 1));

    const result = await getAccordsEntrepriseFromEs("12345678901234");

    expect(result).toEqual({
      total: 1,
      accords: [
        {
          id: "accord-123",
          title: "Accord sur le télétravail",
          themes: ["Télétravail"],
          dateSignature: "15/03/2023",
          dateDebut: "01/04/2023",
          dateFin: "31/12/2025",
          texteIntegral: true,
          signataires: [],
        },
      ],
    });
  });

  it("gère les champs de date et tableaux absents", async () => {
    mockSearch.mockResolvedValueOnce(
      buildEsResponse(
        [
          {
            _source: {
              id: "accord-456",
              title: "Accord minimal",
              siret: "12345678901234",
              conformeVersionIntegrale: false,
            },
          },
        ],
        1
      )
    );

    const result = await getAccordsEntrepriseFromEs("12345678901234");

    expect(result.accords[0]).toEqual({
      id: "accord-456",
      title: "Accord minimal",
      themes: [],
      dateSignature: undefined,
      dateDebut: undefined,
      dateFin: undefined,
      texteIntegral: false,
      signataires: [],
    });
  });

  it("lit le total quand hits.total est un nombre", async () => {
    mockSearch.mockResolvedValueOnce({
      hits: { total: 42, hits: [esHit] },
    });

    const result = await getAccordsEntrepriseFromEs("12345678901234");

    expect(result.total).toBe(42);
  });

  it("retourne un total et une liste vide si aucun accord trouvé", async () => {
    mockSearch.mockResolvedValueOnce(buildEsResponse([], 0));

    const result = await getAccordsEntrepriseFromEs("00000000000000");

    expect(result).toEqual({ total: 0, accords: [] });
  });
});
