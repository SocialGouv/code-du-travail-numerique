import { questionMock, responseMock } from "./mocks";
import { render, fireEvent } from "@testing-library/react";
import { QuestionnaireWrapper } from "../Components";
import d from "final-form-arrays";

jest.mock("@cdt/data", () => ({
  ...jest.requireActual("@cdt/data"),
  dismissalProcessQuestionnaire: {
    text: "Question1",
    trackingName: "Question ",
    responses: [
      {
        text: "Response1",
        trackingName: "Response1",
        statement: "Response1",
        question: {
          text: "Question11",
          trackingName: "name1",
          responses: [
            {
              text: "Response11",
              trackingName: "Response11",
              statement: "Response11",
              slug: "Response11",
            },
            {
              text: "Response12",
              trackingName: "Response12",
              statement: "Response12",
              slug: "Response12",
            },
          ],
        },
      },
      {
        text: "Response2",
        trackingName: "Response2",
        statement: "Response2",
        slug: "Response2",
      },
    ],
  },
}));

describe(`On rendering QuestionnaireWrapper`, () => {
  let rendering;
  beforeEach(() => {
    rendering = render(
      <QuestionnaireWrapper
        name={"dismissalProcess"}
        title={"Quelle est votre situation ?"}
        slug={"procedure-licenciement"}
      />
    );
  });
  it("should display the title", () => {
    expect(
      rendering.queryByText("Quelle est votre situation ?")
    ).toBeInTheDocument();
  });
  it("should display the 1th question", () => {
    expect(rendering.queryByText("Question1")).toBeInTheDocument();
  });
  it("should display the 1th question's respective responses", () => {
    expect(rendering.queryByText("Response1")).toBeInTheDocument();
    expect(rendering.queryByText("Response2")).toBeInTheDocument();
  });
  it("onclick -> should display the 2nd question", () => {
    fireEvent.click(rendering.queryByText("Response1"));
    expect(rendering.queryByText("Question11")).toBeInTheDocument();
  });
  it("onclick -> should display the 2nd question's respective responses", () => {
    fireEvent.click(rendering.queryByText("Response1"));
    expect(rendering.queryByText("Response11")).toBeInTheDocument();
    expect(rendering.queryByText("Response12")).toBeInTheDocument();
  });
  it("onclick -> should display the access button to info page", () => {
    fireEvent.click(rendering.queryByText("Response1"));
    fireEvent.click(rendering.queryByText("Response11"));
    expect(
      rendering.queryByText("Afficher les informations personnalisées")
    ).toBeInTheDocument();
  });
});
