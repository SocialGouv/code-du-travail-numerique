import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AccordsEntreprise } from "../index";
import { EntrepriseAccordsResponse } from "../../../../../api/modules/accords/types";
import { sendEvent } from "@socialgouv/matomo-next";
import { usePathname } from "next/navigation";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

// La catégorie et le chemin de l'event sont déduits de la route courante : les
// accords d'entreprise s'affichent depuis une page de convention collective.
const PAGE = "/convention-collective/1486";
const PATH = "convention-collective/1486";

beforeEach(() => {
  (usePathname as jest.Mock).mockReturnValue(PAGE);
});

const mockFetch = (data: EntrepriseAccordsResponse) => {
  window.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: jest.fn().mockResolvedValue(data),
  }) as unknown as typeof fetch;
};

const mockFetchError = () => {
  window.fetch = jest
    .fn()
    .mockRejectedValue(new Error("Network error")) as unknown as typeof fetch;
};

const mockFetchHttpError = (status = 500) => {
  window.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status,
    json: jest.fn().mockResolvedValue({ message: "Internal Server Error" }),
  }) as unknown as typeof fetch;
};

const accordsData: EntrepriseAccordsResponse = {
  total: 2,
  accords: [
    {
      id: "ACCORD_1",
      title: "Accord sur le télétravail",
      dateSignature: "01/01/2023",
    },
    {
      id: "ACCORD_2",
      title: "Accord sur les salaires",
      dateSignature: "15/06/2023",
    },
  ],
};

