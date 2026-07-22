import { SuggestAppController } from "../controller";
import { getSuggestions } from "../service";

jest.mock("../service");
jest.mock("next/server", () => ({
  NextResponse: {
    json: (body: unknown, init?: ResponseInit) => ({
      status: init?.status ?? 200,
      headers: new Map<string, string>([
        ["Content-Type", "application/json"],
        ...Object.entries(init?.headers ?? {}),
      ]),
      json: async () => body,
    }),
  },
}));

const mockGetSuggestions = getSuggestions as jest.MockedFunction<
  typeof getSuggestions
>;

// Le contrôleur ne lit que `request.url` pour en extraire la query string.
const makeRequest = (query: string): Request =>
  ({ url: `https://cdtn.test/api/suggest${query}` }) as Request;

describe("SuggestAppController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockGetSuggestions.mockResolvedValue([]);
  });

  describe("get() — paramètre size", () => {
    it("utilise la size par défaut (5) quand elle est absente", async () => {
      const response = await new SuggestAppController(
        makeRequest("?q=conges")
      ).get();

      expect(response.status).toBe(200);
      expect(mockGetSuggestions).toHaveBeenCalledWith("conges", 5);
    });

    it("transmet une size valide dans les bornes", async () => {
      await new SuggestAppController(makeRequest("?q=conges&size=20")).get();

      expect(mockGetSuggestions).toHaveBeenCalledWith("conges", 20);
    });

    it("accepte la borne supérieure (100)", async () => {
      await new SuggestAppController(makeRequest("?q=conges&size=100")).get();

      expect(mockGetSuggestions).toHaveBeenCalledWith("conges", 100);
    });

    it.each([
      ["au-dessus de la borne supérieure", "101"],
      ["très au-dessus de la borne supérieure", "9999"],
      ["en dessous de la borne inférieure", "0"],
      ["négative", "-3"],
      ["non numérique", "abc"],
      ["non entière", "2.5"],
    ])(
      "retombe sur la size par défaut (5) pour une size %s, sans renvoyer 400",
      async (_label, size) => {
        const response = await new SuggestAppController(
          makeRequest(`?q=conges&size=${size}`)
        ).get();

        expect(response.status).toBe(200);
        expect(mockGetSuggestions).toHaveBeenCalledWith("conges", 5);
      }
    );
  });

  describe("get() — paramètre q", () => {
    // Il faut au moins 3 caractères pour commencer à suggérer (même seuil que
    // le client, cf. useSuggestions) : en dessous, les suggestions n'ont pas
    // de sens et l'API renvoie 400.
    it("retourne 400 quand q est absent", async () => {
      const response = await new SuggestAppController(makeRequest("")).get();

      expect(response.status).toBe(400);
      expect(mockGetSuggestions).not.toHaveBeenCalled();
    });

    it.each([
      ["vide", ""],
      ["d'1 caractère", "a"],
      ["de 2 caractères", "ab"],
    ])(
      "retourne 400 pour une q %s (seuil de 3 caractères)",
      async (_label, q) => {
        const response = await new SuggestAppController(
          makeRequest(`?q=${q}`)
        ).get();

        expect(response.status).toBe(400);
        expect(mockGetSuggestions).not.toHaveBeenCalled();
      }
    );

    it("accepte une q d'exactement 3 caractères", async () => {
      const response = await new SuggestAppController(
        makeRequest("?q=abc")
      ).get();

      expect(response.status).toBe(200);
      expect(mockGetSuggestions).toHaveBeenCalledWith("abc", 5);
    });
  });
});
