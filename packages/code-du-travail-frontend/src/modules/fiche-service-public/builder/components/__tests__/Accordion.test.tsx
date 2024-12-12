import React from "react";
import { render } from "@testing-library/react";
import accordionDataMock from "./mocks/accordionData.json";
import { FicheSPDataTextWithChapitre } from "../../type";
import AccordionWrapper from "../Accordion";

describe("<Accordion />", () => {
  it("should have different levels of headings & render both BlocCas & Chapitre", () => {
    const { container, getAllByRole, getByText } = render(
      <AccordionWrapper
        data={accordionDataMock as FicheSPDataTextWithChapitre}
        headingLevel={0}
      />
    );
    expect(container).toMatchSnapshot();

    const h2 = getAllByRole("heading", { level: 2 });
    expect(h2[0].textContent).toEqual("Qui peut être indemnisé ?");
    expect(h2[1].textContent).toEqual("Comment faire la demande ?");

    const h3 = getAllByRole("heading", { level: 3 });
    expect(h3[0].textContent).toEqual("Vous êtes une victime directe");
    expect(h3[1].textContent).toEqual("Vous êtes un ayant-droit de victime");

    expect(getByText("Avant l'accordéon")).toBeInTheDocument();
    expect(getByText("Après l'accordéon")).toBeInTheDocument();
  });

  it("should not display accordion after heading level 2", () => {
    const { container, getAllByRole } = render(
      <AccordionWrapper
        data={accordionDataMock as FicheSPDataTextWithChapitre}
        headingLevel={2}
      />
    );
    expect(container).toMatchSnapshot();

    const h2 = getAllByRole("heading", { level: 4 });
    expect(h2[0].textContent).toEqual("Qui peut être indemnisé ?");

    const h3 = getAllByRole("heading", { level: 5 });
    expect(h3[0].textContent).toEqual("Vous êtes une victime directe");
    expect(h3[1].textContent).toEqual("Vous êtes un ayant-droit de victime");
  });
});
