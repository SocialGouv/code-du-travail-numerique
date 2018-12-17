import React from "react";
import { render, fireEvent } from "react-testing-library";
import Answer from "../Answer";

import MockNextContext from "../../../test/MockNextContext";

function renderWithMock(node, options) {
  return render(<MockNextContext>{node}</MockNextContext>, options);
}

describe("<Answer />", () => {
  it("should render", () => {
    const { container } = renderWithMock(
      <Answer
        title="Article du code"
        intro="intro de l'article"
        html="<p class='test-content'>Contenu au format <strong>html</strong></p>"
        footer="pied de page"
        date="03/11/1979"
        sourceType="social groove"
      >
        <div>Contenu supplémentaire</div>
      </Answer>
    );
    expect(container).toMatchSnapshot();
  });

  it("should display feedback modal when click on thumbDown", () => {
    const { baseElement, getByTitle } = renderWithMock(
      <Answer title="Article du code" html="<div>html</div>">
        <div>Raiponce</div>
      </Answer>
    );
    const thumbDown = getByTitle(/invalider cette réponse/i);
    fireEvent.click(thumbDown);
    expect(baseElement).toMatchSnapshot();
  });

  it("should display feedback modal when click on feedback button", () => {
    const { baseElement, getByRole } = renderWithMock(
      <Answer title="Article du code" html="<div>html</div>">
        <div>Raiponce</div>
      </Answer>
    );
    const askBtn = getByRole("button", /Posez votre question/i);
    askBtn.click();
    expect(baseElement).toMatchSnapshot();
  });

  it("should render additional content", () => {
    const { baseElement, getByRole } = renderWithMock(
      <Answer
        title="Article du code"
        html="<div>html</div>"
        additionalContent={<strong>Hi</strong>}
      >
        <div>Raiponce</div>
      </Answer>
    );
    const askBtn = getByRole("button", /Posez votre question/i);
    askBtn.click();
    expect(baseElement).toMatchSnapshot();
  });
});
