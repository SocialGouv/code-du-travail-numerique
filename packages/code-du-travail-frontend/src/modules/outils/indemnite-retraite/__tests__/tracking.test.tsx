import { render } from "@testing-library/react";
import { UserAction } from "../../common/utils/UserAction";
import IndemniteRetraiteSimulator from "../IndemniteRetraiteSimulator";
import { ui } from "../../indemnite-depart/__tests__/ui";
import { sendEvent } from "@socialgouv/matomo-next";
import {
  MatomoActionEvent,
  MatomoRetirementTool,
} from "../../../analytics/types";
import { IndemniteDepartType } from "../../indemnite-depart/types";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

/**
 * L'action Matomo est dérivée du `title` du document Elasticsearch par
 * `useSimulatorLayoutTracking`, alors que le reste du code la déclare à partir
 * de `IndemniteDepartType.RETRAITE`. On rend ici les deux bouts explicites :
 * le simulateur reçoit le titre attendu du document, et l'action est comparée à
 * l'énumération — un titre qui divergerait scinderait le tunnel en deux séries.
 */
const TOOL_TITLE: string = IndemniteDepartType.RETRAITE;
const VIEW_STEP: string = MatomoActionEvent.INDEMNITE_RETRAITE;

describe("Indemnité de départ à la retraite - Tracking", () => {
  let userAction: UserAction;

  beforeEach(() => {
    jest.clearAllMocks();
    userAction = new UserAction();
    render(
      <IndemniteRetraiteSimulator
        title={TOOL_TITLE}
        displayTitle={TOOL_TITLE}
        relatedItems={[]}
      />
    );
  });

  test("émet un évènement de vue à chaque étape", () => {
    userAction.click(ui.introduction.startButton.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: VIEW_STEP,
      name: "infos",
    });

    userAction
      .click(ui.information.originRetraite.depart.get())
      .click(ui.next.get());
    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: VIEW_STEP,
      name: "anciennete",
    });
  });

  test.each`
    origine     | action
    ${"depart"} | ${"depart"}
    ${"mise"}   | ${"mise"}
  `("émet l'origine « $origine » du départ", ({ origine, action }) => {
    userAction
      .click(ui.introduction.startButton.get())
      .click(
        origine === "mise"
          ? ui.information.originRetraite.mise.get()
          : ui.information.originRetraite.depart.get()
      )
      .click(ui.next.get());

    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action,
      // Le simulateur de préavis de retraite envoie les mêmes actions : sans ce
      // nom, les deux tunnels se confondraient dans Matomo.
      name: MatomoRetirementTool.INDEMNITE_RETRAITE,
    });
  });

  test("émet l'évènement d'inéligibilité sur l'écran de résultat", () => {
    userAction
      .click(ui.introduction.startButton.get())
      .click(ui.information.originRetraite.depart.get())
      .click(ui.next.get())
      .setInput(ui.seniority.startDate.get(), "01/01/2019")
      .setInput(ui.seniority.notificationDate.get(), "01/12/2023")
      .setInput(ui.seniority.endDate.get(), "01/01/2024")
      .click(ui.next.get());

    expect(sendEvent).toHaveBeenCalledWith({
      category: "outil",
      action: VIEW_STEP,
      name: "results_ineligible",
    });
  });
});
