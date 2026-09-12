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
  salaireNetMensuel: 2253.9,
  salaireBrutMensuel: 2875,
};

/** La même simulation demandée en période annuelle : seuls les quatre montants affichés changent d'unité. */
const ANNUAL_RESULTS: SalaryResults = {
  ...RESULTS,
  coutTotalEmployeur: 45609.57,
  salaireBrut: 34500,
  salaireNet: 27046.83,
  salaireNetApresImpot: 25547.83,
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

  it("garde la saisie si l'usager sort du champ avant le premier résultat", async () => {
    // Taper un montant puis faire Tab tout de suite est un geste courant, et il
    // arrive avant la fin du debounce : reprendre la valeur formatée de
    // `results`, encore vide, effacerait la saisie à l'écran.
    let resolveCall: (value: SalaryResults) => void = () => undefined;
    evaluateSalaryMock.mockImplementationOnce(
      () => new Promise<SalaryResults>((resolve) => (resolveCall = resolve))
    );
    renderSimulator();

    await user().type(field(/Salaire brut/), "3000");
    // Le debounce est passé, la requête est partie, la réponse se fait attendre.
    await flush();
    await user().tab();

    expect(field(/Salaire brut/)).toHaveValue("3000");

    // La saisie reste affichée, et les trois autres champs se remplissent quand
    // la réponse arrive.
    await act(async () => {
      resolveCall({ ...RESULTS, salaireBrut: 3000 });
      await jest.advanceTimersByTimeAsync(400);
    });
    expect(field(/Salaire brut/)).toHaveValue("3000");
    expect(
      digits(field(/Coût total employeur/).getAttribute("value") ?? "")
    ).toBe("3800,80");
  });

  it("ne perd pas la saisie quand l'appel échoue après une sortie de champ", async () => {
    evaluateSalaryMock.mockRejectedValue(
      new UrssafEvaluationError("boom", "500")
    );
    renderSimulator();

    await user().type(field(/Salaire brut/), "3000");
    await user().tab();
    await flush();

    await waitFor(() => {
      expect(screen.getByTestId("brut-net-erreur")).toBeInTheDocument();
    });
    // L'alerte affirme que la page est intacte : la saisie doit l'être aussi.
    expect(field(/Salaire brut/)).toHaveValue("3000");
  });

  it("ne vide pas les autres champs quand l'usager tape le séparateur décimal", async () => {
    // « 1 867, » n'est pas parsable, mais c'est la façon normale d'écrire un
    // salaire en français. Tout effacer à la virgule ferait clignoter les trois
    // autres montants et le message contextuel à chaque décimale.
    renderSimulator();

    await user().type(field(/Salaire brut/), "1867");
    await flush();
    await waitFor(() => {
      expect(
        digits(field(/Coût total employeur/).getAttribute("value") ?? "")
      ).toBe("3800,80");
    });
    evaluateSalaryMock.mockClear();

    await user().type(field(/Salaire brut/), ",");

    expect(field(/Salaire brut/)).toHaveValue("1867,");
    expect(
      digits(field(/Coût total employeur/).getAttribute("value") ?? "")
    ).toBe("3800,80");
    expect(
      screen.getByTestId("brut-net-message-primes-conventionnelles")
    ).toBeInTheDocument();
    // Saisie incomplète : on suspend l'appel, on n'en lance pas un faux.
    await flush();
    expect(evaluateSalaryMock).not.toHaveBeenCalled();
  });

  it("vide tout quand le champ est réellement effacé", async () => {
    renderSimulator();

    await user().type(field(/Salaire brut/), "1867");
    await flush();
    await waitFor(() => {
      expect(
        digits(field(/Coût total employeur/).getAttribute("value") ?? "")
      ).toBe("3800,80");
    });

    await user().clear(field(/Salaire brut/));
    await flush();

    expect(field(/Coût total employeur/)).toHaveValue("");
    expect(
      screen.queryByTestId("brut-net-message-primes-conventionnelles")
    ).not.toBeInTheDocument();
  });

  it("efface les montants au changement de période, le temps du recalcul", async () => {
    // Le suffixe bascule au clic, la réponse arrive un debounce plus tard :
    // garder les montants afficherait un mensuel sous un libellé annuel.
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();
    await waitFor(() => {
      expect(
        digits(field(/Coût total employeur/).getAttribute("value") ?? "")
      ).toBe("3800,80");
    });

    evaluateSalaryMock.mockResolvedValue(ANNUAL_RESULTS);
    await user().click(screen.getByRole("radio", { name: "Montant annuel" }));

    // Aucun montant sous le nouveau libellé tant que l'API n'a pas répondu.
    expect(field(/Coût total employeur/)).toHaveValue("");
    expect(screen.getByRole("status")).toHaveTextContent("");

    await flush();
    await waitFor(() => {
      expect(
        digits(field(/Coût total employeur/).getAttribute("value") ?? "")
      ).toBe("45609,57");
    });
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
      screen.getByRole("link", { name: /Quel est le salaire minimum/ })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Réessayer" })
    ).toBeInTheDocument();
    expect(sendEvent).toHaveBeenCalledWith(
      expect.objectContaining({ action: "brut_net_erreur_api", name: "500" })
    );
  });

  it("garde les quatre champs montés et le focus pendant une erreur", async () => {
    // L'erreur survient typiquement en pleine frappe : démonter les champs pour
    // mettre l'alerte à leur place effacerait la saisie et volerait le curseur.
    evaluateSalaryMock.mockRejectedValue(
      new UrssafEvaluationError("trop de requêtes", "429")
    );
    renderSimulator();

    const input = field(/Salaire brut/);
    await user().type(input, "2875");
    await flush();

    await waitFor(() => {
      expect(screen.getByTestId("brut-net-erreur")).toBeInTheDocument();
    });
    // Le même nœud DOM, jamais remplacé : ni focus perdu, ni texte effacé.
    expect(field(/Salaire brut/)).toBe(input);
    expect(input).toHaveFocus();
    expect(input).toHaveValue("2875");
    expect(screen.getAllByRole("textbox")).toHaveLength(4);
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

  it("annonce l'échec par la région live, pas par l'alerte elle-même", async () => {
    // Une région montée en même temps que son contenu n'est pas annoncée de
    // façon fiable, et en `assertive` elle couperait la frappe en cours.
    evaluateSalaryMock.mockRejectedValue(
      new UrssafEvaluationError("boom", "500")
    );
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();

    await waitFor(() => {
      expect(screen.getByRole("status")).toHaveTextContent(
        /Le calcul n'a pas pu être effectué/
      );
    });
    expect(screen.getByTestId("brut-net-erreur")).toHaveAttribute(
      "aria-live",
      "off"
    );
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

  it("n'affiche aucun message sans SMIC net préchargé", async () => {
    // Le SMIC net ne vient que du serveur : sans lui, on préfère le silence à
    // une comparaison faite sur le SMIC brut, qui déclencherait « salaire
    // minimum » jusqu'à ~2 054 € net.
    renderSimulator(null);

    await user().type(field(/Salaire brut/), "2875");
    await flush();

    await waitFor(() => {
      expect(
        digits(field(/Coût total employeur/).getAttribute("value") ?? "")
      ).toBe("3800,80");
    });
    expect(
      screen.queryByTestId("brut-net-message-salaire-minimum")
    ).not.toBeInTheDocument();
    expect(
      screen.queryByTestId("brut-net-message-primes-conventionnelles")
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

  it("compte les changements de période et de contrat", async () => {
    // Sans ces deux-là, impossible de dire si les réglages de la colonne de
    // droite servent ou s'ils occupent de la place pour rien.
    renderSimulator();

    await user().click(screen.getByRole("radio", { name: "Montant annuel" }));
    await user().selectOptions(
      screen.getByRole("combobox", { name: /Type de contrat/ }),
      "apprentissage"
    );

    expect(eventsOf("brut_net_changement_periode")).toEqual([
      {
        category: "outil",
        action: "brut_net_changement_periode",
        name: "annee",
      },
    ]);
    expect(eventsOf("brut_net_changement_contrat")).toEqual([
      {
        category: "outil",
        action: "brut_net_changement_contrat",
        name: "apprentissage",
      },
    ]);
  });

  it("compte un calcul abouti une seule fois, avec le champ de départ", async () => {
    // C'est le dénominateur du parcours : rapporté aux saisies, il dit combien
    // d'usagers obtiennent vraiment un résultat.
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();
    await waitFor(() =>
      expect(eventsOf("brut_net_calcul_reussi")).toHaveLength(1)
    );

    // Un second calcul dans la même visite ne le recompte pas.
    await user().type(field(/Salaire brut/), "0");
    await flush();

    expect(eventsOf("brut_net_calcul_reussi")).toEqual([
      {
        category: "outil",
        action: "brut_net_calcul_reussi",
        name: "salaire_brut",
      },
    ]);
  });

  it("n'annonce pas de calcul abouti quand l'appel échoue", async () => {
    evaluateSalaryMock.mockRejectedValue(
      new UrssafEvaluationError("boom", "500")
    );
    renderSimulator();

    await user().type(field(/Salaire brut/), "2875");
    await flush();

    await waitFor(() =>
      expect(eventsOf("brut_net_erreur_api")).toHaveLength(1)
    );
    expect(eventsOf("brut_net_calcul_reussi")).toEqual([]);
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

  it("préremplit en €/mois même quand la page affiche des montants annuels", async () => {
    // Le simulateur URSSAF ne lit qu'un montant mensuel : passer le brut annuel
    // tel quel l'ouvrirait sur un salaire douze fois trop élevé.
    evaluateSalaryMock.mockResolvedValue(ANNUAL_RESULTS);
    renderSimulator();

    await user().click(screen.getByRole("radio", { name: "Montant annuel" }));
    await user().type(field(/Salaire brut/), "34500");
    await flush();

    await waitFor(() => {
      const url = new URL(
        screen
          .getByTestId("brut-net-lien-urssaf")
          .getAttribute("href") as string
      );
      expect(url.searchParams.get("salarié . contrat . salaire brut")).toBe(
        "2875€/mois"
      );
      expect(url.searchParams.get("unité")).toBe("€/an");
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
