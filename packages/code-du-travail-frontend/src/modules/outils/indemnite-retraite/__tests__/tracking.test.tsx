import { render } from "@testing-library/react";
import { UserAction } from "../../common/utils/UserAction";
import IndemniteRetraiteSimulator from "../IndemniteRetraiteSimulator";
import { ui } from "../../indemnite-depart/__tests__/ui";
import { sendEvent } from "@socialgouv/matomo-next";

jest.mock("@socialgouv/matomo-next", () => ({
  sendEvent: jest.fn(),
}));

const TOOL_TITLE = "Indemnité de départ ou de mise à la retraite";
const VIEW_STEP = `view_step_${TOOL_TITLE}`;

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
