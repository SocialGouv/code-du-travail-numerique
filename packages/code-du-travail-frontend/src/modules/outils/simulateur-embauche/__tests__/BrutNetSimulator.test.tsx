import { act, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { sendEvent } from "@socialgouv/matomo-next";
import { BrutNetSimulator } from "../components/BrutNetSimulator";
import { evaluateSalary, UrssafEvaluationError } from "../api/evaluate";
import type { SalaryResults, SmicReference } from "../domain/types";

jest.mock("../api/evaluate", () => {
  const actual = jest.requireActual("../api/evaluate");
  return {
    ...actual,
    evaluateSalary: jest.fn(),
  };
});
jest.mock("@socialgouv/matomo-next", () => ({ sendEvent: jest.fn() }));

const evaluateSalaryMock = evaluateSalary as jest.MockedFunction<
  typeof evaluateSalary
>;

/** Valeurs mesurées sur l'API URSSAF pour 2 875 €/mois brut. */
const RESULTS: SalaryResults = {
  coutTotalEmployeur: 3800.8,
  salaireBrut: 2875,
  salaireNet: 2253.9,
  salaireNetApresImpot: 2128.99,
  tauxImposition: 5.3,
  smicNetMensuel: 1455.99,
  salaireNetMensuel: 2253.9,
};

const SMIC: SmicReference = { brutMensuel: 1867.02, netMensuel: 1455.99 };

const renderSimulator = (smicReference: SmicReference | null = SMIC) =>
  render(<BrutNetSimulator smicReference={smicReference} />);

const field = (name: RegExp) => screen.getByRole("textbox", { name });

/** Retire les espaces (ordinaire, insécable, fine) pour comparer des montants. */
const digits = (value: string) => value.replace(/[\s  ]/g, "");

beforeEach(() => {
  jest.clearAllMocks();
  jest.useFakeTimers();
  evaluateSalaryMock.mockResolvedValue(RESULTS);
});

afterEach(() => {
  jest.useRealTimers();
});

const user = () => userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

/**
 * Laisse passer le debounce, la résolution de la promesse et le rendu React
 * qu'elle déclenche. Sans `act`, la mise à jour d'état venant du `.then` n'est
 * jamais appliquée sous faux timers.
 */
const flush = async () => {
  await act(async () => {
    await jest.advanceTimersByTimeAsync(400);
  });
};

describe("BrutNetSimulator", () => {
  it("recalcule les trois autres champs et laisse intact le texte saisi", async () => {
    // Test central de la règle anti-boucle : la réponse du serveur ne doit
    // jamais réécrire le champ où se trouve le curseur.
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();

    await waitFor(() => {
      expect(
        digits(field(/Coût total employeur/).getAttribute("value") ?? "")
      ).toBe("3800,80");
    });
    expect(
      digits(field(/Salaire net avant impôt/).getAttribute("value") ?? "")
    ).toBe("2253,90");
    expect(
      digits(field(/Salaire net après impôt/).getAttribute("value") ?? "")
    ).toBe("2128,99");
    // Non reformaté en « 2 875,00 » tant que le champ a le focus.
    expect(field(/Salaire brut/)).toHaveValue("2875");
  });

  it("reformate le champ à la sortie du focus", async () => {
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();
    await user().tab();

    expect(digits(field(/Salaire brut/).getAttribute("value") ?? "")).toBe(
      "2875,00"
    );
  });

  it("n'appelle l'API qu'une fois pour une frappe rapide", async () => {
    renderSimulator();

    await user().type(field(/Salaire brut/), "28750");
    await flush();

    expect(evaluateSalaryMock).toHaveBeenCalledTimes(1);
    expect(evaluateSalaryMock).toHaveBeenCalledWith(
      expect.objectContaining({ field: "salaireBrut", amountMonthly: 28750 }),
      expect.anything()
    );
  });

  it("ignore une réponse périmée arrivée après une plus récente", async () => {
    let resolveFirst: (value: SalaryResults) => void = () => undefined;
    evaluateSalaryMock
      .mockImplementationOnce(
        () => new Promise<SalaryResults>((resolve) => (resolveFirst = resolve))
      )
      .mockResolvedValueOnce({ ...RESULTS, coutTotalEmployeur: 9999.99 });

    renderSimulator();

    await user().type(field(/Salaire brut/), "1000");
    await flush();
    await user().type(field(/Salaire brut/), "0");
    await flush();

    // La réponse #1 arrive en retard : elle ne doit rien écraser.
    await act(async () => {
      resolveFirst({ ...RESULTS, coutTotalEmployeur: 1111.11 });
      await jest.advanceTimersByTimeAsync(50);
    });

    await waitFor(() => {
      expect(
        digits(field(/Coût total employeur/).getAttribute("value") ?? "")
      ).toBe("9999,99");
    });
  });

  it("vide les résultats sur une saisie invalide, sans appeler l'API", async () => {
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();
    evaluateSalaryMock.mockClear();

    await user().clear(field(/Salaire brut/));
    await flush();

    expect(evaluateSalaryMock).not.toHaveBeenCalled();
    expect(field(/Coût total employeur/)).toHaveValue("");
    // Aucun message contextuel tant qu'aucun net n'est calculé.
    expect(
      screen.queryByTestId("brut-net-message-primes-conventionnelles")
    ).not.toBeInTheDocument();
  });

  it("bascule le suffixe des champs en mode annuel", async () => {
    renderSimulator();

    expect(screen.getAllByText("€ par mois")).toHaveLength(4);

    await user().click(screen.getByRole("radio", { name: "Montant annuel" }));

    expect(screen.getAllByText("€ par an")).toHaveLength(4);
    expect(screen.queryByText("€ par mois")).not.toBeInTheDocument();
  });

  it("remplit le brut avec le SMIC préchargé", async () => {
    renderSimulator();

    await user().click(screen.getByRole("button", { name: "SMIC" }));
    await flush();

    expect(evaluateSalaryMock).toHaveBeenCalledWith(
      expect.objectContaining({ field: "salaireBrut", amountMonthly: 1867.02 }),
      expect.anything()
    );
  });

  it("masque le bouton SMIC quand le préchargement a échoué", () => {
    // Mieux vaut pas de bouton qu'un bouton qui injecte un montant inventé.
    renderSimulator(null);

    expect(
      screen.queryByRole("button", { name: "SMIC" })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Salaire médian" })
    ).toBeInTheDocument();
  });

  it("affiche le taux d'imposition dans la mention de situation", async () => {
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();

    await waitFor(() => {
      expect(
        screen.getByText(/Taux de référence pour une personne célibataire/)
      ).toHaveTextContent("5,3 %");
    });
  });

  it("affiche une alerte d'erreur sans emporter le reste de la page", async () => {
    evaluateSalaryMock.mockRejectedValue(
      new UrssafEvaluationError("boom", "500")
    );
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();

    await waitFor(() => {
      expect(screen.getByTestId("brut-net-erreur")).toBeInTheDocument();
    });
    // Non-régression : l'échec du calcul ne fait pas tomber la page.
    expect(screen.getByTestId("brut-net-informations")).toBeInTheDocument();
    expect(screen.getByTestId("brut-net-lien-urssaf")).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "Pour approfondir" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Réessayer" })
    ).toBeInTheDocument();
    expect(sendEvent).toHaveBeenCalledWith(
      expect.objectContaining({ action: "brut_net_erreur_api", name: "500" })
    );
  });

  it("relance le dernier calcul depuis le bouton Réessayer", async () => {
    evaluateSalaryMock.mockRejectedValueOnce(
      new UrssafEvaluationError("boom", "500")
    );
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();
    await waitFor(() =>
      expect(screen.getByTestId("brut-net-erreur")).toBeInTheDocument()
    );

    await user().click(screen.getByRole("button", { name: "Réessayer" }));
    await flush();

    await waitFor(() => {
      expect(screen.queryByTestId("brut-net-erreur")).not.toBeInTheDocument();
    });
    expect(
      digits(field(/Coût total employeur/).getAttribute("value") ?? "")
    ).toBe("3800,80");
  });

  it("n'annonce les résultats que dans une région live dédiée", async () => {
    // `aria-live` sur le conteneur des champs ferait annoncer chaque frappe.
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        /Résultats mis à jour : coût total employeur/
      );
    });
    expect(screen.getByRole("status")).toHaveTextContent("par mois");
  });

  it("n'applique jamais disabled ni readOnly aux quatre champs", async () => {
    // Désactiver un champ pendant le chargement volerait le focus.
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");

    for (const input of screen.getAllByRole("textbox")) {
      expect(input).not.toBeDisabled();
      expect(input).not.toHaveAttribute("readonly");
    }
  });
});

