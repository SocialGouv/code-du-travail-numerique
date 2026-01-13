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
