import { elasticsearchClient } from "../../../api/utils";
import { fetchWhatIsNewMonth, getPeriods } from "../queries";

jest.mock("../../../api/utils", () => ({
  elasticDocumentsIndex: "cdtn_test_documents",
  elasticsearchClient: {
    search: jest.fn(),
  },
}));

const mockedSearch = elasticsearchClient.search as unknown as jest.Mock;

describe("whatIsNew queries", () => {
  beforeEach(() => {
    mockedSearch.mockReset();
  });

  test("keeps title-only entries (no url, no description) so the title can be displayed", async () => {
    mockedSearch.mockResolvedValueOnce({
      hits: {
        hits: [
          {
            _source: {
              weekStart: "2025-10-06",
              url: "",
              title: "Titre seul",
              description: "",
            },
          },
        ],
      },
    });

    const periods = await getPeriods();
    expect(periods).toContain("10-2025");

    mockedSearch.mockResolvedValueOnce({
      hits: {
        hits: [
          {
            _source: {
              weekStart: "2025-10-06",
              kind: "evolution-juridique",
              url: "",
              title: "Titre seul",
              description: "",
              createdAt: "2025-10-06T10:00:00.000Z",
              updatedAt: "2025-10-06T10:00:00.000Z",
            },
          },
        ],
      },
    });

    const month = await fetchWhatIsNewMonth("10-2025");
    expect(month).toBeDefined();

    const titles =
      month?.weeks
        .flatMap((w) => w.categories ?? [])
        .flatMap((c) => c.items)
        .map((i) => i.title) ?? [];

    expect(titles).toContain("Titre seul");
  });
});

describe("fetchWhatIsNewMonth – gestion de la semaine courante", () => {
  beforeEach(() => {
    mockedSearch.mockReset();
    // Mercredi 15 octobre 2025 → lundi de la semaine courante = 13 octobre
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2025-10-15T12:00:00.000Z"));
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  // Lundis d'octobre 2025 : 06, 13, 20, 27

  test("affiche la semaine courante sans données avec hasUpdates = false", async () => {
    // Données uniquement pour la semaine du 6 octobre
    mockedSearch.mockResolvedValueOnce({
      hits: {
        hits: [
          {
            _source: {
              weekStart: "2025-10-06",
              kind: "evolution-juridique",
              url: "",
              title: "MAJ semaine 1",
              description: "",
              createdAt: "2025-10-06T10:00:00.000Z",
              updatedAt: "2025-10-06T10:00:00.000Z",
            },
          },
        ],
      },
    });

    const month = await fetchWhatIsNewMonth("10-2025");
    expect(month).toBeDefined();

    const weekIds = month!.weeks.map((w) => w.id);

    // La semaine courante (13 oct) doit apparaître même sans données
    expect(weekIds).toContain("2025-10-13");
    // Les semaines futures ne doivent pas apparaître
    expect(weekIds).not.toContain("2025-10-20");
    expect(weekIds).not.toContain("2025-10-27");

    const currentWeek = month!.weeks.find((w) => w.id === "2025-10-13");
    expect(currentWeek?.hasUpdates).toBe(false);
  });

  test("n'affiche pas les semaines futures du mois courant", async () => {
    mockedSearch.mockResolvedValueOnce({
      hits: {
        hits: [
          {
            _source: {
              weekStart: "2025-10-13",
              kind: "mise-a-jour-fonctionnelle",
              url: "/test",
              title: "MAJ courante",
              description: "",
              createdAt: "2025-10-13T10:00:00.000Z",
              updatedAt: "2025-10-13T10:00:00.000Z",
            },
          },
        ],
      },
    });

    const month = await fetchWhatIsNewMonth("10-2025");
    const weekIds = month!.weeks.map((w) => w.id);

    expect(weekIds).toContain("2025-10-13");
    expect(weekIds).not.toContain("2025-10-20");
    expect(weekIds).not.toContain("2025-10-27");
  });

  test("affiche la semaine courante avec ses données quand elle en a", async () => {
    mockedSearch.mockResolvedValueOnce({
      hits: {
        hits: [
          {
            _source: {
              weekStart: "2025-10-13",
              kind: "mise-a-jour-fonctionnelle",
              url: "/feature",
              title: "Nouvelle fonctionnalité",
              description: "Description",
              createdAt: "2025-10-13T10:00:00.000Z",
              updatedAt: "2025-10-13T10:00:00.000Z",
            },
          },
        ],
      },
    });

    const month = await fetchWhatIsNewMonth("10-2025");
    const currentWeek = month!.weeks.find((w) => w.id === "2025-10-13");

    expect(currentWeek?.hasUpdates).toBe(true);
    expect(currentWeek?.categories).toHaveLength(1);
    expect(currentWeek?.categories?.[0].items[0].title).toBe(
      "Nouvelle fonctionnalité"
    );
  });

  test("affiche la semaine n-1 sans données quand seules des semaines antérieures ont des données", async () => {
    // Données uniquement pour la semaine du 6 octobre
    // La semaine du 13 (courante) ET la semaine du 6 doivent apparaître
    mockedSearch.mockResolvedValueOnce({
      hits: {
        hits: [
          {
            _source: {
              weekStart: "2025-10-06",
              kind: "evolution-juridique",
              url: "/loi",
              title: "Changement juridique",
              description: "",
              createdAt: "2025-10-06T10:00:00.000Z",
              updatedAt: "2025-10-06T10:00:00.000Z",
            },
          },
        ],
      },
    });

    const month = await fetchWhatIsNewMonth("10-2025");

    const week06 = month!.weeks.find((w) => w.id === "2025-10-06");
    const week13 = month!.weeks.find((w) => w.id === "2025-10-13");

    expect(week06?.hasUpdates).toBe(true);
    expect(week13?.hasUpdates).toBe(false);
  });
});
