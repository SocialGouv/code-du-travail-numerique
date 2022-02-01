import { render } from "@testing-library/react";
import React from "react";

import { EmbeddedForm } from "../../../../../test/TestForm";
import { Agreement } from "../../../../conventions/Search/api/type";
import { AgreementSearch } from "../AgreementSearch";
import type { Props } from "../AgreementSearch/AgreementSearch";

const callback: (agreement: Agreement | null) => void = () => {
  /* nothing to do */
};
const onSelectAgreement = jest.fn(callback);

const selectedAgreement: Agreement = {
  id: "KALICONT000044594539",
  num: 3239,
  shortTitle: "Particuliers employeurs et emploi à domicile",
  slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
  title: "Particuliers employeurs et emploi à domicile",
};

const dataWithoutSelectedAgreement: Props = {
  onSelectAgreement,
  supportedAgreements: [],
};

const dataWithSelectedAgreement: Props = {
  ...dataWithoutSelectedAgreement,
  selectedAgreement,
};

describe("AgreementSearch", () => {
  describe("no selected agreement", () => {
    it("should render the mandatory question 'Précisez et sélectionnez votre convention collective'", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          data={dataWithoutSelectedAgreement}
        />
      );
      expect(
        getByText(/Précisez et sélectionnez votre convention collective/)
      ).toBeInTheDocument();
      expect(getByText("(champ obligatoire)")).toBeInTheDocument();
    });

    it("should show an input to search the agreement", () => {
      const { getByPlaceholderText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          data={dataWithoutSelectedAgreement}
        />
      );
      expect(
        getByPlaceholderText("Ex : Transports routiers ou 1486")
      ).toBeInTheDocument();
    });

    it("should show an error when submit without select an agreement", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          data={dataWithoutSelectedAgreement}
        />
      );
      getByText("Submit").click();
      expect(getByText(/Vous devez répondre à cette question/)).toBeDefined();
    });
  });

  describe("selected agreement", () => {
    it("should render the text 'Vous avez sélectionné la convention collective'", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          data={dataWithSelectedAgreement}
        />
      );
      expect(
        getByText(/Vous avez sélectionné la convention collective/)
      ).toBeInTheDocument();
    });

    it("should show the agreement short title", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          data={dataWithSelectedAgreement}
        />
      );
      expect(getByText(selectedAgreement.shortTitle)).toBeInTheDocument();
    });

    it("should show a button to remove the selection", () => {
      const { getByRole } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          data={dataWithSelectedAgreement}
        />
      );
      const button = getByRole("button", { name: "Fermer" });
      expect(button).toBeInTheDocument();
    });

    it("should invite the user to click on next to continue the simulation", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          data={dataWithSelectedAgreement}
        />
      );
      expect(
        getByText("Cliquez sur Suivant pour poursuivre la simulation.")
      ).toBeInTheDocument();
    });

    it("should not show an error when submit", () => {
      const { getByText, queryByText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          data={dataWithSelectedAgreement}
        />
      );
      getByText("Submit").click();
      expect(
        queryByText(/Vous devez répondre à cette question/)
      ).not.toBeInTheDocument();
    });

    it("should callback when user remove the selected agreement", () => {
      const { getByRole } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          data={dataWithSelectedAgreement}
        />
      );
      const button = getByRole("button", { name: "Fermer" });
      button.click();
      expect(onSelectAgreement.mock.calls).toHaveLength(1);
      expect(onSelectAgreement.mock.calls[0][0]).toBeNull();
    });
  });
});
