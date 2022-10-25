import { render } from "@testing-library/react";
import React from "react";
import AgreementInfo from "../AgreementInfo";

describe("<AgreementInfo />", () => {
  it("should render with hasSelectedAgreement and isAgreementSupported", () => {
    const { queryByText } = render(
      <AgreementInfo hasSelectedAgreement={true} isAgreementSupported={true} />
    );
    expect(
      queryByText(
        /Un accord d’entreprise, le contrat de travail ou un usage peut prévoir un montant plus favorable pour le salarié/i
      )
    ).toBeInTheDocument();
    expect(queryByText(/Une convention collective/i)).not.toBeInTheDocument();
  });

  it("should render with isAgreementSupported", () => {
    const { queryByText } = render(
      <AgreementInfo hasSelectedAgreement={false} isAgreementSupported={true} />
    );
    expect(queryByText(/Une convention collective/i)).toBeInTheDocument();
  });

  it("should render with hasSelectedAgreement", () => {
    const { queryByText } = render(
      <AgreementInfo hasSelectedAgreement={true} isAgreementSupported={false} />
    );
    expect(queryByText(/Une convention collective/i)).toBeInTheDocument();
  });

  it("should render without any elements", () => {
    const { queryByText } = render(
      <AgreementInfo
        hasSelectedAgreement={false}
        isAgreementSupported={false}
      />
    );
    expect(queryByText(/Une convention collective/i)).toBeInTheDocument();
  });
});
