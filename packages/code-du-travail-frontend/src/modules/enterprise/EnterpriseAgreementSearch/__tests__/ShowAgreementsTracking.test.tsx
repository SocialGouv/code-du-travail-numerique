import { act, render, screen } from "@testing-library/react";
import React from "react";
import { sendEvent } from "@socialgouv/matomo-next";

import { EnterpriseAgreementSearchInput } from "../EnterpriseAgreementSearchInput";
import { EnterpriseAgreementSelectionLink } from "../EnterpriseAgreementSelectionLink";
import { TrackingEnterpriseAgreementSearchAction } from "../tracking";
import { TrackingAgreementSearchCategory } from "../../../convention-collective/tracking";
import { UserAction } from "src/modules/outils/common/utils/UserAction";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useSearchParams: jest.fn(),
}));

jest.mock("../accords", () => ({
  AccordsEntreprise: () => null,
}));

jest.mock("../../queries");

const agreement2216 = {
  id: "2216",
  contributions: true,
  num: 2216,
  shortTitle: "Commerce de détail et de gros à prédominance alimentaire",
  title: "Commerce de détail et de gros à prédominance alimentaire",
  url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=1",
  slug: "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
};

const agreement1486 = {
  id: "1486",
  contributions: true,
  num: 1486,
  shortTitle: "Bureaux d'études techniques",
  title: "Bureaux d'études techniques",
  url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=2",
  slug: "1486-bureaux-detudes-techniques",
};

const buildEnterprise = (siret: string, conventions: unknown[]) =>
  ({
    label: "CARREFOUR PROXIMITE FRANCE",
    simpleLabel: "CARREFOUR PROXIMITE FRANCE",
    highlightLabel: "CARREFOUR PROXIMITE FRANCE",
    activitePrincipale: "47.11F - Hypermarchés",
    address: "ZI ROUTE DE PARIS 14120 MONDEVILLE",
    etablissements: 1,
    matching: 1,
    matchingEtablissementCount: 1,
    siren: siret.slice(0, 9),
    siret,
    conventions,
  }) as any;

const enterpriseWithTwoAgreements = buildEnterprise("45132133500023", [
  agreement2216,
  agreement1486,
]);
const enterpriseWithOneAgreement = buildEnterprise("34513048800013", [
  agreement2216,
]);
const enterpriseWithoutAgreement = buildEnterprise("11111111100011", []);

// `sendEvent` porte aussi enterprise_select et cc_select_p2 : on isole les
// seuls events de comptage pour que les assertions restent lisibles.
const showAgreementsEvents = () =>
  (sendEvent as jest.Mock).mock.calls
    .map(([event]) => event)
    .filter(
      (event) =>
        event.action === TrackingEnterpriseAgreementSearchAction.SHOW_AGREEMENTS
    );

