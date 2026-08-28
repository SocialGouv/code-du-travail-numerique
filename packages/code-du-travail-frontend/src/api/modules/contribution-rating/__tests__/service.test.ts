import { sendRatingEvent } from "../service";

jest.mock("../../../../config", () => ({
  PIWIK_SITE_ID: "3",
  PIWIK_URL: "https://matomo.example.test",
  SITE_URL: "https://code.travail.gouv.fr",
}));

const RATING = {
  source: "contributions",
  slug: "conges-payes",
  value: 4,
} as const;

const calledParams = (): URLSearchParams => {
  const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
  return new URL(calledUrl).searchParams;
};

describe("contribution-rating service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 200 });
  });

  it("appelle matomo.php avec les paramètres de tracking attendus", async () => {
    await sendRatingEvent(RATING);

    expect(global.fetch).toHaveBeenCalledTimes(1);
    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    const parsed = new URL(calledUrl);

    expect(parsed.origin + parsed.pathname).toBe(
      "https://matomo.example.test/matomo.php"
    );
    expect(parsed.searchParams.get("idsite")).toBe("3");
    expect(parsed.searchParams.get("rec")).toBe("1");
    expect(parsed.searchParams.get("apiv")).toBe("1");
    expect(parsed.searchParams.get("send_image")).toBe("0");
  });

  // Le relai serveur émet exactement le même contrat que les hooks client :
  // catégorie = type de page, action = ce qu'a fait l'usager, name = payload JSON.
  it("émet le contrat normalisé, pas une catégorie en dur", async () => {
    await sendRatingEvent(RATING);
    const params = calledParams();

    // Anciennement « notation_contribution » : une catégorie qui décrivait
    // l'interaction, pas la page.
    expect(params.get("e_c")).toBe("contribution");
    expect(params.get("e_a")).toBe("rate_content_4");
    expect(params.get("e_n")).toBe('{"path":"contribution/conges-payes"}');
  });

  // La note voyage dans l'action ET dans e_v : l'action donne la distribution
  // (Matomo compte), e_v donne la moyenne (Matomo agrège). L'action reste le
  // porteur fiable — Matomo n'enregistre pas une value de 0.
  it("renseigne e_v en plus de l'action", async () => {
    await sendRatingEvent(RATING);

    expect(calledParams().get("e_v")).toBe("4");
  });

  it("produit une action distincte par note", async () => {
    await sendRatingEvent({ ...RATING, value: 1 });
    expect(calledParams().get("e_a")).toBe("rate_content_1");
  });

  it("refuse une note hors bornes plutôt que d'inventer une action", async () => {
    await expect(sendRatingEvent({ ...RATING, value: 9 })).rejects.toThrow(
      RangeError
    );
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("construit une URL canonique stable à partir du slug (jamais d'URL client)", async () => {
    await sendRatingEvent(RATING);

    expect(calledParams().get("url")).toBe(
      "https://code.travail.gouv.fr/contribution/conges-payes"
    );
  });

  it("n'émet pas d'action_name (pas de pageview/action fantôme)", async () => {
    await sendRatingEvent(RATING);

    expect(calledParams().get("action_name")).toBeNull();
  });

  it("reste anonyme : aucun identifiant visiteur ni IP", async () => {
    await sendRatingEvent({ ...RATING, value: 3 });
    const params = calledParams();

    expect(params.get("_id")).toBeNull();
    expect(params.get("cip")).toBeNull();
    expect(params.get("uid")).toBeNull();
  });

  it("transmet le User-Agent du visiteur à Matomo", async () => {
    await sendRatingEvent({ ...RATING, userAgent: "UA-navigateur" });

    const init = (global.fetch as jest.Mock).mock.calls[0][1] as RequestInit;
    // UA forwardé : sans lui, Matomo classe la requête serveur en « bot » et
    // n'enregistre pas l'event (cause du bug initial, cf. #7384).
    expect((init.headers as Record<string, string>)["User-Agent"]).toBe(
      "UA-navigateur"
    );
  });

  it("sans userAgent : pas de header User-Agent", async () => {
    await sendRatingEvent(RATING);

    const init = (global.fetch as jest.Mock).mock.calls[0][1] as RequestInit;
    expect(init.headers).toBeUndefined();
  });

  it("borne le relai par un timeout (signal d'abort)", async () => {
    await sendRatingEvent({ ...RATING, value: 3 });

    const init = (global.fetch as jest.Mock).mock.calls[0][1] as RequestInit;
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("lève si Matomo répond une erreur", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false, status: 500 });

    await expect(sendRatingEvent({ ...RATING, value: 3 })).rejects.toThrow(
      "Matomo tracking failed: 500"
    );
  });
});
