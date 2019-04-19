import React from "react";
import { fireEvent, render, wait } from "react-testing-library";

import { FeedbackForm } from "../FeedbackForm";

jest.useFakeTimers();

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

describe("<FeedbackForm />", () => {
  it("renders if user is satisfied", () => {
    const { container, getByValue } = render(
      <FeedbackForm
        query="Initial query"
        source="Tous contenus"
        results={results}
        onSubmit={jest.fn()}
        onReset={jest.fn()}
        isSatisfied={true}
      />
    );
    expect(getByValue("Initial query")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });
  it("renders if user is no satisfied", () => {
    const { container, getByValue } = render(
      <FeedbackForm
        query="Initial query"
        source="Tous contenus"
        results={results}
        onSubmit={jest.fn()}
        onReset={jest.fn()}
        isSatisfied={false}
      />
    );
    expect(getByValue("Initial query")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it("prevents submiting form if content is empty", () => {
    const { getByText } = render(
      <FeedbackForm
        query="Initial query"
        source="Tous contenus"
        results={results}
        onSubmit={jest.fn()}
        onReset={jest.fn()}
        isSatisfied={true}
      />
    );
    window.alert = jest.fn();
    getByText("Envoyer mon commentaire").click();
    expect(alert).toHaveBeenCalled();
  });

  it("submits form if content is filled", () => {
    const onSubmit = jest.fn().mockResolvedValue({ success: true });
    const { getByText, getByPlaceholderText } = render(
      <FeedbackForm
        query="Initial query"
        source="Tous contenus"
        results={results}
        onSubmit={onSubmit}
        onReset={jest.fn()}
        isSatisfied={true}
      />
    );
    const content = getByPlaceholderText(/les informations/i);
    const button = getByText("Envoyer mon commentaire");

    fireEvent.change(content, { target: { value: "marche pô" } });
    button.click();
    expect(onSubmit).toHaveBeenCalledTimes(1);
  });

  it("resets form after submit", async () => {
    const onSubmit = jest.fn().mockResolvedValue();
    const { getByText, getByPlaceholderText } = render(
      <FeedbackForm
        query="Initial query"
        source="Tous contenus"
        results={results}
        onSubmit={onSubmit}
        onReset={jest.fn()}
        isSatisfied={true}
      />
    );
    const content = getByPlaceholderText(/les informations/i);
    const button = getByText("Envoyer mon commentaire");

    fireEvent.change(content, { target: { value: "marche pô" } });
    expect(content.value).toBe("marche pô");

    button.click();
    await wait(() => {});
    expect(content.value).toBe("");
  });

  it("shows error status message if request fail ", async () => {
    const onSubmit = jest.fn().mockRejectedValue({});
    const { getByText, queryByText, getByPlaceholderText } = render(
      <FeedbackForm
        query="Initial query"
        source="Tous contenus"
        results={results}
        onSubmit={onSubmit}
        onReset={jest.fn()}
        isSatisfied={true}
      />
    );

    const content = getByPlaceholderText(/les informations/i);
    const button = getByText("Envoyer mon commentaire");

    fireEvent.change(content, { target: { value: "marche pô" } });
    button.click();
    await wait(() => expect(getByText(/Impossible/i)).toBeTruthy());
    jest.runAllTimers();
    expect(queryByText(/Impossible/i)).not.toBeTruthy();
  });
});
