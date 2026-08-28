import { sendNpsEvent } from "../service";

// Le service ne lit que `.ok` / `.status` : un objet simple suffit (évite la
// dépendance au global `Response`, absent de l'env de test par défaut).
const mockFetch = jest.fn(() => Promise.resolve({ ok: true, status: 204 }));

const calledParams = (): URLSearchParams => {
  const [url] = mockFetch.mock.calls[0] as unknown as [string];
  return new URLSearchParams(url.split("?")[1]);
};

describe("sendNpsEvent", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = mockFetch as unknown as typeof fetch;
  });

  it("relaie vers matomo.php et forwarde l'UA du visiteur", async () => {
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
    expect(url).toContain("/matomo.php?");
    // UA forwardé : sans lui, Matomo classe la requête serveur en « bot » et
    // n'enregistre pas l'event (cause du bug initial).
    expect((init.headers as Record<string, string>)["User-Agent"]).toBe(
      "UA-navigateur"
    );
  });

  // La catégorie n'est plus « nps » en dur : elle vaut le type de la page où
  // l'usager a répondu, comme n'importe quel event client.
  it("émet le contrat normalisé avec la catégorie de la page", async () => {
    await sendNpsEvent({ slug: "contribution/conges-payes", score: 7 });
    const params = calledParams();

    expect(params.get("e_c")).toBe("contribution");
    expect(params.get("e_a")).toBe("submit_nps_7");
    expect(params.get("e_n")).toBe('{"path":"contribution/conges-payes"}');
    expect(params.get("e_v")).toBe("7");
  });

  it("prend la catégorie du type de page, pas une valeur fixe", async () => {
    await sendNpsEvent({ slug: "outils/indemnite-licenciement", score: 9 });

    expect(calledParams().get("e_c")).toBe("outil");
  });

  // 0 est un score NPS valide — le plus détracteur — et Matomo n'enregistre pas
  // une `value` de 0. L'action porte donc le score de façon fiable.
  it("ne perd pas le score 0", async () => {
    await sendNpsEvent({ slug: "contribution/x", score: 0 });
    const params = calledParams();

    expect(params.get("e_a")).toBe("submit_nps_0");
    expect(params.get("e_n")).toBe('{"path":"contribution/x"}');
  });

  it("refuse un score hors bornes plutôt que d'inventer une action", async () => {
    await expect(
      sendNpsEvent({ slug: "contribution/x", score: 42 })
    ).rejects.toThrow(RangeError);
    expect(mockFetch).not.toHaveBeenCalled();
  });

  it("sans userAgent : pas de header User-Agent", async () => {
    await sendNpsEvent({ slug: "contribution/x", score: 0 });
    const [, init] = mockFetch.mock.calls[0] as unknown as [
      string,
      RequestInit,
    ];
    expect(init.headers).toBeUndefined();
  });

  it("throw si Matomo répond non-ok (relai en échec)", async () => {
    mockFetch.mockResolvedValueOnce({ ok: false, status: 500 });
    await expect(
      sendNpsEvent({ slug: "contribution/x", score: 5 })
    ).rejects.toThrow(/500/);
  });
});
