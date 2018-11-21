import React from "react";
import { fireEvent, render, wait, cleanup } from "react-testing-library";

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

fetch.mockReturnValue(
  Promise.resolve({
    json: () => ({ success: true })
  })
);

afterEach(cleanup);

describe("<FeedbackForm />", () => {
  it("should render", () => {
    const { container, getByValue } = render(
      <FeedbackForm query="Initial query" results={results} />
    );
    expect(getByValue("Initial query")).toBeTruthy();
    expect(container).toMatchSnapshot();
  });

  it("should prevent submiting form if email is empty", () => {
    const { getByText } = render(
      <FeedbackForm query="Initial query" results={results} />
    );
    window.alert = jest.fn();
    getByText("Envoyer ma question").click();
    expect(alert).toHaveBeenCalled();
  });

  it("should submit form if email is filled", () => {
    const { getByText, getByPlaceholderText } = render(
      <FeedbackForm query="Initial query" results={results} />
    );
    const email = getByPlaceholderText("nom@adresse.email");
    const button = getByText("Envoyer ma question");

    fireEvent.change(email, { target: { value: "user@social.gouv.fr" } });
    button.click();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it("should reset form after submit", async () => {
    const { getByText, getByPlaceholderText } = render(
      <FeedbackForm query="Initial query" results={results} />
    );

    const email = getByPlaceholderText("nom@adresse.email");
    const button = getByText(/Envoyer ma question/i);

    fireEvent.change(email, { target: { value: "user@social.gouv.fr" } });
    expect(email.value).toBe("user@social.gouv.fr");

    button.click();
    await wait(() => getByPlaceholderText("nom@adresse.email"));
    expect(email.value).toBe("");
  });

  it("should show a status message after submit", async () => {
    const { getByText, getByPlaceholderText } = render(
      <FeedbackForm query="Initial query" results={results} />
    );

    const email = getByPlaceholderText("nom@adresse.email");
    const button = getByText(/Envoyer ma question/i);

    fireEvent.change(email, { target: { value: "user@social.gouv.fr" } });
    button.click();

    await wait(() => expect(getByText(/message bien envoyé/i)).toBeTruthy());
  });

  it("should hide status message after 3s", async () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
      <FeedbackForm query="Initial query" results={results} />
    );

    const email = getByPlaceholderText("nom@adresse.email");
    const button = getByText(/Envoyer ma question/i);

    fireEvent.change(email, { target: { value: "user@social.gouv.fr" } });
    button.click();
    await wait(() => queryByText(/message bien envoyé/i));
    jest.runAllTimers();
    expect(queryByText(/message bien envoyé/i)).not.toBeTruthy();
  });
  it("should show error status message if request fail ", async () => {
    const { getByText, queryByText, getByPlaceholderText } = render(
      <FeedbackForm query="Initial query" results={results} />
    );

    const email = getByPlaceholderText("nom@adresse.email");
    const button = getByText(/Envoyer ma question/i);
    fetch.mockReturnValue(Promise.reject());
    fireEvent.change(email, { target: { value: "user@social.gouv.fr" } });
    button.click();
    await wait(() => expect(getByText(/Impossible/i)).toBeTruthy());
    jest.runAllTimers();
    expect(queryByText(/Impossible/i)).not.toBeTruthy();
  });
});
