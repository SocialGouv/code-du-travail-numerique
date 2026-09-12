/** @jest-environment node */

import { fetchDocument } from "../../../documents";
import { fetchTool } from "../../index";
import {
  getIndemniteRetraiteTool,
  INDEMNITE_RETRAITE_SLUG,
  withIndemniteRetraiteTile,
} from "../tool";

// Chemins relatifs : `jest.mock` résout depuis le fichier de test, pas par les
// alias TypeScript utilisés dans `tool.ts`.
jest.mock("../../index", () => ({ fetchTool: jest.fn() }));
jest.mock("../../../documents", () => ({ fetchDocument: jest.fn() }));

const fetchToolMock = fetchTool as jest.Mock;
const fetchDocumentMock = fetchDocument as jest.Mock;

const NOT_FOUND = new Error("Simulateur non trouvé");

/**
 * TODO(#7131) — à supprimer avec `tool.ts`, une fois le document créé.
 *
 * Le repli ne vaut que pour un document qui n'existe pas du tout. Un brouillon
 * ou un simulateur dépublié sont invisibles des mêmes requêtes, et doivent
 * pourtant l'emporter : sinon la rédaction ne peut plus retirer le simulateur.
 */
describe("Repli du simulateur d'indemnité de retraite", () => {
  beforeEach(() => jest.clearAllMocks());

  describe("aucun document en base", () => {
    beforeEach(() => {
      fetchToolMock.mockRejectedValue(NOT_FOUND);
      fetchDocumentMock.mockResolvedValue(undefined);
    });

    it("sert les libellés figés dans le code", async () => {
      const { tool, isPublished } = await getIndemniteRetraiteTool();
      expect(isPublished).toBe(false);
      expect(tool.displayTitle).toBe(
        "Calculer l'indemnité de départ à la retraite"
      );
    });

    it("ajoute la tuile à la liste des simulateurs", async () => {
      const tools = await withIndemniteRetraiteTile([]);
      expect(tools).toHaveLength(1);
      expect(tools[0].url).toBe(`/outils/${INDEMNITE_RETRAITE_SLUG}`);
    });
  });

  describe("document en base mais invisible des requêtes publiées", () => {
    beforeEach(() => {
      fetchToolMock.mockRejectedValue(NOT_FOUND);
      fetchDocumentMock.mockResolvedValue({ _id: "abc", slug: "x" });
    });

    it("laisse remonter l'erreur au lieu de servir le repli", async () => {
      await expect(getIndemniteRetraiteTool()).rejects.toThrow(NOT_FOUND);
    });

    it("n'ajoute pas la tuile à la liste des simulateurs", async () => {
      await expect(withIndemniteRetraiteTile([])).resolves.toEqual([]);
    });
  });

  it("laisse remonter une panne Elasticsearch", async () => {
    const panne = new Error("connect ECONNREFUSED");
    fetchToolMock.mockRejectedValue(panne);
    fetchDocumentMock.mockRejectedValue(panne);
    await expect(getIndemniteRetraiteTool()).rejects.toThrow(panne);
  });

  it("sert le document dès qu'il est publié", async () => {
    fetchToolMock.mockResolvedValue({ _id: "abc", title: "Depuis ES" });
    const { tool, isPublished } = await getIndemniteRetraiteTool();
    expect(isPublished).toBe(true);
    expect(tool.title).toBe("Depuis ES");
    expect(fetchDocumentMock).not.toHaveBeenCalled();
  });
});
