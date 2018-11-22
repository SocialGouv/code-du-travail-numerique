import React from "react";
import { render, fireEvent } from "react-testing-library";
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
    const input = getByLabelText(/saisissez votre numéro de département/i);
    const button = getByText(/Trouver votre service de renseignement/i);

    fireEvent.change(input, { target: { value: 26 } });
    button.click();

    expect(container).toMatchSnapshot();
  });
});
