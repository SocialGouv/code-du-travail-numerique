import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { AccordsEntreprise } from "../index";
import { EntrepriseAccordsResponse } from "../../../../../api/modules/accords/types";
import { sendEvent } from "@socialgouv/matomo-next";
import { TrackingAccordEntrepriseSearchAction } from "../tracking";
import { TrackingAgreementSearchCategory } from "../../../../convention-collective/tracking";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

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

    it("émet emitShowAccords avec le nombre d'accords au chargement", async () => {
      mockFetch(accordsData);
      await act(async () => {
        render(
          <AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />
        );
      });
      expect(sendEvent).toHaveBeenCalledWith({
        category: TrackingAgreementSearchCategory.ACCORD_ENTERPRISE_SEARCH,
        action: TrackingAccordEntrepriseSearchAction.SHOW_ACCORDS,
        name: "2",
      });
    });

    it("émet emitShowAccords avec 0 quand aucun accord n'est trouvé", async () => {
      mockFetch({ total: 0, accords: [] });
      await act(async () => {
        render(
          <AccordsEntreprise siret="12345678901234" onLoaded={() => {}} />
        );
      });
      expect(sendEvent).toHaveBeenCalledWith({
        category: TrackingAgreementSearchCategory.ACCORD_ENTERPRISE_SEARCH,
        action: TrackingAccordEntrepriseSearchAction.SHOW_ACCORDS,
        name: "0",
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
        category: TrackingAgreementSearchCategory.ACCORD_ENTERPRISE_SEARCH,
        action: TrackingAccordEntrepriseSearchAction.LOAD_ACCORDS_FAILED,
        name: "12345678901234",
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
        category: TrackingAgreementSearchCategory.ACCORD_ENTERPRISE_SEARCH,
        action: TrackingAccordEntrepriseSearchAction.CLICK_ALL_ACCORDS,
        name: "12345678901234",
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
        category: TrackingAgreementSearchCategory.ACCORD_ENTERPRISE_SEARCH,
        action: TrackingAccordEntrepriseSearchAction.CLICK_ACCORD,
        name: "ACCORD_1",
      });
    });
  });
});
