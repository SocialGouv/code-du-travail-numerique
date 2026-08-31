import { sendNpsEvent } from "../service";

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
    expect(params.get("e_c")).toBe("nps");
    expect(params.get("e_a")).toBe("score_7");
    expect(params.get("e_n")).toBe("contribution/conges-payes");
    // UA forwardé : sans lui, Matomo classe la requête serveur en « bot » et
    // n'enregistre pas l'event (cause du bug initial).
    expect((init.headers as Record<string, string>)["User-Agent"]).toBe(
      "UA-navigateur"
    );
  });

  // Une note donnée depuis la page d'accueil arrive avec un slug vide : envoyé
  // tel quel, Matomo jette le nom de l'event. L'URL canonique, elle, doit
  // rester celle de l'accueil — surtout pas `/accueil`, qui n'existe pas.
  it("étiquette la page d'accueil sans dénaturer l'URL canonique", async () => {
    await sendNpsEvent({ slug: "", score: 9 });

    const [url] = mockFetch.mock.calls[0] as unknown as [string];
    const params = new URLSearchParams(url.split("?")[1]);
    expect(params.get("e_n")).toBe("index");
    expect(params.get("url")).toMatch(/\/$/);
    expect(params.get("url")).not.toContain("/accueil");
  });

  it("sans userAgent : pas de header User-Agent", async () => {
    await sendNpsEvent({ slug: "a", score: 0 });
    const [, init] = mockFetch.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(init.headers).toBeUndefined();
  });

  it("throw si Matomo répond non-ok (relai en échec)", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(sendNpsEvent({ slug: "a", score: 5 })).rejects.toThrow(/500/);
  });
});
