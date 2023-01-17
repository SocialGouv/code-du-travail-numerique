import {
  MatomoBaseEvent,
  MatomoSearchAgreementCategory,
} from "../../../../../lib";
import { push as matopush } from "@socialgouv/matomo-next";
import { UserAction } from "../../../../ConventionCollective/types";
import { handleTrackEvent } from "../index";

jest.mock("@socialgouv/matomo-next", () => ({
  push: jest.fn(),
}));

describe("Handle event on user action", () => {
  beforeEach(() => {
    const ma = matopush as jest.MockedFunction<typeof matopush>;
    ma.mockReset();
  });

  describe("user searching an enterprise", () => {
    it("should send a matomo event", () => {
      const pageTitle = "Préavis de retraite";
      const extra = {
        query: "company",
      };
      handleTrackEvent(pageTitle, UserAction.SearchEnterprise, extra);
      expect(matopush).toHaveBeenCalledTimes(1);
      expect(matopush).toHaveBeenCalledWith([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.ENTERPRISE_SEARCH,
        pageTitle,
        JSON.stringify(extra),
      ]);
    });
  });

  describe("user searching an agreement", () => {
    it("should send a matomo event", () => {
      const pageTitle = "Préavis de retraite";
      const extra = {
        query: "Boulangerie",
      };
      handleTrackEvent(pageTitle, UserAction.SearchAgreement, extra);
      expect(matopush).toHaveBeenCalledTimes(1);
      expect(matopush).toHaveBeenCalledWith([
        MatomoBaseEvent.TRACK_EVENT,
        MatomoSearchAgreementCategory.AGREEMENT_SEARCH,
        pageTitle,
        JSON.stringify(extra),
      ]);
    });
  });

  describe("on user action", () => {
    const excludedEvent = [
      UserAction.SearchEnterprise,
      UserAction.SearchAgreement,
      UserAction.OpenAgreementHelp,
      UserAction.OpenEnterpriseHelp,
    ];
    const values = Object.values(UserAction).filter(
      (action) => !excludedEvent.includes(action)
    );
    values.forEach((value) => {
      it(`should not send matomo event for user action ${value}`, () => {
        handleTrackEvent("Préavis de retraite", value as UserAction);
        expect(matopush).toHaveBeenCalledTimes(0);
      });
    });
  });
});
