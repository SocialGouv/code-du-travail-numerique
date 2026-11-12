import { render, screen } from "@testing-library/react";
import React from "react";

import ServiceEnLigne, {
  INDEMNITE_RETRAITE_CONTRIBUTION_URL,
  INDEMNITE_RETRAITE_SIMULATOR_PATH,
} from "../ServiceEnLigne";
import serviceEnLigneDataMock from "./mocks/serviceEnLigneData.json";
import serviceEnLigneSansUrlDataMock from "./mocks/serviceEnLigneSansUrlData.json";
import { FicheSPDataServiceEnLigne } from "../../type";

describe("<ServiceEnLigne />", () => {
  it("should render", () => {
    render(
      <ServiceEnLigne
        data={serviceEnLigneDataMock as FicheSPDataServiceEnLigne}
      />
    );

    const title = screen.getByText("Texte qui se retrouve dans le lien");
    expect(title.tagName).toEqual("A");
    expect(title).toHaveAttribute("href", "url à retoruver dans le lien");
  });
  it("should render even if no url", () => {
    render(
      <ServiceEnLigne
        data={serviceEnLigneSansUrlDataMock as FicheSPDataServiceEnLigne}
      />
    );

    const title = screen.getByText(
      "Modèle de lettre de prise d'acte de la rupture du contrat de travail"
    );
    expect(title.tagName).toEqual("P");
  });

  it("should redirect the retirement contribution loop to the simulator", () => {
    const data = {
      type: "element",
      name: "ServiceEnLigne",
      attributes: {
        ID: "R67712",
        URL: INDEMNITE_RETRAITE_CONTRIBUTION_URL,
        type: "Simulateur",
      },
      children: [
        {
          type: "element",
          name: "Titre",
          children: [{ type: "text", text: "Connaître le montant" }],
        },
      ],
    } as unknown as FicheSPDataServiceEnLigne;
    render(<ServiceEnLigne data={data} />);

    const link = screen.getByText("Connaître le montant");
    expect(link).toHaveAttribute("href", INDEMNITE_RETRAITE_SIMULATOR_PATH);
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("should keep other contribution urls untouched", () => {
    const data = {
      type: "element",
      name: "ServiceEnLigne",
      attributes: {
        ID: "R1",
        URL: "https://code.travail.gouv.fr/contribution/29-a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite",
        type: "Simulateur",
      },
      children: [
        {
          type: "element",
          name: "Titre",
          children: [{ type: "text", text: "Autre" }],
        },
      ],
    } as unknown as FicheSPDataServiceEnLigne;
    render(<ServiceEnLigne data={data} />);

    expect(screen.getByText("Autre")).toHaveAttribute(
      "href",
      "https://code.travail.gouv.fr/contribution/29-a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite"
    );
  });
});
