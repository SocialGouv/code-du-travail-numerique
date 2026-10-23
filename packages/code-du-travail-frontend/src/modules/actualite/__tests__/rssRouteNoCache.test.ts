/**
 * @jest-environment node
 */
import { GET } from "../../../../app/actualite/rss.xml/route";
import { fetchNewsList } from "../queries";

jest.mock("../queries", () => ({
  fetchNewsList: jest.fn(),
}));

const mockedFetchNewsList = fetchNewsList as jest.Mock;

// Module chargé à neuf dans ce fichier : aucun flux connu en cache.
describe("GET /actualite/rss.xml sans flux connu", () => {
  beforeEach(() => {
    jest.spyOn(console, "error").mockImplementation(() => undefined);
  });

  it("répond 500 si Elasticsearch échoue", async () => {
    mockedFetchNewsList.mockRejectedValue(new Error("ES down"));
    const response = await GET();
    expect(response.status).toBe(500);
  });

  it("répond 500 plutôt qu'un flux vide si Elasticsearch ne renvoie rien", async () => {
    mockedFetchNewsList.mockResolvedValue({ items: [] });
    const response = await GET();
    expect(response.status).toBe(500);
    expect(await response.text()).not.toContain("<rss");
  });
});
