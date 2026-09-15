import { act, render, screen, waitFor } from "@testing-library/react";
import React from "react";

import { ContributionLayout } from "../ContributionLayout";
import { ui as ccUi } from "../../convention-collective/__tests__/ui";
import { Contribution } from "../type";
import {
  buildContributionEnterprisePath,
  getEnterpriseSearchFromLocation,
} from "../contributionUtils";

jest.mock("../../enterprise/queries");
jest.mock("../../convention-collective/search", () => ({
  searchAgreement: jest.fn(),
}));
jest.mock("@socialgouv/matomo-next", () => ({ sendEvent: jest.fn() }));
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
  useSearchParams: jest.fn(() => new URLSearchParams()),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn() }),
}));

const contribution = {
  source: "contributions",
  linkedContent: [],
  references: [],
  idcc: "0000",
  date: "05/12/2023",
  metas: { title: "SEO Title", description: "SEO Description" },
  title: "Heures supplémentaires",
  breadcrumbs: [],
  slug: "heures-supplementaires",
  type: "content",
  content: "my content",
  isGeneric: true,
  isNoCdt: false,
  ccSupported: ["2216"],
  ccUnextended: [],
} as Partial<Contribution> as Contribution;

const setLocation = (path: string) => window.history.replaceState({}, "", path);

describe("Arrivée sur la contribution avec ?entreprise= (fiche service-public)", () => {
  beforeEach(() => window.localStorage.clear());
  afterEach(() => setLocation("/"));

  it("construit et relit le paramètre", () => {
    setLocation(
      buildContributionEnterprisePath("heures-supplementaires", "Café")
    );
    expect(window.location.search).toBe("?entreprise=Caf%C3%A9");
    expect(getEnterpriseSearchFromLocation()).toBe("Café");
    setLocation("/contribution/heures-supplementaires?entreprise=+");
    expect(getEnterpriseSearchFromLocation()).toBeUndefined();
  });

  it("pré-coche le parcours entreprise, préremplit le champ et lance la recherche", async () => {
    setLocation("/contribution/heures-supplementaires?entreprise=carrefour");
    // La recherche est lancée au montage du champ entreprise : montage et
    // résolution de la promesse doivent se faire dans un même `act`, sinon
    // React ne flushe pas le rendu des résultats (setImmediate neutralisé par
    // le setup Jest).
    await act(async () => {
      render(<ContributionLayout contribution={contribution} />);
      await new Promise((resolve) => setTimeout(resolve, 0));
    });

    expect(ccUi.radio.enterpriseSearchOption.get()).toBeChecked();
    expect(ccUi.searchByEnterprise.input.get()).toHaveValue("carrefour");
    expect(
      ccUi.searchByEnterprise.resultLines.carrefour.title.get()
    ).toBeInTheDocument();
    // L'usager est amené directement aux résultats : focus et défilement sur
    // le titre « N entreprises trouvées ».
    const resultTitle = screen.getByTestId("result-title");
    expect(resultTitle).toHaveTextContent(/entreprises trouvées/);
    expect(resultTitle).toHaveFocus();
    expect(resultTitle.scrollIntoView).toHaveBeenCalled();
  });

  it("ne pré-coche rien sans paramètre", async () => {
    setLocation("/contribution/heures-supplementaires");
    render(<ContributionLayout contribution={contribution} />);

    await waitFor(() =>
      expect(ccUi.radio.enterpriseSearchOption.get()).toBeInTheDocument()
    );
    expect(ccUi.radio.enterpriseSearchOption.get()).not.toBeChecked();
    expect(ccUi.searchByEnterprise.input.query()).not.toBeInTheDocument();
  });
});
