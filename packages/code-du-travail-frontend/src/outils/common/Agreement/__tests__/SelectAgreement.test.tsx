import { render } from "@testing-library/react";
import React from "react";

import { EmbeddedInjectedForm } from "../../../../../test/TestForm";
import { Agreement } from "../../../../outils/types";
import { FormContent } from "../../type/WizardType";
import { SelectAgreement } from "../index";
import type { Props } from "../SelectAgreement";
import { Simulator } from "../../NoticeExample";

const selectedAgreement: Agreement = {
  id: "KALICONT000044594539",
  num: 3239,
  shortTitle: "Particuliers employeurs et emploi à domicile",
  slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
  title: "Particuliers employeurs et emploi à domicile",
  contributions: false,
};

describe("SelectAgreement", () => {
  describe("no preselected agreement  (in local storage)", () => {
    it("should render the form without prechecked option", () => {
      const { getByRole } = render(
        <EmbeddedInjectedForm<FormContent, Omit<Props, "form">>
          Step={SelectAgreement}
          props={{
            supportedAgreements: [],
            title: "Outil",
            simulator: Simulator.HEURES_RECHERCHE_EMPLOI,
          }}
        />
      );
      expect(
        getByRole("radio", {
          checked: false,
          name: /Je ne souhaite pas renseigner ma convention collective/,
        })
      ).toBeInTheDocument();
      expect(
        getByRole("radio", {
          checked: false,
          name: /Je sais quelle est ma convention collective/,
        })
      ).toBeInTheDocument();
      expect(
        getByRole("radio", {
          checked: false,
          name: /Je ne sais pas quelle est ma convention collective/,
        })
      ).toBeInTheDocument();
    });
    it("should not show skip option & show message if passed in param", () => {
      const { getByRole, getByText, queryByText } = render(
        <EmbeddedInjectedForm<FormContent, Omit<Props, "form">>
          Step={SelectAgreement}
          props={{
            supportedAgreements: [],
            title: "Outil",
            required: true,
            note: "This is my note",
            simulator: Simulator.HEURES_RECHERCHE_EMPLOI,
          }}
        />
      );
      expect(
        queryByText(/Je ne souhaite pas renseigner ma convention collective/)
      ).not.toBeInTheDocument();
      expect(
        getByRole("radio", {
          checked: false,
          name: /Je sais quelle est ma convention collective/,
        })
      ).toBeInTheDocument();
      expect(
        getByRole("radio", {
          checked: false,
          name: /Je ne sais pas quelle est ma convention collective/,
        })
      ).toBeInTheDocument();
      expect(getByText(/This is my note/)).toBeInTheDocument();
    });
  });

  describe("preselected agreement (in local storage)", () => {
    it("should render the route 'Je connais ma convention collective' by default with the selected agreements", () => {
      const { getByText, getByRole } = render(
        <EmbeddedInjectedForm<FormContent, Omit<Props, "form">>
          Step={SelectAgreement}
          props={{
            defaultSelectedAgreement: selectedAgreement,
            supportedAgreements: [],
            title: "Outil",
            simulator: Simulator.HEURES_RECHERCHE_EMPLOI,
          }}
        />
      );
      expect(
        getByRole("radio", {
          checked: true,
          name: /Je sais quelle est ma convention collective/,
        })
      ).toBeInTheDocument();
      expect(
        getByText(/Particuliers employeurs et emploi à domicile/)
      ).toBeInTheDocument();
    });
  });
});
