import { render, fireEvent } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { QuestionnaireWrapper } from "../Components";
import { withStore } from "../store";

jest.mock("@cdt/data", () => ({
  ...jest.requireActual("@cdt/data"),
  dismissalProcessQuestionnaire: {
    text: "Question1",
    trackingName: "Question1",
    description: "Description",
    info: "Question1Info",
    responses: [
      {
        text: "Response1",
        trackingName: "Response1",
        statement: "Statement1",
        info: "Response1Info",
        question: {
          text: "Question11",
          trackingName: "name1",
          responses: [
            {
              text: "Response11",
              trackingName: "Response11",
              statement: "Statement11",
              slug: "Slug11",
            },
            {
              text: "Response12",
              trackingName: "Response12",
              statement: "Statement11",
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
    slug: "procedure-licenciement",
  },
])(
  `Etant donné les paramètres:
    - nom: $name
    - titre: $title
    - slug: $slug
  `,
  ({ name, title, slug }) => {
    const storeInitialState = withStore(name).getState();
    beforeEach(() => {
      withStore(name).setState(storeInitialState, true);
    });
    describe(`Quand l'utilisateur arrive sur le questionnaire`, () => {
      let rendering;
      beforeEach(async () => {
        await act(async () => {
          rendering = await render(
            <QuestionnaireWrapper name={name} title={title} slug={slug} />
          );
        });
      });
      it("doit afficher le titre", () => {
        expect(rendering.queryByText(title)).toBeInTheDocument();
      });
      it("doit afficher la 1e question", () => {
        expect(rendering.queryByText("Question1")).toBeInTheDocument();
      });
      it("doit afficher les réponses de la 1e question", () => {
        expect(rendering.queryByText("Response1")).toBeInTheDocument();
        expect(rendering.queryByText("Response2")).toBeInTheDocument();
      });
      it("doit afficher la description", () => {
        expect(rendering.queryByText("Description")).toBeInTheDocument();
      });
      describe("quand je clique sur la 1e icone info", () => {
        beforeEach(
          async () =>
            await act(async () => {
              await fireEvent.click(rendering.queryAllByTestId("tooltip")[0]);
            })
        );
        it("doit afficher la bulle d'info de la 1e question", () => {
          expect(rendering.queryByText("Question1Info")).toBeInTheDocument();
        });
        describe("quand je reclique sur la 1e icone info", () => {
          beforeEach(
            async () =>
              await act(async () => {
                await fireEvent.click(rendering.queryAllByTestId("tooltip")[0]);
              })
          );
          it("ne doit plus afficher la bulle d'info de la 1e question", () => {
            expect(
              rendering.queryByText("Question1Info")
            ).not.toBeInTheDocument();
          });
        });
      });
      describe("quand je clique sur la 2e icone info", () => {
        beforeEach(
          async () =>
            await act(async () => {
              await fireEvent.click(rendering.queryAllByTestId("tooltip")[1]);
            })
        );
        it("doit afficher la bulle d'info de la 1e réponse de la 1e question", () => {
          expect(rendering.queryByText("Response1Info")).toBeInTheDocument();
        });
        describe("quand je reclique sur la 2e icone info", () => {
          beforeEach(
            async () =>
              await act(async () => {
                await fireEvent.click(rendering.queryAllByTestId("tooltip")[1]);
              })
          );
          it("ne doit plus afficher la bulle d'info de la 1e réponse de la 1e question", () => {
            expect(
              rendering.queryByText("Response1Info")
            ).not.toBeInTheDocument();
          });
        });
      });
      describe("quand je clique sur la 1e réponse de la 1e question", () => {
        beforeEach(
          async () =>
            await act(async () => {
              await fireEvent.click(rendering.queryByText("Response1"));
            })
        );
        it("doit afficher la 2e question", () =>
          expect(rendering.queryByText("Question11")).toBeInTheDocument());
        it("doit afficher les réponses de la 2e question", () => {
          expect(rendering.queryByText("Response11")).toBeInTheDocument();
          expect(rendering.queryByText("Response12")).toBeInTheDocument();
        });
        it("doit afficher la déclaration de la 1e question", () => {
          expect(rendering.queryByText("Statement1")).toBeInTheDocument();
        });
        describe("quand je clique sur Modifier", () => {
          beforeEach(
            async () =>
              await act(async () => {
                fireEvent.click(rendering.queryAllByText("Modifier")[0]);
              })
          );
          it("doit afficher la 1e question", () => {
            expect(rendering.queryByText("Question1")).toBeInTheDocument();
          });
          it("doit afficher les réponses de la 1e question", () => {
            expect(rendering.queryByText("Response1")).toBeInTheDocument();
            expect(rendering.queryByText("Response2")).toBeInTheDocument();
          });
          it("ne doit plus afficher la déclaration de la 1e question", () => {
            expect(rendering.queryByText("Statement1")).not.toBeInTheDocument();
          });
        });
        describe("quand je clique sur la 1e réponse de la 2e question", () => {
          beforeEach(
            async () =>
              await act(async () => {
                await fireEvent.click(rendering.queryByText("Response11"));
              })
          );
          it("doit afficher la déclaration de la 2e question", () => {
            expect(rendering.queryByText("Statement11")).toBeInTheDocument();
          });
          it("doit afficher le bouton d'affichage de la page info", () => {
            expect(
              rendering.queryByText("Afficher les informations personnalisées")
            ).toBeInTheDocument();
          });
        });
      });
    });
  }
);
