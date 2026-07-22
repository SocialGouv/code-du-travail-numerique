import { AccordsEnterpriseAppController } from "../controller";
import { getAccordsEntreprise } from "../service";

jest.mock("../service");
jest.mock("@sentry/nextjs", () => ({ captureException: jest.fn() }));
jest.mock("next/server", () => ({
  NextResponse: {
    // Comme le vrai NextResponse.json, le mock pose Content-Type par défaut.
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

const mockGetAccordsEntreprise = getAccordsEntreprise as jest.MockedFunction<
  typeof getAccordsEntreprise
>;

const mockAccordsResponse = {
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
};

describe("AccordsEnterpriseAppController", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("get()", () => {
    it("retourne 200 avec les accords pour un siret valide", async () => {
      mockGetAccordsEntreprise.mockResolvedValue(mockAccordsResponse);

      const controller = new AccordsEnterpriseAppController("12345678901234");
      const response = await controller.get();

      expect(response.status).toBe(200);
      const body = await response.json();
      expect(body).toEqual(mockAccordsResponse);
      expect(mockGetAccordsEntreprise).toHaveBeenCalledWith("12345678901234");
    });

    it("retourne 500 si le service lève une erreur", async () => {
      mockGetAccordsEntreprise.mockRejectedValue(new Error("API indisponible"));

      const controller = new AccordsEnterpriseAppController("12345678901234");
      const response = await controller.get();

      expect(response.status).toBe(500);
      const body = await response.json();
      expect(body).toHaveProperty("message");
    });

    it("retourne 400 si le siret est vide", async () => {
      const controller = new AccordsEnterpriseAppController("");
      const response = await controller.get();

      expect(response.status).toBe(400);
      expect(mockGetAccordsEntreprise).not.toHaveBeenCalled();
    });

    it.each([
      ["une tentative de path traversal", "../evil"],
      ["13 chiffres (un de moins que 14)", "1234567890123"],
      ["15 chiffres (un de plus que 14)", "123456789012345"],
      ["14 caractères dont une lettre", "1234567890123a"],
      ["14 chiffres avec des espaces autour", " 12345678901234 "],
      ["un SIREN (9 chiffres)", "123456789"],
    ])("retourne 400 pour %s", async (_label, siret) => {
      const controller = new AccordsEnterpriseAppController(siret);
      const response = await controller.get();

      expect(response.status).toBe(400);
      expect(mockGetAccordsEntreprise).not.toHaveBeenCalled();
    });

    it("capture l'exception Sentry en cas d'erreur", async () => {
      const { captureException } = require("@sentry/nextjs");
      const error = new Error("Erreur réseau");
      mockGetAccordsEntreprise.mockRejectedValue(error);

      const controller = new AccordsEnterpriseAppController("12345678901234");
      await controller.get();

      expect(captureException).toHaveBeenCalledWith(error);
    });

    it("retourne le Content-Type application/json", async () => {
      mockGetAccordsEntreprise.mockResolvedValue(mockAccordsResponse);

      const controller = new AccordsEnterpriseAppController("12345678901234");
      const response = await controller.get();

      expect(response.headers.get("Content-Type")).toBe("application/json");
    });
  });
});
