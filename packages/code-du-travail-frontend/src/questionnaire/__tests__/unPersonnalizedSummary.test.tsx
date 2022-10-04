import { render } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { QuestionnaireWrapper } from "../Components";
import { withStore } from "../store";

jest.mock("@cdt/data", () => ({
  ...jest.requireActual("@cdt/data"),
  dismissalProcessQuestionnaire: {
    text: "Question1",
    trackingName: "Question ",
    responses: [
      {
        text: "Response1",
        trackingName: "Response1",
        statement: "Statement1",
        question: {
          text: "Question11",
          trackingName: "name1",
          responses: [
            {
              text: "Response11",
              trackingName: "Response11",
              statement: "Statement11",
              infoStatement: "InfoStatement11",
              slug: "Slug11",
            },
            {
              text: "Response12",
              trackingName: "Response12",
              statement: "Statement11",
              infoStatement: "InfoStatement12",
              slug: "Slug12",
            },
          ],
        },
      },
      {
        text: "Response2",
        trackingName: "Response2",
        statement: "Statement2",
        slug: "Response2",
      },
    ],
  },
}));

describe.each([
  {
    name: "dismissalProcess",
    title: "Quelle est votre situation ?",
    personnalizedTitle: "Mon titre perso",
    slug: "Slug11",
  },
])(
  `Etant donné les paramètres :
    - nom: $name
    - titre: $title
    - titre personnalisé: $personnalizedTitle
    - slug: $slug
  `,
  ({ name, title, personnalizedTitle, slug }) => {
    const storeInitialState = withStore(name).getState();
    beforeEach(() => {
      withStore(name).setState(storeInitialState, true);
    });
    describe("Quand l'utilisateur arrive sur le questionnaire", () => {
      let rendering;
      beforeEach(async () => {
        await act(async () => {
          rendering = await render(
            <QuestionnaireWrapper
              name={name}
              title={title}
              personnalizedTitle={personnalizedTitle}
              slug={slug}
            />
          );
        });
      });
      it("doit afficher la déclaration non personnalisée", () => {
        expect(rendering.queryByText("InfoStatement11")).toBeInTheDocument();
      });
      it("doit afficher le lien vers le questionnaire", () => {
        expect(
          rendering.queryByText("Changer de procédure")
        ).toBeInTheDocument();
      });
      it("ne doit pas afficher de questions", () => {
        expect(rendering.queryByText("Question1")).not.toBeInTheDocument();
        expect(rendering.queryByText("Question11")).not.toBeInTheDocument();
      });
    });
  }
);
