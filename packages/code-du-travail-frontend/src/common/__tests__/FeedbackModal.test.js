import React from "react";
import { render } from "react-testing-library";

import { FeedbackModal } from "../FeedbackModal";

const closeModal = () => {};

const results = [
  {
    _source: {
      source: "code-du-travail",
      slug: "result-slug",
      title: "item title",
      type: "item-type"
    }
  }
];

describe("<FeedbackModal />", () => {
  it("should not render modal when isOpen is false", () => {
    const { baseElement } = render(
      <FeedbackModal
        closeModal={closeModal}
        isOpen={false}
        query="Query"
        results={results}
      />
    );
    expect(baseElement).toMatchSnapshot();
  });

  it("should render modal when isOpen is true", () => {
    const { baseElement, getByValue } = render(
      <FeedbackModal
        closeModal={closeModal}
        isOpen={true}
        query="Query"
        results={results}
      />
    );
    expect(getByValue("Query")).toBeTruthy();
    expect(baseElement).toMatchSnapshot();
  });

  it("should close the modal", () => {
    const { getByValue, queryByValue, rerender } = render(
      <FeedbackModal
        closeModal={closeModal}
        isOpen={true}
        query="Query"
        results={results}
      />
    );

    expect(getByValue("Query")).toBeTruthy();

    rerender(
      <FeedbackModal
        closeModal={closeModal}
        isOpen={false}
        query="Query"
        results={results}
      />
    );
    expect(queryByValue("Query")).toBeNull();
  });
});
