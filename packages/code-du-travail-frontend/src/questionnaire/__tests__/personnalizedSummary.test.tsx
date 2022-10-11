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
              neutralStatement: "neutralStatement11",
              slug: "Slug11",
            },
            {
              text: "Response12",
              trackingName: "Response12",
              statement: "Statement12",
              neutralStatement: "neutralStatement12",
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
    previousResponses: [
      {
        text: "Statement1",
        index: 0,
      },
      {
        text: "Statement11",
        index: 0,
      },
    ],
  },
])(
  `Etant donné les paramètres :
    - nom: $name
    - titre: $title
    - titre personnalisé: $personnalizedTitle
    - slug: $slug
    - réponses précédentes: $previousResponses
  `,
  ({ name, title, personnalizedTitle, slug, previousResponses }) => {
    const storeInitialState = withStore(name).getState();
    beforeEach(() => {
      withStore(name).setState(
        {
          ...storeInitialState,
          previousResponses,
          questionnaireSlug: slug,
        },
        true
      );
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
      it("doit afficher le titre personnalisé", () => {
        expect(rendering.queryByText(personnalizedTitle)).toBeInTheDocument();
      });
      it("doit afficher les déclarations personnalisées", () => {
        expect(rendering.queryByText("Statement1")).toBeInTheDocument();
        expect(rendering.queryByText("Statement11")).toBeInTheDocument();
      });
      it("ne doit pas afficher de questions", () => {
        expect(rendering.queryByText("Question1")).not.toBeInTheDocument();
        expect(rendering.queryByText("Question11")).not.toBeInTheDocument();
      });
    });
  }
);