describe("Event show_agreements", () => {
  beforeEach(() => {
    (sendEvent as jest.Mock).mockClear();
  });

  describe("<EnterpriseAgreementSearchInput /> (simulateurs et contributions)", () => {
    const renderInput = async (enterprise: unknown) =>
      act(async () =>
        render(
          <EnterpriseAgreementSearchInput
            enterprise={enterprise as any}
            onAgreementSelect={jest.fn()}
            trackingActionName="Trouver sa convention collective"
            level={2}
          />
        )
      );

    it("émet le nombre de conventions collectives affichées", async () => {
      await renderInput(enterpriseWithTwoAgreements);

      expect(showAgreementsEvents()).toEqual([
        {
          category: TrackingAgreementSearchCategory.CC_ENTERPRISE_SEARCH,
          action: TrackingEnterpriseAgreementSearchAction.SHOW_AGREEMENTS,
          name: "2",
        },
      ]);
    });

    it("émet 0 quand l'entreprise n'a déclaré aucune convention collective", async () => {
      await renderInput(enterpriseWithoutAgreement);

      expect(showAgreementsEvents()).toEqual([
        {
          category: TrackingAgreementSearchCategory.CC_ENTERPRISE_SEARCH,
          action: TrackingEnterpriseAgreementSearchAction.SHOW_AGREEMENTS,
          name: "0",
        },
      ]);
    });

    it("émet 1 pour une entreprise à convention unique, malgré l'auto-sélection", async () => {
      await renderInput(enterpriseWithOneAgreement);

      expect(showAgreementsEvents()).toHaveLength(1);
      expect(showAgreementsEvents()[0].name).toBe("1");
    });

    it("n'émet pas de doublon quand l'usager change de convention collective", async () => {
      await renderInput(enterpriseWithTwoAgreements);
      const userAction = new UserAction();

      await act(async () => {
        userAction.click(
          screen.getByLabelText(/Bureaux d'études techniques IDCC 1486/)
        );
      });
      await act(async () => {
        userAction.click(
          screen.getByLabelText(
            /Commerce de détail et de gros à prédominance alimentaire IDCC 2216/
          )
        );
      });

      // Les clics ont bien été pris en compte (cc_select_p2 part à chaque
      // sélection) : sans cette assertion, le test passerait à vide si les
      // libellés de radio changeaient.
      expect(
        (sendEvent as jest.Mock).mock.calls
          .map(([event]) => event)
          .filter(
            (event) =>
              event.category === TrackingAgreementSearchCategory.CC_SELECT_P2
          )
      ).toHaveLength(2);
      expect(showAgreementsEvents()).toHaveLength(1);
    });

    it("émet un nouvel event quand l'usager change d'entreprise", async () => {
      let rerender: (ui: React.ReactElement) => void;
      await act(async () => {
        ({ rerender } = render(
          <EnterpriseAgreementSearchInput
            enterprise={enterpriseWithTwoAgreements}
            onAgreementSelect={jest.fn()}
            trackingActionName="Trouver sa convention collective"
            level={2}
          />
        ));
      });

      await act(async () => {
        rerender(
          <EnterpriseAgreementSearchInput
            enterprise={enterpriseWithoutAgreement}
            onAgreementSelect={jest.fn()}
            trackingActionName="Trouver sa convention collective"
            level={2}
          />
        );
      });

      expect(showAgreementsEvents().map(({ name }) => name)).toEqual([
        "2",
        "0",
      ]);
    });
  });

  // Le parcours simulateur passe `isInSimulator` et
  // `canContinueSimulationIfNoAgreement` (cf. CommonAgreementStep) : ces props
  // changent le rendu — avec moins de deux conventions, le composant
  // court-circuite le formulaire de sélection. Le comptage doit partir malgré
  // ce court-circuit.
  describe("<EnterpriseAgreementSearchInput isInSimulator /> (simulateurs)", () => {
    const renderInSimulator = async (enterprise: unknown) =>
      act(async () =>
        render(
          <EnterpriseAgreementSearchInput
            enterprise={enterprise as any}
            onAgreementSelect={jest.fn()}
            trackingActionName="Simulateur - Indemnité de licenciement"
            isInSimulator
            canContinueSimulationIfNoAgreement
            level={3}
          />
        )
      );

    it("émet le nombre de conventions collectives affichées", async () => {
      await renderInSimulator(enterpriseWithTwoAgreements);

      expect(showAgreementsEvents()).toEqual([
        {
          category: TrackingAgreementSearchCategory.CC_ENTERPRISE_SEARCH,
          action: TrackingEnterpriseAgreementSearchAction.SHOW_AGREEMENTS,
          name: "2",
        },
      ]);
    });

    it("émet 1 pour une convention unique, malgré le court-circuit du formulaire", async () => {
      await renderInSimulator(enterpriseWithOneAgreement);

      expect(showAgreementsEvents().map(({ name }) => name)).toEqual(["1"]);
    });

    it("émet 0 quand l'entreprise n'a déclaré aucune convention collective", async () => {
      await renderInSimulator(enterpriseWithoutAgreement);

      expect(showAgreementsEvents().map(({ name }) => name)).toEqual(["0"]);
    });
  });

  describe("<EnterpriseAgreementSelectionLink /> (page dédiée et widget)", () => {
    it("émet le nombre de conventions collectives au montage", async () => {
      await act(async () => {
        render(
          <EnterpriseAgreementSelectionLink
            enterprise={enterpriseWithTwoAgreements}
            level={2}
          />
        );
      });

      expect(showAgreementsEvents()).toEqual([
        {
          category: TrackingAgreementSearchCategory.CC_ENTERPRISE_SEARCH,
          action: TrackingEnterpriseAgreementSearchAction.SHOW_AGREEMENTS,
          name: "2",
        },
      ]);
    });

    it("émet 0 quand l'entreprise n'a déclaré aucune convention collective", async () => {
      await act(async () => {
        render(
          <EnterpriseAgreementSelectionLink
            enterprise={enterpriseWithoutAgreement}
            level={2}
          />
        );
      });

      expect(showAgreementsEvents()).toEqual([
        {
          category: TrackingAgreementSearchCategory.CC_ENTERPRISE_SEARCH,
          action: TrackingEnterpriseAgreementSearchAction.SHOW_AGREEMENTS,
          name: "0",
        },
      ]);
    });
  });
});
