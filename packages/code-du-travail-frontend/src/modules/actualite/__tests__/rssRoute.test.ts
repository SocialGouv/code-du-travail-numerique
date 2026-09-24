/**
 * @jest-environment node
 */
import { GET } from "../../../../app/actualite/rss.xml/route";
import { fetchNewsList } from "../queries";

jest.mock("../queries", () => ({
  fetchNewsList: jest.fn(),
}));

const mockedFetchNewsList = fetchNewsList as jest.Mock;

const news = (slug: string) => ({
  title: `Actualité ${slug}`,
  slug,
  date: "18/09/2026",
  meta_description: "Description",
});

describe("GET /actualite/rss.xml", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    jest.spyOn(console, "error").mockImplementation(() => undefined);
    jest.useFakeTimers({ now: new Date("2026-09-23T10:00:00Z") });
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it("sert le flux et le met en cache une heure", async () => {
    mockedFetchNewsList.mockResolvedValue({ items: [news("premiere")] });

    const response = await GET();
    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe(
      "application/rss+xml; charset=utf-8"
    );
    expect(await response.text()).toContain("/actualite/premiere");
    expect(mockedFetchNewsList).toHaveBeenCalledWith(
      ["title", "meta_description", "date", "slug"],
      { page: 1, pageSize: 20 }
    );

    // Dans l'heure : pas de nouvel appel Elasticsearch.
    jest.advanceTimersByTime(59 * 60 * 1000);
    await GET();
    expect(mockedFetchNewsList).toHaveBeenCalledTimes(1);

    // Après expiration : le flux est régénéré.
    jest.advanceTimersByTime(2 * 60 * 1000);
    mockedFetchNewsList.mockResolvedValue({ items: [news("seconde")] });
    expect(await (await GET()).text()).toContain("/actualite/seconde");
    expect(mockedFetchNewsList).toHaveBeenCalledTimes(2);
  });

  it("ne sert ni ne met en cache un résultat vide, et se replie sur le dernier flux connu", async () => {
    // Cache expiré depuis le test précédent (module partagé) : on force une
    // régénération qui répond vide.
    jest.advanceTimersByTime(3 * 60 * 60 * 1000);
    mockedFetchNewsList.mockResolvedValue({ items: [] });

    const response = await GET();
    expect(response.status).toBe(200);
    // Dernier flux connu (« seconde »), pas un canal sans item.
    expect(await response.text()).toContain("/actualite/seconde");

    // Le vide n'a pas été mis en cache : nouvel appel à la requête suivante.
    mockedFetchNewsList.mockResolvedValue({ items: [] });
    await GET();
    expect(mockedFetchNewsList).toHaveBeenCalledTimes(2);
  });

  it("se replie sur le dernier flux connu si Elasticsearch échoue", async () => {
    jest.advanceTimersByTime(3 * 60 * 60 * 1000);
    mockedFetchNewsList.mockRejectedValue(new Error("ES down"));

    const response = await GET();
    expect(response.status).toBe(200);
    expect(await response.text()).toContain("/actualite/seconde");
  });
});
