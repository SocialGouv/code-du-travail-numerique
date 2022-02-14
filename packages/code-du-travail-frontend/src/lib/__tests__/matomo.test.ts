import { push as matopush } from "@socialgouv/matomo-next";

import {
  MatomoActionEvent,
  MatomoBaseEvent,
  MatomoSimulatorEvent,
  trackConventionCollective,
  trackQuestion,
} from "../matomo";

jest.mock("@socialgouv/matomo-next", () => ({
  matopush: jest.fn(),
}));

describe("Matomo", () => {
  beforeEach(() => {
    const ma = matopush as jest.MockedFunction<typeof matopush>;
    ma.mockReset();
  });

  describe("Convention collective", () => {
    test.each`
      path                                        | isTreated
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
      "Sur $path, matomo doit être appelé $isTreated fois",
      ({ isTreated, path }) => {
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
        expect(matopush).toHaveBeenCalledTimes(isTreated);
      }
    );
  });

  describe("Selection de la valeur sur les étapes dynamique", () => {
    test.each`
      title                          | isTreated | params
      ${"Catégorie professionnelle"} | ${1}      | ${[MatomoBaseEvent.TRACK_EVENT, MatomoBaseEvent.OUTIL, MatomoActionEvent.PREAVIS_RETRAITE, MatomoSimulatorEvent.SELECT_CAT_PRO]}
      ${"Ancienneté"}                | ${0}      | ${0}
      ${"Échelon"}                   | ${1}      | ${[MatomoBaseEvent.TRACK_EVENT, MatomoBaseEvent.OUTIL, MatomoActionEvent.PREAVIS_RETRAITE, MatomoSimulatorEvent.SELECT_ECHELON]}
      ${"Groupe"}                    | ${1}      | ${[MatomoBaseEvent.TRACK_EVENT, MatomoBaseEvent.OUTIL, MatomoActionEvent.PREAVIS_RETRAITE, MatomoSimulatorEvent.SELECT_GROUPE]}
      ${"Echelon"}                   | ${0}      | ${null}
      ${"Cat pro"}                   | ${0}      | ${null}
      ${"échelon"}                   | ${1}      | ${[MatomoBaseEvent.TRACK_EVENT, MatomoBaseEvent.OUTIL, MatomoActionEvent.PREAVIS_RETRAITE, MatomoSimulatorEvent.SELECT_ECHELON]}
      ${null}                        | ${0}      | ${null}
      ${""}                          | ${0}      | ${null}
    `(
      "Pour la question ayant comme titre $title, matomo doit être appelé $isTreated fois",
      ({ isTreated, title, params }) => {
        trackQuestion(title, MatomoActionEvent.PREAVIS_RETRAITE, false);
        expect(matopush).toHaveBeenCalledTimes(isTreated);
        // eslint-disable-next-line jest/no-conditional-expect
        if (params) expect(matopush).toHaveBeenCalledWith(params);
      }
    );
  });
  describe("Bouton d'aide sur les étapes dynamiques", () => {
    test.each`
      title                          | isTreated | params
      ${"Catégorie professionnelle"} | ${1}      | ${[MatomoBaseEvent.TRACK_EVENT, MatomoBaseEvent.OUTIL, MatomoActionEvent.PREAVIS_RETRAITE, MatomoSimulatorEvent.CLICK_HELP_CAT_PRO]}
      ${"Ancienneté"}                | ${1}      | ${[MatomoBaseEvent.TRACK_EVENT, MatomoBaseEvent.OUTIL, MatomoActionEvent.PREAVIS_RETRAITE, MatomoSimulatorEvent.CLICK_HELP_ANCIENNETE]}
      ${"Échelon"}                   | ${1}      | ${[MatomoBaseEvent.TRACK_EVENT, MatomoBaseEvent.OUTIL, MatomoActionEvent.PREAVIS_RETRAITE, MatomoSimulatorEvent.CLICK_HELP_ECHELON]}
      ${"Groupe"}                    | ${1}      | ${[MatomoBaseEvent.TRACK_EVENT, MatomoBaseEvent.OUTIL, MatomoActionEvent.PREAVIS_RETRAITE, MatomoSimulatorEvent.CLICK_HELP_GROUPE]}
      ${"Echelon"}                   | ${0}      | ${null}
      ${"Cat pro"}                   | ${0}      | ${null}
      ${"échelon"}                   | ${1}      | ${[MatomoBaseEvent.TRACK_EVENT, MatomoBaseEvent.OUTIL, MatomoActionEvent.PREAVIS_RETRAITE, MatomoSimulatorEvent.CLICK_HELP_ECHELON]}
      ${null}                        | ${0}      | ${null}
      ${""}                          | ${0}      | ${null}
    `(
      "Lorsqu'un utilisateur clique sur le bouton aide de la question $title, matomo doit être appelé $isTreated fois",
      ({ isTreated, title, params }) => {
        trackQuestion(title, MatomoActionEvent.PREAVIS_RETRAITE);
        expect(matopush).toHaveBeenCalledTimes(isTreated);
        // eslint-disable-next-line jest/no-conditional-expect
        if (params) expect(matopush).toHaveBeenCalledWith(params);
      }
    );
  });
});
