import { matopush } from "../../piwik";
import { trackConventionCollective } from "../matomo";

jest.mock("../../piwik", () => ({
  matopush: jest.fn(),
}));

describe("Matomo", () => {
  describe("Convention collective", () => {
    beforeEach(() => {
      const ma = matopush as jest.MockedFunction<typeof matopush>;
      ma.mockReset();
    });

    test.each`
      path                                        | isTracked
      ${"/outils/preavis-retraite"}               | ${1}
      ${"/outils/preavis-demission"}              | ${1}
      ${"/outils/preavis-licenciement"}           | ${1}
      ${"/outils/indemnite-precarite"}            | ${1}
      ${"/outils/heures-recherche-emploi"}        | ${1}
      ${"/outils/poire"}                          | ${0}
      ${""}                                       | ${0}
      ${null}                                     | ${0}
      ${"/outils/heures-recherche-emploi?q=test"} | ${1}
    `(
      "Sur $path, matomo doit être appelé $isTracked fois",
      ({ isTracked, path }) => {
        trackConventionCollective(
          {
            id: "id",
            num: 1992,
            shortTitle: "short",
            slug: "slug",
            title: "title",
          },
          path
        );
        expect(matopush).toHaveBeenCalledTimes(isTracked);
      }
    );
  });
});