describe("message contextuel", () => {
  it("propose le salaire minimum pour un net proche du SMIC", async () => {
    evaluateSalaryMock.mockResolvedValue({
      ...RESULTS,
      salaireNet: 1500,
      salaireNetMensuel: 1500,
    });
    renderSimulator();

    await user().type(field(/Salaire brut/), "1900");
    await flush();

    await waitFor(() => {
      expect(
        screen.getByTestId("brut-net-message-salaire-minimum")
      ).toHaveAttribute("href", "/contribution/quel-est-le-salaire-minimum");
    });
    expect(
      screen.queryByTestId("brut-net-message-primes-conventionnelles")
    ).not.toBeInTheDocument();
  });

  it("propose les primes conventionnelles au-dessus du seuil", async () => {
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();

    await waitFor(() => {
      expect(
        screen.getByTestId("brut-net-message-primes-conventionnelles")
      ).toHaveAttribute(
        "href",
        "/contribution/quelles-sont-les-primes-prevues-par-la-convention-collective"
      );
    });
    expect(
      screen.queryByTestId("brut-net-message-salaire-minimum")
    ).not.toBeInTheDocument();
  });

  it("relie le message au champ Salaire net par aria-describedby", async () => {
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();

    await waitFor(() => {
      expect(
        screen.getByTestId("brut-net-message-primes-conventionnelles")
      ).toBeInTheDocument();
    });

    const describedBy = field(/Salaire net avant impôt/).getAttribute(
      "aria-describedby"
    );
    expect(describedBy).toBeTruthy();
    expect(
      document
        .getElementById(describedBy as string)
        ?.contains(
          screen.getByTestId("brut-net-message-primes-conventionnelles")
        )
    ).toBe(true);
  });
});

