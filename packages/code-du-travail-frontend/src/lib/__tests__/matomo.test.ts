import {
  MatomoCommonEvent,
  MatomoPreavisRetraiteEvent,
} from "../../outils/common/type/matomo";
import { matopush } from "../../piwik";
import {
  trackConventionCollective,
  trackHelpQuestionRetraite,
  trackSelectQuestionRetraite,
} from "../matomo";

jest.mock("../../piwik", () => ({
  matopush: jest.fn(),
}));

describe("Matomo", () => {
  beforeEach(() => {
    const ma = matopush as jest.MockedFunction<typeof matopush>;
    ma.mockReset();
  });

  describe("Convention collective", () => {
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

  describe("Selection de la valeur sur les étapes dynamique", () => {
    test.each`
      title                          | isTracked | params
      ${"Catégorie professionnelle"} | ${1}      | ${[MatomoCommonEvent.TRACK_EVENT, MatomoCommonEvent.OUTIL, MatomoPreavisRetraiteEvent.ACTION, MatomoPreavisRetraiteEvent.SELECT_CAT_PRO]}
      ${"Ancienneté"}                | ${0}      | ${0}
      ${"Échelon"}                   | ${1}      | ${[MatomoCommonEvent.TRACK_EVENT, MatomoCommonEvent.OUTIL, MatomoPreavisRetraiteEvent.ACTION, MatomoPreavisRetraiteEvent.SELECT_ECHELON]}
      ${"Groupe"}                    | ${1}      | ${[MatomoCommonEvent.TRACK_EVENT, MatomoCommonEvent.OUTIL, MatomoPreavisRetraiteEvent.ACTION, MatomoPreavisRetraiteEvent.SELECT_GROUPE]}
      ${"Echelon"}                   | ${0}      | ${null}
      ${"Cat pro"}                   | ${0}      | ${null}
      ${"échelon"}                   | ${0}      | ${null}
      ${null}                        | ${0}      | ${null}
      ${""}                          | ${0}      | ${null}
    `(
      "Pour la question ayant comme titre $title, matomo doit être appelé $isTracked fois",
      ({ isTracked, title, params }) => {
        trackSelectQuestionRetraite(title);
        expect(matopush).toHaveBeenCalledTimes(isTracked);
        // eslint-disable-next-line jest/no-conditional-expect
        if (params) expect(matopush).toHaveBeenCalledWith(params);
      }
    );
  });
  describe("Bouton d'aide sur les étapes dynamiques", () => {
    test.each`
      title                          | isTracked | params
      ${"Catégorie professionnelle"} | ${1}      | ${[MatomoCommonEvent.TRACK_EVENT, MatomoCommonEvent.OUTIL, MatomoPreavisRetraiteEvent.ACTION, MatomoPreavisRetraiteEvent.CLICK_HELP_BUTTON_CAT_PRO]}
      ${"Ancienneté"}                | ${1}      | ${[MatomoCommonEvent.TRACK_EVENT, MatomoCommonEvent.OUTIL, MatomoPreavisRetraiteEvent.ACTION, MatomoPreavisRetraiteEvent.CLICK_HELP_ANCIENNETE]}
      ${"Échelon"}                   | ${1}      | ${[MatomoCommonEvent.TRACK_EVENT, MatomoCommonEvent.OUTIL, MatomoPreavisRetraiteEvent.ACTION, MatomoPreavisRetraiteEvent.CLICK_HELP_ECHELON]}
      ${"Groupe"}                    | ${1}      | ${[MatomoCommonEvent.TRACK_EVENT, MatomoCommonEvent.OUTIL, MatomoPreavisRetraiteEvent.ACTION, MatomoPreavisRetraiteEvent.CLICK_HELP_GROUPE]}
      ${"Echelon"}                   | ${0}      | ${null}
      ${"Cat pro"}                   | ${0}      | ${null}
      ${"échelon"}                   | ${0}      | ${null}
      ${null}                        | ${0}      | ${null}
      ${""}                          | ${0}      | ${null}
    `(
      "Lorsqu'un utilisateur clique sur le bouton aide de la question $title, matomo doit être appelé $isTracked fois",
      ({ isTracked, title, params }) => {
        trackHelpQuestionRetraite(title);
        expect(matopush).toHaveBeenCalledTimes(isTracked);
        // eslint-disable-next-line jest/no-conditional-expect
        if (params) expect(matopush).toHaveBeenCalledWith(params);
      }
    );
  });
});
