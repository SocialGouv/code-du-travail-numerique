import { render } from "@testing-library/react";
import React from "react";
import {
  MatomoBaseEvent,
  MatomoActionEvent,
  MatomoAgreementEvent,
} from "../../../../../lib";
import { push as matopush } from "@socialgouv/matomo-next";
import NotSupportedAgreementDisclaimer from "../NotSupportedAgreementDisclaimer";

jest.mock("@socialgouv/matomo-next", () => ({
  push: jest.fn(),
}));

describe("<NotSupportedAgreementDisclaimer />", () => {
  beforeEach(() => {
    const ma = matopush as jest.MockedFunction<typeof matopush>;
    ma.mockReset();
  });

  it("should render", () => {
    expect(
      render(
        <NotSupportedAgreementDisclaimer agreementUrl="http://localhost:3000" />
      )
    ).toBeTruthy();
  });

  it("should send event after init", () => {
    expect(matopush).toHaveBeenCalledTimes(0);
    render(
      <NotSupportedAgreementDisclaimer agreementUrl="http://localhost:3000" />
    );
    expect(matopush).toHaveBeenCalledTimes(1);
    expect(matopush).toHaveBeenCalledWith([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.OUTIL,
      MatomoActionEvent.PREAVIS_DEMISSION,
      MatomoAgreementEvent.CC_BLOCK_USER,
    ]);
  });
});
