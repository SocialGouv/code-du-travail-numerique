import { act, render, screen } from "@testing-library/react";
import React from "react";
import { sendEvent } from "@socialgouv/matomo-next";

import { EnterpriseAgreementSearchInput } from "../EnterpriseAgreementSearchInput";
import { EnterpriseAgreementSelectionLink } from "../EnterpriseAgreementSelectionLink";
import { usePathname } from "next/navigation";
import { UserAction } from "src/modules/outils/common/utils/UserAction";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

// La catégorie et le chemin viennent de la route courante.
const PAGE = "/outils/convention-collective";
const PATH = "outils/convention-collective";

// Event attendu pour un nombre de conventions donné. `count` est dans le payload
// JSON ET dans `value` : le payload fait foi (Matomo jette un nom falsy comme
// "0" et n'enregistre pas une value de 0), `value` n'est qu'un doublon
// d'agrégation.
const showAgreementsEvent = (count: number) => ({
  category: "outil",
  action: "show_enterprise_agreements",
  name: `{"path":"${PATH}","count":${count}}`,
  value: count,
});

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
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
    .filter((event) => event.action === "show_enterprise_agreements");

describe("Event show_agreements", () => {
  beforeEach(() => {
    (sendEvent as jest.Mock).mockClear();
    (usePathname as jest.Mock).mockReturnValue(PAGE);
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

      expect(showAgreementsEvents()).toEqual([showAgreementsEvent(2)]);
    });

    it("émet 0 quand l'entreprise n'a déclaré aucune convention collective", async () => {
      await renderInput(enterpriseWithoutAgreement);

      expect(showAgreementsEvents()).toEqual([showAgreementsEvent(0)]);
    });

    it("émet 1 pour une entreprise à convention unique, malgré l'auto-sélection", async () => {
      await renderInput(enterpriseWithOneAgreement);

      expect(showAgreementsEvents()).toHaveLength(1);
      expect(showAgreementsEvents()[0]).toEqual(showAgreementsEvent(1));
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
          .filter((event) => event.action === "select_agreement_p2")
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

      expect(showAgreementsEvents()).toEqual([
        showAgreementsEvent(2),
        showAgreementsEvent(0),
      ]);
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

      expect(showAgreementsEvents()).toEqual([showAgreementsEvent(2)]);
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

      expect(showAgreementsEvents()).toEqual([showAgreementsEvent(0)]);
    });
  });
});