describe("AccordsEntreprise", () => {
  it("affiche le spinner pendant le chargement", () => {
    window.fetch = jest.fn(
      () => new Promise(() => {})
    ) as unknown as typeof fetch;
    render(<AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />);
    expect(
      screen.getByText("Chargement des accords en cours")
    ).toBeInTheDocument();
  });

  it("affiche une erreur si le fetch échoue", async () => {
    mockFetchError();
    await act(async () => {
      render(<AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />);
    });
    expect(
      screen.getByText("Erreur lors du chargement des accords d'entreprise")
    ).toBeInTheDocument();
  });

  it("affiche une erreur (sans planter) si l'API renvoie une erreur HTTP, ex 500 PISTE", async () => {
    mockFetchHttpError(500);
    const onLoaded = jest.fn();
    await act(async () => {
      render(<AccordsEntreprise siret="12345678901234" onLoaded={onLoaded} />);
    });
    expect(
      screen.getByText("Erreur lors du chargement des accords d'entreprise")
    ).toBeInTheDocument();
    // le compteur reste à 0 (et non `undefined`) pour ne pas corrompre
    // le titre "X conventions ... et Y accords trouvés" du composant parent
    expect(onLoaded).toHaveBeenCalledWith(0);
  });

  it("affiche un message si aucun accord n'est trouvé", async () => {
    mockFetch({ total: 0, accords: [] });
    await act(async () => {
      render(<AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />);
    });
    expect(
      screen.getByText("Aucun accord d'entreprise trouvé")
    ).toBeInTheDocument();
  });

  it("affiche les cartes AccordCard pour chaque accord", async () => {
    mockFetch(accordsData);
    await act(async () => {
      render(<AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />);
    });
    expect(screen.getByText("Accord sur le télétravail")).toBeInTheDocument();
    expect(screen.getByText("Accord sur les salaires")).toBeInTheDocument();
  });

  it("affiche le lien vers Légifrance avec le siret", async () => {
    mockFetch(accordsData);
    await act(async () => {
      render(<AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />);
    });
    expect(
      screen.getByRole("link", {
        name: "Voir tous les accords sur Légifrance",
      })
    ).toHaveAttribute(
      "href",
      "https://www.legifrance.gouv.fr/search?typeRecherche=date&fonds=ACCO&searchField=ALL&searchType=ALL&typePagination=DEFAUT&siret=12345678901234&sortValue=PERTINENCE&pageSize=25&page=1"
    );
  });

  it("appelle fetch avec le bon siret", async () => {
    mockFetch(accordsData);
    await act(async () => {
      render(<AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />);
    });
    expect(window.fetch).toHaveBeenCalledWith(
      "/api/enterprises/accords/12345678901234"
    );
  });

  it("recharge les accords quand le siret change", async () => {
    mockFetch(accordsData);
    let rerender: (ui: React.ReactElement) => void;
    await act(async () => {
      ({ rerender } = render(
        <AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />
      ));
    });
    expect(window.fetch).toHaveBeenCalledWith(
      "/api/enterprises/accords/12345678901234"
    );

    await act(async () => {
      rerender(
        <AccordsEntreprise siret="98765432101234" onLoaded={() => {}} />
      );
    });
    expect(window.fetch).toHaveBeenCalledWith(
      "/api/enterprises/accords/98765432101234"
    );
  });

  describe("tracking matomo", () => {
    beforeEach(() => {
      (sendEvent as jest.Mock).mockClear();
    });

    // `sendEvent` porte aussi les clics sur les accords : on isole le seul
    // event de comptage pour pouvoir compter les envois.
    const showAccordsEvents = () =>
      (sendEvent as jest.Mock).mock.calls
        .map(([event]) => event)
        .filter((event) => event.action === "show_enterprise_accords");

    const showAccordsEvent = (count: number) => ({
      category: "convention-collective",
      action: "show_enterprise_accords",
      name: `{"path":"${PATH}","count":${count}}`,
      value: count,
    });

    // Cas réel signalé : la fiche Carrefour affiche « 19 accords d'entreprise
    // trouvés » alors que l'API n'en renvoie que 5 (ACCORDS_MAX_RESULTS). Le
    // compteur suivi doit être `total`, la même valeur que celle affichée par
    // le parent — jamais la longueur de la liste.
    it("émet le total renvoyé par l'API, pas le nombre d'accords affichés", async () => {
      mockFetch({ total: 19, accords: accordsData.accords });
      const onLoaded = jest.fn();
      await act(async () => {
        render(
          <AccordsEntreprise siret="45132133500023" onLoaded={onLoaded} />
        );
      });

      expect(onLoaded).toHaveBeenCalledWith(19);
      expect(showAccordsEvents()).toEqual([showAccordsEvent(19)]);
    });

    // Sans cette garde, un compteur gonflé par des envois multiples ferait
    // douter des chiffres remontés dans Matomo.
    it("n'émet qu'un seul event quand le composant se re-rend avec le même siret", async () => {
      mockFetch(accordsData);
      let rerender: (ui: React.ReactElement) => void;
      await act(async () => {
        ({ rerender } = render(
          <AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />
        ));
      });
      await act(async () => {
        rerender(
          <AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />
        );
      });

      expect(showAccordsEvents()).toHaveLength(1);
    });

    it("émet un nouvel event, avec le nouveau total, quand le siret change", async () => {
      mockFetch(accordsData);
      let rerender: (ui: React.ReactElement) => void;
      await act(async () => {
        ({ rerender } = render(
          <AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />
        ));
      });
      mockFetch({ total: 0, accords: [] });
      await act(async () => {
        rerender(
          <AccordsEntreprise siret="98765432101234" onLoaded={() => {}} />
        );
      });

      expect(showAccordsEvents()).toEqual([
        showAccordsEvent(2),
        showAccordsEvent(0),
      ]);
    });

    it("émet emitShowAccords avec le nombre d'accords au chargement", async () => {
      mockFetch(accordsData);
      await act(async () => {
        render(
          <AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />
        );
      });
      expect(sendEvent).toHaveBeenCalledWith({
        category: "convention-collective",
        action: "show_enterprise_accords",
        name: `{"path":"${PATH}","count":2}`,
        value: 2,
      });
    });

    it("émet emitShowAccords avec 0 quand aucun accord n'est trouvé", async () => {
      mockFetch({ total: 0, accords: [] });
      await act(async () => {
        render(
          <AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />
        );
      });
      // Le seau zéro : c'est lui que l'ancien schéma perdait — `name: "0"` est
      // falsy en PHP, Matomo comptait l'event et jetait le nom (76 % des
      // show_accords arrivaient sans nom en production). Dans l'enveloppe JSON
      // il survit. `value: 0` seule ne suffirait pas : Matomo ne l'enregistre
      // pas davantage (matomo-org/matomo#11204).
      expect(sendEvent).toHaveBeenCalledWith({
        category: "convention-collective",
        action: "show_enterprise_accords",
        name: `{"path":"${PATH}","count":0}`,
        value: 0,
      });
    });

    it("émet emitLoadAccordsFailed avec le siret en cas d'erreur", async () => {
      mockFetchError();
      await act(async () => {
        render(
          <AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />
        );
      });
      expect(sendEvent).toHaveBeenCalledWith({
        category: "convention-collective",
        action: "load_enterprise_accords_failed",
        name: `{"path":"${PATH}","siret":"12345678901234"}`,
      });
    });

    it("émet emitClickSeeAll avec le siret au clic sur 'Voir tous les accords'", async () => {
      mockFetch(accordsData);
      await act(async () => {
        render(
          <AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />
        );
      });
      (sendEvent as jest.Mock).mockClear();
      const link = screen.getByRole("link", {
        name: "Voir tous les accords sur Légifrance",
      });
      await userEvent.click(link);
      expect(sendEvent).toHaveBeenCalledWith({
        category: "convention-collective",
        action: "click_all_enterprise_accords",
        name: `{"path":"${PATH}","siret":"12345678901234"}`,
      });
    });

    it("émet emitClickAccord avec l'id de l'accord au clic sur une carte", async () => {
      mockFetch(accordsData);
      await act(async () => {
        render(
          <AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />
        );
      });
      (sendEvent as jest.Mock).mockClear();
      const cardLink = screen.getByRole("link", {
        name: /Accord sur le télétravail/,
      });
      await userEvent.click(cardLink);
      expect(sendEvent).toHaveBeenCalledWith({
        category: "convention-collective",
        action: "click_enterprise_accord",
        name: `{"path":"${PATH}","target":"ACCORD_1"}`,
      });
    });
  });
});
