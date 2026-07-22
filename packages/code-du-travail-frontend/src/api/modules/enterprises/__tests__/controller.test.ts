import { EnterprisesAppController } from "../controller";
import { fetchEnterprises, populateAgreements } from "../service";

jest.mock("../service");
jest.mock("@sentry/nextjs", () => ({ captureException: jest.fn() }));
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

const mockFetchEnterprises = fetchEnterprises as jest.MockedFunction<
  typeof fetchEnterprises
>;
const mockPopulateAgreements = populateAgreements as jest.MockedFunction<
  typeof populateAgreements
>;

// Le contrôleur ne lit que `request.url` pour en extraire la query string.
const makeRequest = (query: string): Request =>
  ({ url: `https://cdtn.test/api/enterprises${query}` }) as Request;

describe("EnterprisesAppController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockFetchEnterprises.mockResolvedValue({ entreprises: [] } as never);
    mockPopulateAgreements.mockResolvedValue({ entreprises: [] } as never);
  });

  describe("get() — paramètre cp", () => {
    it("transmet un code postal unique sous forme de tableau", async () => {
      const response = await new EnterprisesAppController(
        makeRequest("?q=michelin&cp=63000")
      ).get();

      expect(response.status).toBe(200);
      expect(mockFetchEnterprises).toHaveBeenCalledWith("michelin", ["63000"]);
    });

    it("découpe plusieurs codes postaux séparés par des virgules", async () => {
      await new EnterprisesAppController(
        makeRequest("?q=michelin&cp=63000,75001")
      ).get();

      expect(mockFetchEnterprises).toHaveBeenCalledWith("michelin", [
        "63000",
        "75001",
      ]);
    });

    it("transmet un tableau vide quand cp est absent", async () => {
      await new EnterprisesAppController(makeRequest("?q=michelin")).get();

      expect(mockFetchEnterprises).toHaveBeenCalledWith("michelin", []);
    });

    it.each([
      ["une chaîne vide (cp présent mais vide)", ""],
      ["moins de 5 chiffres", "6300"],
      ["plus de 5 chiffres", "630000"],
      ["des lettres", "63abc"],
      ["une virgule finale (élément vide)", "63000,"],
      ["un élément malformé dans la liste", "63000,evil"],
      ["une tentative d'injection", "63000%20OR%201=1"],
    ])("retourne 400 pour un cp contenant %s", async (_label, cp) => {
      const response = await new EnterprisesAppController(
        makeRequest(`?q=michelin&cp=${cp}`)
      ).get();

      expect(response.status).toBe(400);
      expect(mockFetchEnterprises).not.toHaveBeenCalled();
    });
  });

  describe("get() — paramètre q", () => {
    it("retourne 400 quand q est absent", async () => {
      const response = await new EnterprisesAppController(
        makeRequest("?cp=63000")
      ).get();

      expect(response.status).toBe(400);
      expect(mockFetchEnterprises).not.toHaveBeenCalled();
    });

    it("retourne 400 quand q est vide", async () => {
      const response = await new EnterprisesAppController(
        makeRequest("?q=&cp=63000")
      ).get();

      expect(response.status).toBe(400);
      expect(mockFetchEnterprises).not.toHaveBeenCalled();
    });
  });
});