describe("tracking Matomo", () => {
  const eventsOf = (action: string) =>
    (sendEvent as jest.Mock).mock.calls
      .map(([event]) => event)
      .filter((event) => event.action === action);

  it("compte une saisie par champ et par montage, pas par frappe", async () => {
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await user().type(field(/Coût total employeur/), "38");
    await flush();

    expect(eventsOf("brut_net_saisie_champ")).toEqual([
      {
        category: "outil",
        action: "brut_net_saisie_champ",
        name: "salaire_brut",
      },
      {
        category: "outil",
        action: "brut_net_saisie_champ",
        name: "cout_total_employeur",
      },
    ]);
  });

  it("émet un event de remplissage automatique", async () => {
    renderSimulator();

    await user().click(screen.getByRole("button", { name: "Salaire médian" }));
    await user().click(screen.getByRole("button", { name: "SMIC" }));

    expect(
      eventsOf("brut_net_remplir_automatiquement").map((e) => e.name)
    ).toEqual(["salaire_median", "smic"]);
  });

  it("n'annonce l'affichage d'un message contextuel qu'une fois par type", async () => {
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();
    await waitFor(() =>
      expect(eventsOf("brut_net_affichage_message_contextuel")).toHaveLength(1)
    );

    await user().type(field(/Salaire brut/), "0");
    await flush();

    expect(eventsOf("brut_net_affichage_message_contextuel")).toEqual([
      {
        category: "outil",
        action: "brut_net_affichage_message_contextuel",
        name: "primes_conventionnelles",
      },
    ]);
  });

  it("compte chaque clic sur un message contextuel", async () => {
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();
    await waitFor(() =>
      expect(
        screen.getByTestId("brut-net-message-primes-conventionnelles")
      ).toBeInTheDocument()
    );

    await user().click(
      screen.getByTestId("brut-net-message-primes-conventionnelles")
    );

    expect(eventsOf("brut_net_clic_message_contextuel")).toEqual([
      {
        category: "outil",
        action: "brut_net_clic_message_contextuel",
        name: "primes_conventionnelles",
      },
    ]);
  });

  it("compte le clic sur une carte « Pour approfondir »", async () => {
    renderSimulator();

    await user().click(
      screen.getByRole("link", { name: /Quel est le salaire minimum/ })
    );

    expect(eventsOf("brut_net_clic_pour_approfondir")).toEqual([
      {
        category: "outil",
        action: "brut_net_clic_pour_approfondir",
        name: "infographie/quel-est-le-salaire-minimum",
      },
    ]);
  });

  it("compte la sortie vers le simulateur URSSAF avec la période", async () => {
    renderSimulator();

    await user().click(screen.getByRole("radio", { name: "Montant annuel" }));
    await user().click(screen.getByTestId("brut-net-lien-urssaf"));

    expect(eventsOf("brut_net_clic_simulateur_urssaf")).toEqual([
      {
        category: "outil",
        action: "brut_net_clic_simulateur_urssaf",
        name: "annee",
      },
    ]);
  });

  it("qualifie une panne réseau plutôt que d'envoyer un nom vide", async () => {
    // Matomo jette un `name` falsy : l'event serait compté sans jamais
    // apparaître dans le rapport « Noms d'événements ».
    evaluateSalaryMock.mockRejectedValue(
      new UrssafEvaluationError("offline", "reseau")
    );
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();

    await waitFor(() =>
      expect(eventsOf("brut_net_erreur_api")).toEqual([
        { category: "outil", action: "brut_net_erreur_api", name: "reseau" },
      ])
    );
  });

  it("n'émet aucun event d'erreur quand la requête est simplement annulée", async () => {
    const abort = new DOMException("Aborted", "AbortError");
    evaluateSalaryMock.mockRejectedValue(abort);
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();

    expect(eventsOf("brut_net_erreur_api")).toEqual([]);
    expect(screen.queryByTestId("brut-net-erreur")).not.toBeInTheDocument();
  });
});

describe("lien vers le simulateur URSSAF", () => {
  it("ouvre dans un nouvel onglet et préremplit la saisie", async () => {
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();

    await waitFor(() => {
      const link = screen.getByTestId("brut-net-lien-urssaf");
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
      const url = new URL(link.getAttribute("href") as string);
      expect(url.searchParams.get("salarié . contrat . salaire brut")).toBe(
        "2875€/mois"
      );
      expect(url.searchParams.get("unité")).toBe("€/mois");
    });
  });

  it("reste un lien valide avant tout calcul", () => {
    renderSimulator();

    const url = new URL(
      screen.getByTestId("brut-net-lien-urssaf").getAttribute("href") as string
    );
    expect(url.pathname).toBe("/simulateurs/salaire-brut-net");
    expect(url.searchParams.has("salarié . contrat . salaire brut")).toBe(
      false
    );
  });
});
