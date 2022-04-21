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

const onUserAction = () => {
  /* stub */
};

const selectedAgreement: Agreement = {
  id: "KALICONT000044594539",
  url: "hello.com",
  num: 3239,
  shortTitle: "Particuliers employeurs et emploi à domicile",
  slug: "3239-particuliers-employeurs-et-emploi-a-domicile",
  title: "Particuliers employeurs et emploi à domicile",
};

const dataWithoutSelectedAgreement: Props = {
  onSelectAgreement,
  onUserAction,
  supportedAgreements: [],
};

const dataWithSelectedAgreement: Props = {
  ...dataWithoutSelectedAgreement,
  selectedAgreement,
};

const dataWithSelectedAgreementNotSupported: Props = {
  ...dataWithoutSelectedAgreement,
  selectedAgreement,
  supportedAgreements: [],
};
const dataWithSelectedAgreementNotSupportedWithCustomText: Props = {
  ...dataWithoutSelectedAgreement,
  selectedAgreement,
  supportedAgreements: [],
  alertCCUnsupported: (url: string) => (
    <p>This is my custom text with the url: {url}</p>
  ),
};

const dataWithSelectedAgreementNotFullySupported: Props = {
  ...dataWithoutSelectedAgreement,
  selectedAgreement,
  supportedAgreements: [
    {
      fullySupported: false,
      idcc: selectedAgreement.num,
    },
  ],
};

const dataWithSelectedAgreementSupported: Props = {
  ...dataWithoutSelectedAgreement,
  selectedAgreement,
  supportedAgreements: [
    {
      fullySupported: true,
      idcc: selectedAgreement.num,
    },
  ],
};

describe("AgreementSearch", () => {
  describe("no selected agreement", () => {
    it("should render the mandatory question 'Précisez et sélectionnez votre convention collective'", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          props={dataWithoutSelectedAgreement}
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
          props={dataWithoutSelectedAgreement}
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
          props={dataWithoutSelectedAgreement}
        />
      );
      getByText("Submit").click();
      expect(
        getByText(/Vous devez séléctionner une convention collective/)
      ).toBeDefined();
    });
  });

  describe("selected agreement", () => {
    it("should render the text 'Vous avez sélectionné la convention collective'", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          props={dataWithSelectedAgreement}
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
          props={dataWithSelectedAgreement}
        />
      );
      expect(getByText(selectedAgreement.shortTitle)).toBeInTheDocument();
    });

    it("should show a button to remove the selection", () => {
      const { getByRole } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          props={dataWithSelectedAgreement}
        />
      );
      const button = getByRole("button", { name: "Fermer" });
      expect(button).toBeInTheDocument();
    });

    it("should invite the user to click on next to continue the simulation", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          props={dataWithSelectedAgreement}
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
          props={dataWithSelectedAgreement}
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
          props={dataWithSelectedAgreement}
        />
      );
      const button = getByRole("button", { name: "Fermer" });
      button.click();
      expect(onSelectAgreement.mock.calls).toHaveLength(1);
      expect(onSelectAgreement.mock.calls[0][0]).toBeNull();
    });
  });

  describe("selected agreement not supported / not fully supported", () => {
    it("should render a warning about the not supported agreement", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          props={dataWithSelectedAgreementNotSupported}
        />
      );
      expect(
        getByText(/Convention collective non traitée/)
      ).toBeInTheDocument();
    });
    it("should render custom text is alertCCUnsupported is provided", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          props={dataWithSelectedAgreementNotSupportedWithCustomText}
        />
      );
      expect(
        getByText(/This is my custom text with the url: hello.com/)
      ).toBeInTheDocument();
    });
  });

  describe("selected agreement not fully supported", () => {
    it("should render a warning about the not fully supported agreement", () => {
      const { getByText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          props={dataWithSelectedAgreementNotFullySupported}
        />
      );
      expect(getByText(/Convention prochainement traitée/)).toBeInTheDocument();
    });
  });

  describe("selected agreement supported", () => {
    it("should not render a warning", () => {
      const { queryByText } = render(
        <EmbeddedForm<Props>
          Step={AgreementSearch}
          props={dataWithSelectedAgreementSupported}
        />
      );
      expect(
        queryByText(/Convention collective non traitée/)
      ).not.toBeInTheDocument();
      expect(
        queryByText(/Convention prochainement traitée/)
      ).not.toBeInTheDocument();
    });
  });
});
