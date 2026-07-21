/** @jest-environment jsdom */
import { sendNpsScore, NPS_ENDPOINT } from "../sendNpsScore";
import { NpsTrigger } from "../constants";

const mockFetch = jest.fn(() => Promise.resolve(new Response(null)));

describe("sendNpsScore", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  it("POST /api/nps avec { score, trigger, slug } (slug = chemin sans slash initial)", async () => {
    await sendNpsScore({
      pagePath: "/contribution/conges-payes",
      score: 8,
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, init] = mockFetch.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(url).toBe(NPS_ENDPOINT);
    expect(init.method).toBe("POST");
    expect(init.keepalive).toBe(true);
    expect(JSON.parse(init.body as string)).toEqual({
      score: 8,
      slug: "contribution/conges-payes",
    });
  });

  it("est fire-and-forget : ne rejette pas si le fetch échoue", async () => {
    mockFetch.mockRejectedValueOnce(new Error("network"));
    await expect(
      sendNpsScore({ pagePath: "/a", score: 0 })
    ).resolves.toBeUndefined();
  });
});
