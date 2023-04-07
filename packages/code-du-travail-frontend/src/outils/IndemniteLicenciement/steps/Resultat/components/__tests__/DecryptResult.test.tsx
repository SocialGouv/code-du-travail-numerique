import { render } from "@testing-library/react";
import React from "react";
import DecryptResult from "../DecryptResult";

describe("<DecryptResult />", () => {
  it("should render with hasSelectedAgreement and isAgreementSupported and legalResult = 0 agreementResult=0", () => {
    const { queryByText } = render(
      <DecryptResult
        hasSelectedAgreement={true}
        isAgreementSupported={true}
        legalResult="0"
        agreementResult="0"
      />
    );
    expect(
      queryByText(
        /En l’absence de montant prévu par la convention collective, le montant de l’indemnité de licenciement à appliquer pour le salarié est donc le montant prévu par le code du travail./i
      )
    ).toBeInTheDocument();
  });
  it("should render with isAgreementSupported and legalResult = 0 agreementResult=0", () => {
    const { queryByText } = render(
      <DecryptResult
        hasSelectedAgreement={false}
        isAgreementSupported={true}
        legalResult="0"
        agreementResult="0"
      />
    );
    expect(
      queryByText(
        /La convention collective n’ayant pas été renseignée, le montant de l’indemnité de licenciement affiché correspond au montant prévu par le code du travail./i
      )
    ).toBeInTheDocument();
  });
  it("should render with legalResult = 0 agreementResult=0", () => {
    const { queryByText } = render(
      <DecryptResult
        hasSelectedAgreement={true}
        isAgreementSupported={false}
        legalResult="0"
        agreementResult="0"
      />
    );
    expect(
      queryByText(
        /La convention collective n’ayant pas été traitée par nos services, le montant de l’indemnité de licenciement affiché correspond au montant prévu par le code du travail./i
      )
    ).toBeInTheDocument();
  });

  it("should render with hasSelectedAgreement and isAgreementSupported legalResult = 0 agreementResult = 100", () => {
    const { queryByText } = render(
      <DecryptResult
        hasSelectedAgreement={true}
        isAgreementSupported={true}
        legalResult="0"
        agreementResult="100"
      />
    );
    expect(
      queryByText(
        /En l’absence de montant prévu par le code du travail, le montant de l’indemnité de licenciement à appliquer pour le salarié est donc le montant prévu par la convention collective./i
      )
    ).toBeInTheDocument();
  });

  it("should render with hasSelectedAgreement and isAgreementSupported legalResult = 10 agreementResult = 100", () => {
    const { queryByText } = render(
      <DecryptResult
        hasSelectedAgreement={true}
        isAgreementSupported={true}
        legalResult="10"
        agreementResult="100"
      />
    );
    expect(
      queryByText(
        /Le montant à retenir pour le salarié est celui prévu par la convention collective, celui-ci étant plus favorable que le montant prévu par le code du travail./i
      )
    ).toBeInTheDocument();
  });

  it("should render with hasSelectedAgreement and isAgreementSupported legalResult = 100 agreementResult = 10", () => {
    const { queryByText } = render(
      <DecryptResult
        hasSelectedAgreement={true}
        isAgreementSupported={true}
        legalResult="100"
        agreementResult="10"
      />
    );
    expect(
      queryByText(
        /Le montant à retenir pour le salarié est celui prévu par le code du travail, celui-ci étant plus favorable que le montant prévu par la convention collective./i
      )
    ).toBeInTheDocument();
  });

  it("should render with hasSelectedAgreement and isAgreementSupported legalResult = 100 agreementResult = 100", () => {
    const { queryByText } = render(
      <DecryptResult
        hasSelectedAgreement={true}
        isAgreementSupported={true}
        legalResult="100"
        agreementResult="100"
      />
    );
    expect(
      queryByText(
        /Le montant prévu par le code du travail est le même que celui prévu par la convention collective./i
      )
    ).toBeInTheDocument();
  });
});
