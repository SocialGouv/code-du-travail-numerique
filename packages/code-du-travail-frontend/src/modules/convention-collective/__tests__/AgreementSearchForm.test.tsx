import { render, screen } from "@testing-library/react";
import React from "react";
import { wait } from "@testing-library/user-event/dist/utils";
import { searchEnterprises } from "../../enterprise";
import { UserAction } from "../../../common";
import { TrackingAgreementSearchAction } from "../tracking";
import { ui } from "./ui";
import { ui as enterpriseUi } from "../../enterprise/EnterpriseAgreementSearch/__tests__/ui";
import { sendEvent } from "../../utils";
import { AgreementSearchForm } from "../AgreementSearch/AgreementSearchForm";

jest.mock("../../utils", () => ({
  sendEvent: jest.fn(),
}));

jest.mock("uuid", () => ({
  v4: jest.fn(() => ""),
}));

jest.mock("../../enterprise/queries", () => ({
  searchEnterprises: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  redirect: jest.fn(),
  useSearchParams: jest.fn(),
  usePathname: jest.fn(),
}));

const enterprise1CC = {
  activitePrincipale:
    "Location-bail de propriété intellectuelle et de produits similaires, à l’exception des œuvres soumises à copyright",
  etablissements: 1294,
  highlightLabel: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
  label: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
  simpleLabel: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
  matching: 1294,
  siren: "345130488",
  address: "ZI ROUTE DE PARIS 14120 MONDEVILLE",
  firstMatchingEtablissement: {
    siret: "34513048802674",
    address: "N°6639 205 RUE SAINT-HONORE 75001 PARIS",
  },
  conventions: [
    {
      id: "2216",
      contributions: true,
      num: 2216,
      shortTitle: "Commerce de détail et de gros à prédominance alimentaire",
      title:
        "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.  Etendue par arrêté du 26 juillet 2002 JORF 6 août 2002.",
      url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
      slug: "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
    },
  ],
};

const enterpriseMoreCC = {
  activitePrincipale: "Autres intermédiations monétaires",
  etablissements: 2032,
  highlightLabel: "BNP PARIBAS (HELLO BANK!)",
  label: "BNP PARIBAS (HELLO BANK!)",
  simpleLabel: "BNP PARIBAS (HELLO BANK!)",
  matching: 2032,
  siren: "662042449",
  address: "16 BOULEVARD DES ITALIENS 75009 PARIS",
  firstMatchingEtablissement: {
    siret: "66204244908280",
    address: "ANGLE DE RUE 19 RUE DES LAVANDIERES 55 RUE DE RIVOLI 75001 PARIS",
  },
  conventions: [
    {
      id: "2120",
      contributions: true,
      num: 2120,
      shortTitle: "Banque",
      title:
        "Convention collective nationale de la banque du 10 janvier 2000.  Etendue par arrêté du 17 novembre 2004 JORF 11 décembre 2004.",
      url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635780",
      slug: "2120-banque",
    },
    {
      id: "9999",
      num: 9999,
      shortTitle: "___Sans convention collective___",
      title: "___Sans convention collective___",
      contributions: false,
    },
    {
      id: "2931",
      contributions: false,
      num: 2931,
      shortTitle: "Activités de marchés financiers",
      title:
        "Convention collective nationale des activités de marchés financiers du 11 juin 2010",
      url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000025496787",
      slug: "2931-activites-de-marches-financiers",
    },
  ],
};

