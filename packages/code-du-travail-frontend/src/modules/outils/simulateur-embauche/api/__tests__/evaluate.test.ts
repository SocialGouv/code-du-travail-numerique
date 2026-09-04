import * as Sentry from "@sentry/nextjs";
import { evaluateSalary, UrssafEvaluationError } from "../evaluate";
import type { EvaluateInput } from "../../domain/types";

const euros = (denominator: "mois" | "an") => ({
  numerators: ["€"],
  denominators: [denominator],
});
const percent = { numerators: ["%"], denominators: [] };

/** Réponse nominale mesurée sur l'API pour 2 875 €/mois brut. */
const NOMINAL_BODY = {
  evaluate: [
    { nodeValue: 3800.7975, unit: euros("mois") },
    { nodeValue: 2875, unit: euros("mois") },
    { nodeValue: 2253.9028125, unit: euros("mois") },
    { nodeValue: 2128.9861458, unit: euros("mois") },
    { nodeValue: 5.3, unit: percent },
    { nodeValue: 1867.0166666, unit: euros("mois") },
    { nodeValue: 2253.9028125, unit: euros("mois") },
  ],
};

const INPUT: EvaluateInput = {
  field: "salaireBrut",
  amountMonthly: 2875,
  period: "mois",
  contract: "CDI",
};

const jsonResponse = (body: unknown, init: Partial<Response> = {}) =>
  ({
    ok: true,
    status: 200,
    headers: new Headers(),
    json: async () => body,
    ...init,
  }) as Response;

const rateLimited = (retryAfter?: string) =>
  ({
    ok: false,
    status: 429,
    headers: new Headers(retryAfter ? { "retry-after": retryAfter } : {}),
    json: async () => ({}),
  }) as Response;

const fetchMock = jest.fn();

beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = fetchMock as unknown as typeof fetch;
});

describe("evaluateSalary", () => {
  it("appelle l'API URSSAF et renvoie les montants arrondis au centime", async () => {
    fetchMock.mockResolvedValueOnce(jsonResponse(NOMINAL_BODY));

    await expect(evaluateSalary(INPUT)).resolves.toEqual({
      coutTotalEmployeur: 3800.8,
      salaireBrut: 2875,
      salaireNet: 2253.9,
      salaireNetApresImpot: 2128.99,
      tauxImposition: 5.3,
      smicNetMensuel: 1867.02,
      salaireNetMensuel: 2253.9,
    });

    const [url, init] = fetchMock.mock.calls[0];
    expect(url).toBe("https://mon-entreprise.urssaf.fr/api/v1/evaluate");
    expect(init.method).toBe("POST");
    expect(JSON.parse(init.body).situation).toMatchObject({
      dirigeant: "non",
      "impôt . méthode de calcul": "'taux neutre'",
    });
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });

  it("neutralise une entrée en erreur bien que le statut soit 200", async () => {
    // L'API répond HTTP 200 même quand l'évaluation échoue : `response.ok` ne
    // suffit pas, il faut inspecter chaque entrée.
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        evaluate: [
          {
            error: {
              message: 'La référence "salarié . nawak" est introuvable.',
            },
          },
          ...NOMINAL_BODY.evaluate.slice(1),
        ],
      })
    );

    const results = await evaluateSalary(INPUT);

    expect(results.coutTotalEmployeur).toBeNull();
    expect(results.salaireBrut).toBe(2875);
    expect(Sentry.captureMessage).toHaveBeenCalledWith(
      expect.stringContaining("réponse URSSAF inattendue"),
      expect.objectContaining({ level: "warning" })
    );
  });

  it("ne rejette pas une évaluation au prétexte de missingVariables", async () => {
    // `missingVariables` est peuplé sur toute évaluation normale : le prendre
    // pour un signal d'échec viderait tous les champs.
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        evaluate: NOMINAL_BODY.evaluate.map((entry) => ({
          ...entry,
          missingVariables: { "salarié . convention collective": 1 },
        })),
      })
    );

    await expect(evaluateSalary(INPUT)).resolves.toMatchObject({
      salaireNet: 2253.9,
    });
    expect(Sentry.captureMessage).not.toHaveBeenCalled();
  });

  it("signale une unité inconnue sans planter", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({
        evaluate: [
          {
            nodeValue: 3800.7975,
            unit: { numerators: ["€"], denominators: ["semaine"] },
          },
          ...NOMINAL_BODY.evaluate.slice(1),
        ],
      })
    );

    const results = await evaluateSalary(INPUT);

    expect(results.coutTotalEmployeur).toBeNull();
    expect(Sentry.captureMessage).toHaveBeenCalledWith(
      expect.stringContaining("unité inconnue"),
      expect.anything()
    );
  });

  it("réessaie une seule fois après un 429, puis réussit", async () => {
    fetchMock
      .mockResolvedValueOnce(rateLimited("0.003"))
      .mockResolvedValueOnce(jsonResponse(NOMINAL_BODY));

    await expect(evaluateSalary(INPUT)).resolves.toMatchObject({
      salaireBrut: 2875,
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
  });

  it("abandonne après un second 429 et remonte le statut pour Matomo", async () => {
    fetchMock
      .mockResolvedValueOnce(rateLimited("0.003"))
      .mockResolvedValueOnce(rateLimited("0.003"));

    await expect(evaluateSalary(INPUT)).rejects.toMatchObject({
      reason: "429",
    });
    expect(fetchMock).toHaveBeenCalledTimes(2);
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });

  it("remonte le statut HTTP en cas d'erreur serveur", async () => {
    fetchMock.mockResolvedValueOnce(
      jsonResponse({}, { ok: false, status: 500 })
    );

    await expect(evaluateSalary(INPUT)).rejects.toMatchObject({
      reason: "500",
    });
  });

  it("qualifie une panne réseau de « reseau »", async () => {
    fetchMock.mockRejectedValueOnce(new TypeError("Failed to fetch"));

    const error = await evaluateSalary(INPUT).catch((e) => e);

    expect(error).toBeInstanceOf(UrssafEvaluationError);
    expect(error.reason).toBe("reseau");
    expect(Sentry.captureException).toHaveBeenCalledTimes(1);
  });

  it("laisse passer un AbortError sans le traiter comme une erreur", async () => {
    // Une requête annulée l'a été par nous, parce qu'une frappe plus récente
    // l'a rendue caduque : ni Sentry, ni état d'erreur, ni event Matomo.
    const abort = new DOMException("Aborted", "AbortError");
    fetchMock.mockRejectedValueOnce(abort);

    const error = await evaluateSalary(INPUT).catch((e) => e);

    expect(error.name).toBe("AbortError");
    expect(error).not.toBeInstanceOf(UrssafEvaluationError);
    expect(Sentry.captureException).not.toHaveBeenCalled();
    expect(Sentry.captureMessage).not.toHaveBeenCalled();
  });

  it("transmet le signal d'annulation à fetch", async () => {
    const controller = new AbortController();
    fetchMock.mockResolvedValueOnce(jsonResponse(NOMINAL_BODY));

    await evaluateSalary(INPUT, controller.signal);

    expect(fetchMock.mock.calls[0][1].signal).toBe(controller.signal);
  });

  it("interrompt l'attente du retry si la requête est annulée entretemps", async () => {
    const controller = new AbortController();
    fetchMock.mockResolvedValueOnce(rateLimited("1"));

    const promise = evaluateSalary(INPUT, controller.signal).catch((e) => e);
    controller.abort();

    expect((await promise).name).toBe("AbortError");
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(Sentry.captureException).not.toHaveBeenCalled();
  });
});
