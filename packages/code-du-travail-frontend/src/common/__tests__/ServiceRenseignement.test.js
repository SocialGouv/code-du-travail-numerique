import React from "react";
import { render, wait, waitForElement, fireEvent } from "react-testing-library";
import { ServiceRenseignement } from "../ServiceRenseignement";

jest.mock(
  "../../data/services-de-renseignement.json",
  () => ({
    "26": {
      url: "link.url"
    }
  }),
  { virtual: true }
);

describe("<ServiceRenseignement />", () => {
  it("should render suggestions", async () => {
    const { container, getByText, getByLabelText } = render(
      <ServiceRenseignement />
    );
    const button = getByText(/Trouver votre service de renseignement/i);
    button.click();
    const input = await waitForElement(() =>
      getByLabelText(/saisissez votre numéro de département/i)
    );
    fireEvent.change(input, { target: { value: 26 } });
    await wait(() => expect(getByText(/link\.url/i)).toBeTruthy());
    expect(container).toMatchSnapshot();
  });
});
