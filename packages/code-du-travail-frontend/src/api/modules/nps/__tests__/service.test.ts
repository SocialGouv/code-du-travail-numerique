import { sendNpsEvent } from "../service";
import { NpsTrigger } from "../../../../modules/nps/constants";

// Le service ne lit que `.ok` / `.status` : un objet simple suffit (évite la
// dépendance au global `Response`, absent de l'env de test par défaut).
const mockFetch = jest.fn(() => Promise.resolve({ ok: true, status: 204 }));

describe("sendNpsEvent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  it("relaie vers matomo.php : e_c en dur, action/name/valeur + UA forwardé", async () => {
    await sendNpsEvent({
      trigger: NpsTrigger.MAIN,
      slug: "contribution/conges-payes",
      score: 7,
      userAgent: "UA-navigateur",
    });

    expect(mockFetch).toHaveBeenCalledTimes(1);
    const [url, init] = mockFetch.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    // Params métier (indépendants de la config Matomo, mockée en test).
    expect(url).toContain("/matomo.php?");
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("e_c")).toBe("nps_submitted");
    expect(params.get("e_a")).toBe("main");
    expect(params.get("e_n")).toBe("contribution/conges-payes");
    expect(params.get("e_v")).toBe("7");
    // UA forwardé : sans lui, Matomo classe la requête serveur en « bot » et
    // n'enregistre pas l'event (cause du bug initial).
    expect((init.headers as Record<string, string>)["User-Agent"]).toBe(
      "UA-navigateur"
    );
  });

  it("sans userAgent : pas de header User-Agent", async () => {
    await sendNpsEvent({ trigger: NpsTrigger.COPY, slug: "a", score: 0 });
    const [, init] = mockFetch.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(init.headers).toBeUndefined();
  });

  it("throw si Matomo répond non-ok (relai en échec)", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(
      sendNpsEvent({ trigger: NpsTrigger.MAIN, slug: "a", score: 5 })
    ).rejects.toThrow(/500/);
  });
});