describe("<PageContribution />", () => {
  let userAction: UserAction;
  it("should track when searching by enterprise name", async () => {
    render(
      <AgreementSearchForm
        trackingActionName={TrackingAgreementSearchAction.AGREEMENT_SEARCH}
        onAgreementSelect={() => {}}
      />
    );
    (searchEnterprises as jest.Mock).mockImplementation(() =>
      Promise.resolve([enterprise1CC])
    );
    userAction = new UserAction();
    userAction.click(ui.radio.enterpriseSearchOption.get());
    userAction.setInput(
      enterpriseUi.enterpriseAgreementSearch.input.get(),
      "carrefour"
    );
    userAction.click(enterpriseUi.enterpriseAgreementSearch.submitButton.get());
    await wait();
    expect(sendEvent).toHaveBeenCalledWith({
      action: "Trouver sa convention collective",
      category: "enterprise_search",
      name: '{"query":"carrefour"}',
      value: "",
    });
    expect(
      enterpriseUi.enterpriseAgreementSearch.resultLines.carrefour.title.query()
    ).toBeInTheDocument();
    userAction.click(
      enterpriseUi.enterpriseAgreementSearch.resultLines.carrefour.link.get()
    );
    expect(sendEvent).toHaveBeenCalledWith({
      action: "Trouver sa convention collective",
      category: "cc_select_p2",
      name: "idcc2216",
      value: "",
    });
    expect(sendEvent).toHaveBeenCalledWith({
      action: "Trouver sa convention collective",
      category: "enterprise_select",
      name: JSON.stringify({
        label: enterprise1CC.label,
        siren: enterprise1CC.siren,
      }),
      value: "",
    });
  });
  it("should track when searching by enterprise with multiple agreements", async () => {
    render(
      <AgreementSearchForm
        trackingActionName={TrackingAgreementSearchAction.AGREEMENT_SEARCH}
        onAgreementSelect={() => {}}
      />
    );
    (searchEnterprises as jest.Mock).mockImplementation(() =>
      Promise.resolve([enterpriseMoreCC])
    );
    userAction = new UserAction();
    userAction.click(ui.radio.enterpriseSearchOption.get());
    userAction.setInput(
      enterpriseUi.enterpriseAgreementSearch.input.get(),
      "bnp"
    );
    userAction.click(enterpriseUi.enterpriseAgreementSearch.submitButton.get());
    await wait();
    expect(sendEvent).toHaveBeenCalledWith({
      action: "Trouver sa convention collective",
      category: "enterprise_search",
      name: '{"query":"bnp"}',
      value: "",
    });
    expect(
      enterpriseUi.enterpriseAgreementSearch.resultLines.bnp.title.query()
    ).toBeInTheDocument();
    userAction.click(
      enterpriseUi.enterpriseAgreementSearch.resultLines.bnp.link.get()
    );
    userAction.click(
      enterpriseUi.enterpriseAgreementSearch.resultLines.bnp.ccList.idcc2120.get()
    );
    expect(sendEvent).toHaveBeenCalledWith({
      action: "Trouver sa convention collective",
      category: "cc_select_p2",
      name: "idcc2120",
      value: "",
    });
    expect(sendEvent).toHaveBeenCalledWith({
      action: "Trouver sa convention collective",
      category: "enterprise_select",
      name: JSON.stringify({
        label: enterpriseMoreCC.label,
        siren: enterpriseMoreCC.siren,
      }),
      value: "",
    });
    expect(
      enterpriseUi.enterpriseAgreementSearch.errorNotFound.notTreated.query()
    ).not.toBeInTheDocument();
    userAction.click(
      enterpriseUi.enterpriseAgreementSearch.resultLines.bnp.ccList.idcc9999.get()
    );
    expect(
      enterpriseUi.enterpriseAgreementSearch.errorNotFound.notTreated.query()
    ).toBeInTheDocument();
  });

  it("should track when selecting agreement 3239", () => {
    render(
      <AgreementSearchForm
        trackingActionName={TrackingAgreementSearchAction.AGREEMENT_SEARCH}
        onAgreementSelect={() => {}}
      />
    );
    userAction = new UserAction();
    userAction.click(ui.radio.enterpriseSearchOption.get());
    screen.debug();
    userAction.click(
      enterpriseUi.enterpriseAgreementSearch.childminder.title.get()
    );
    expect(sendEvent).toHaveBeenCalledWith({
      action: "select_je_n_ai_pas_d_entreprise",
      category: "cc_search_type_of_users",
      name: "Trouver sa convention collective",
    });
  });
});
