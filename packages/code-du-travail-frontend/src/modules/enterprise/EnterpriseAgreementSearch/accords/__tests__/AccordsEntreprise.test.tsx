import { act, render, screen } from "@testing-library/react";
import React from "react";
import { AccordsEntreprise } from "../index";
import { EntrepriseAccordsResponse } from "../../../../../api/modules/accords/types";

const mockFetch = (data: EntrepriseAccordsResponse) => {
  window.fetch = jest.fn().mockResolvedValue({
    json: jest.fn().mockResolvedValue(data),
  }) as unknown as typeof fetch;
};

const mockFetchError = () => {
  window.fetch = jest
    .fn()
    .mockRejectedValue(new Error("Network error")) as unknown as typeof fetch;
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
    render(<AccordsEntreprise siret="12345678901234" />);
    expect(
      screen.getByText("Chargement des accords en cours")
    ).toBeInTheDocument();
  });

  it("affiche une erreur si le fetch échoue", async () => {
    mockFetchError();
    await act(async () => {
      render(<AccordsEntreprise siret="12345678901234" />);
    });
    expect(
      screen.getByText("Erreur lors du chargement des accords d'entreprise")
    ).toBeInTheDocument();
  });

  it("affiche un message si aucun accord n'est trouvé", async () => {
    mockFetch({ total: 0, accords: [] });
    await act(async () => {
      render(<AccordsEntreprise siret="12345678901234" />);
    });
    expect(
      screen.getByText("Aucun accord d'entreprise trouvé")
    ).toBeInTheDocument();
  });

  it("affiche le nombre d'accords au pluriel", async () => {
    mockFetch(accordsData);
    await act(async () => {
      render(<AccordsEntreprise siret="12345678901234" />);
    });
    expect(
      screen.getByText(/2 accords d'entreprise trouvés/)
    ).toBeInTheDocument();
  });

  it("affiche le nombre d'accords au singulier", async () => {
    mockFetch({ total: 1, accords: [accordsData.accords[0]] });
    await act(async () => {
      render(<AccordsEntreprise siret="12345678901234" />);
    });
    expect(
      screen.getByText(/1 accord d'entreprise trouvé/)
    ).toBeInTheDocument();
  });

  it("affiche les cartes AccordCard pour chaque accord", async () => {
    mockFetch(accordsData);
    await act(async () => {
      render(<AccordsEntreprise siret="12345678901234" />);
    });
    expect(screen.getByText("Accord sur le télétravail")).toBeInTheDocument();
    expect(screen.getByText("Accord sur les salaires")).toBeInTheDocument();
  });

  it("affiche le lien vers Légifrance avec le siret", async () => {
    mockFetch(accordsData);
    await act(async () => {
      render(<AccordsEntreprise siret="12345678901234" />);
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
      render(<AccordsEntreprise siret="12345678901234" />);
    });
    expect(window.fetch).toHaveBeenCalledWith(
      "/api/enterprises/accords/12345678901234"
    );
  });

  it("recharge les accords quand le siret change", async () => {
    mockFetch(accordsData);
    let rerender: (ui: React.ReactElement) => void;
    await act(async () => {
      ({ rerender } = render(<AccordsEntreprise siret="12345678901234" />));
    });
    expect(window.fetch).toHaveBeenCalledWith(
      "/api/enterprises/accords/12345678901234"
    );

    await act(async () => {
      rerender(<AccordsEntreprise siret="98765432101234" />);
    });
    expect(window.fetch).toHaveBeenCalledWith(
      "/api/enterprises/accords/98765432101234"
    );
  });
});
