import * as Sentry from "@sentry/nextjs";
import { fetchSmicReference } from "../fetchSmicReference";

const eurosParMois = { numerators: ["€"], denominators: ["mois"] };

/** Réponse mesurée sur l'API pour le payload de préchargement. */
const SMIC_BODY = {
  evaluate: [
    { nodeValue: 1867.0166666666667, unit: eurosParMois },
    { nodeValue: 1455.9857257916665, unit: eurosParMois },
  ],
};

const ok = (body: unknown) =>
  ({
    ok: true,
    status: 200,
    headers: new Headers(),
    json: async () => body,
  }) as Response;

const rateLimited = (retryAfter = "0.8") =>
  ({
    ok: false,
    status: 429,
    headers: new Headers({ "retry-after": retryAfter }),
    json: async () => ({}),
  }) as Response;

const serverError = () =>
  ({
    ok: false,
    status: 500,
    headers: new Headers(),
    json: async () => ({}),
  }) as Response;

const fetchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  global.fetch = fetchMock as unknown as typeof fetch;
});

afterEach(() => {
  jest.useRealTimers();
});

/** Laisse filer les `setTimeout` d'attente entre deux tentatives. */
const settle = async <T>(promise: Promise<T>): Promise<T> => {
  await jest.advanceTimersByTimeAsync(10_000);
  return promise;
};

describe("fetchSmicReference", () => {
  it("obtient le brut et le net en un seul appel", async () => {
    // Deux appels — lire le brut puis le renvoyer pour en déduire le net —
    // doublaient la consommation d'un quota de 5 requêtes/seconde par IP.
    fetchMock.mockResolvedValueOnce(ok(SMIC_BODY));

    await expect(settle(fetchSmicReference())).resolves.toEqual({
      brutMensuel: 1867.02,
      netMensuel: 1455.99,
    });
    expect(fetchMock).toHaveBeenCalledTimes(1);

    const body = JSON.parse(fetchMock.mock.calls[0][1].body);
    expect(body.situation["salarié . contrat . salaire brut"]).toBe(
      "salarié . temps de travail . SMIC"
    );
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it("réessaie après un 429 et finit par aboutir", async () => {
    // À cache froid, tous les rendus serveur partent ensemble depuis la même IP :
    // sans retry, le préchargement tombe et la page perd le bouton « SMIC » et
    // ses messages contextuels pour toute la durée du pic.
    fetchMock
      .mockResolvedValueOnce(rateLimited())
      .mockResolvedValueOnce(rateLimited())
      .mockResolvedValueOnce(ok(SMIC_BODY));

    await expect(settle(fetchSmicReference())).resolves.toEqual({
      brutMensuel: 1867.02,
      netMensuel: 1455.99,
    });
    expect(fetchMock).toHaveBeenCalledTimes(3);
  });

  it("abandonne après trois 429 sans faire tomber la page", async () => {
    fetchMock.mockResolvedValue(rateLimited());

    await expect(settle(fetchSmicReference())).resolves.toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(3);
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });

  it("ne réessaie pas sur une erreur qui n'est pas un 429", async () => {
    fetchMock.mockResolvedValue(serverError());

    await expect(settle(fetchSmicReference())).resolves.toBeNull();
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it("refuse une réponse dont l'unité n'est pas €/mois", async () => {
    // Un montant annuel lu comme mensuel donnerait un SMIC douze fois trop haut,
    // donc un seuil de message contextuel absurde.
    fetchMock.mockResolvedValueOnce(
      ok({
        evaluate: [
          {
            nodeValue: 22404.2,
            unit: { numerators: ["€"], denominators: ["an"] },
          },
          SMIC_BODY.evaluate[1],
        ],
      })
    );

    await expect(settle(fetchSmicReference())).resolves.toBeNull();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });

  it("refuse une réponse à laquelle il manque le net", async () => {
    fetchMock.mockResolvedValueOnce(ok({ evaluate: [SMIC_BODY.evaluate[0]] }));

    await expect(settle(fetchSmicReference())).resolves.toBeNull();
  });

  it("ne lève jamais, même sur une panne réseau", async () => {
    fetchMock.mockRejectedValue(new TypeError("Failed to fetch"));

    await expect(settle(fetchSmicReference())).resolves.toBeNull();
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });
});
