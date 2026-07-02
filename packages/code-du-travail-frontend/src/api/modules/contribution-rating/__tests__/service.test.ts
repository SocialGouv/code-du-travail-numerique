import { sendRatingEvent } from "../service";

jest.mock("../../../../config", () => ({
  PIWIK_SITE_ID: "3",
  PIWIK_URL: "https://matomo.example.test",
  SITE_URL: "https://code.travail.gouv.fr",
}));

describe("contribution-rating service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn().mockResolvedValue({ ok: true, status: 200 });
  });

  it("appelle matomo.php avec les paramètres de tracking attendus", async () => {
    await sendRatingEvent({
      category: "notation_contribution",
      action: "validation_note",
      value: 4,
      slug: "conges-payes",
    });

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
    expect(parsed.searchParams.get("e_c")).toBe("notation_contribution");
    expect(parsed.searchParams.get("e_a")).toBe("validation_note");
    // Nom d'event = slug (le titre n'est plus relayé par le client).
    expect(parsed.searchParams.get("e_n")).toBe("conges-payes");
    expect(parsed.searchParams.get("e_v")).toBe("4");
  });

  it("construit une URL canonique stable à partir du slug (jamais d'URL client)", async () => {
    await sendRatingEvent({
      category: "notation_contribution",
      action: "validation_note",
      value: 4,
      slug: "conges-payes",
    });

    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    const parsed = new URL(calledUrl);
    expect(parsed.searchParams.get("url")).toBe(
      "https://code.travail.gouv.fr/contribution/conges-payes"
    );
  });

  it("n'émet pas d'action_name (pas de pageview/action fantôme)", async () => {
    await sendRatingEvent({
      category: "notation_contribution",
      action: "validation_note",
      value: 4,
      slug: "conges-payes",
    });

    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    const parsed = new URL(calledUrl);
    expect(parsed.searchParams.get("action_name")).toBeNull();
  });

  it("reste anonyme : aucun identifiant visiteur ni IP", async () => {
    await sendRatingEvent({
      category: "notation_contribution",
      action: "validation_note",
      value: 3,
      slug: "conges-payes",
    });

    const calledUrl = (global.fetch as jest.Mock).mock.calls[0][0] as string;
    const parsed = new URL(calledUrl);
    expect(parsed.searchParams.get("_id")).toBeNull();
    expect(parsed.searchParams.get("cip")).toBeNull();
    expect(parsed.searchParams.get("uid")).toBeNull();
  });

  it("borne le relai par un timeout (signal d'abort)", async () => {
    await sendRatingEvent({
      category: "notation_contribution",
      action: "validation_note",
      value: 3,
      slug: "conges-payes",
    });

    const init = (global.fetch as jest.Mock).mock.calls[0][1] as RequestInit;
    expect(init.signal).toBeInstanceOf(AbortSignal);
  });

  it("lève si Matomo répond une erreur", async () => {
    (global.fetch as jest.Mock).mockResolvedValue({ ok: false, status: 500 });
    await expect(
      sendRatingEvent({
        category: "notation_contribution",
        action: "validation_note",
        value: 3,
        slug: "conges-payes",
      })
    ).rejects.toThrow("Matomo tracking failed: 500");
  });
});
