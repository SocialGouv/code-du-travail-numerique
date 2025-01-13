import { render } from "@testing-library/react";
import React from "react";
import { BesoinPlusInformations } from "..";
import { UserAction } from "../../../common";
import { getServiceInfo } from "../data/servicesDeRenseignement";

jest.mock("../data/servicesDeRenseignement");

describe("<BesoinPlusInformations />", () => {
  beforeAll(() => {
    (getServiceInfo as jest.Mock).mockImplementation((data: string) => {
      if (data === "75") {
        return {
          name: "PARIS",
          url: "https://idf.drieets.gouv.fr/Adresse-et-horaires-d-ouverture-de-l-unite-departementale-75",
        };
      }
      return undefined;
    });
  });

  it("doit trouver la DREETs à partir de son code postal", () => {
    const { getByTestId, getByLabelText } = render(<BesoinPlusInformations />);
    const userAction = new UserAction();
    userAction.setInput(
      getByLabelText("Saisissez le numéro de votre département"),
      "75"
    );
    userAction.click(getByTestId("button-search-service"));

    expect(getByTestId("result-search-service").textContent).toBe(
      "https://idf.drieets.gouv.fr/Adresse-et-horaires-d-ouverture-de-l-unite-departementale-75"
    );
  });

  it("doit trouver indiquer si le code postal n'existe pas", () => {
    const { getByTestId, getByLabelText, getByText } = render(
      <BesoinPlusInformations />
    );
    const userAction = new UserAction();
    userAction.setInput(
      getByLabelText("Saisissez le numéro de votre département"),
      "999"
    );
    userAction.click(getByTestId("button-search-service"));

    expect(
      getByText(
        "Aucun service de renseignement n'a été trouvé pour ce département."
      )
    ).toBeInTheDocument();
  });
});
