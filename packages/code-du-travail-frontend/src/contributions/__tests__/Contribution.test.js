import React from "react";
import { render } from "@testing-library/react";
import Contribution from "../Contribution";

let mockPreselectedConvention = null;

jest.mock("use-persisted-state", () => () /*key*/ => () => [
  mockPreselectedConvention,
  () => {}
]);

beforeEach(() => {
  mockPreselectedConvention = null;
});

describe("<Contribution />", () => {
  it("should render with no answer", () => {
    const answers = {};
    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
  it("should render with generic answer", () => {
    const answers = { generic: { markdown: "hello **world**" } };
    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
  it("should render with generic answer and content", () => {
    const answers = { generic: { markdown: "hello **world**" } };
    const content = {
      raw:
        '{"type":"element","name":"Publication","attributes":{"xmlns:dc":"http://purl.org/dc/elements/1.1/","xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","ID":"F317","type":"Fiche Question-réponse","xsi:noNamespaceSchemaLocation":"../Schemas/3.0/Publication.xsd"},"children":[{"type":"element","name":"dc:title","children":[{"type":"text","text":"Arrêt maladie pendant la période d\'essai : quelles sont les règles ?"}]}]}',
      url: "https://www.service-public.fr/particuliers/vosdroits/F317"
    };
    const { container } = render(
      <Contribution answers={answers} content={content} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render with conventions answer", () => {
    const answers = {
      conventions: [
        {
          id: 123,
          idcc: 456,
          markdown: "hello **123**"
        }
      ]
    };
    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
  it("should render with both answers", () => {
    const answers = {
      generic: { markdown: "hello **generic**" },
      conventions: [
        {
          id: 123,
          idcc: 456,
          markdown: "hello **123**"
        }
      ]
    };
    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
  it("should render preselected convention", () => {
    mockPreselectedConvention = {
      title: "preselected convention",
      num: "idcc-preselected",
      id: 123
    };
    const answers = {
      generic: { markdown: "hello **generic**" },
      conventions: [
        {
          id: 123,
          idcc: "idcc-preselected",
          markdown: "hello **123**"
        }
      ]
    };

    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });

  it("should NOT render invalid preselected convention", () => {
    mockPreselectedConvention = {
      title: "unknown convention",
      num: "idcc-unknown",
      id: 456
    };
    const answers = {
      generic: { markdown: "hello **generic**" },
      conventions: [
        {
          id: 123,
          idcc: "idcc-preselected",
          markdown: "hello **123**"
        }
      ]
    };

    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });

  it("should render answer references", () => {
    mockPreselectedConvention = {
      title: "preselected convention",
      num: "idcc-preselected",
      id: 123
    };
    const answers = {
      generic: { markdown: "hello **generic**" },
      conventions: [
        {
          id: 123,
          idcc: "idcc-preselected",
          markdown: "hello **123**",
          references: [
            {
              id: 42,
              value: "reference externe 1",
              url: "http://path/to/ref"
            },
            {
              id: 422,
              value: "reference CC 1",
              agreement: {
                id: 123,
                url: "http://path/to/agreement"
              }
            }
          ]
        }
      ]
    };

    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
});
