import React from "react";
import { render } from "@testing-library/react";
import accordionDataMock from "./mocks/accordionData.json";
import accordionNestedDataMock from "./mocks/accordionNestedData.json";
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
    expect(h2[0].children[0].id).toEqual("qui-peut-etre-indemnise__toggle-btn");
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

    const h4 = getAllByRole("heading", { level: 4 });
    expect(h4[0].textContent).toEqual("Qui peut être indemnisé ?");

    const h5 = getAllByRole("heading", { level: 5 });
    expect(h5[0].textContent).toEqual("Vous êtes une victime directe");
    expect(h5[1].textContent).toEqual("Vous êtes un ayant-droit de victime");
  });

  it("handle unique ids in nested accordion", () => {
    const { container, getAllByRole } = render(
      <AccordionWrapper
        data={accordionNestedDataMock as FicheSPDataTextWithChapitre}
        headingLevel={0}
      />
    );
    expect(container).toMatchSnapshot();

    const h2 = getAllByRole("heading", { level: 2 });
    expect(h2[0].textContent).toEqual("Niveau 1");
    expect(h2[0].children[0].id).toEqual("niveau-1__toggle-btn");

    const h3 = getAllByRole("heading", { level: 3 });
    expect(h3[0].textContent).toEqual("Niveau 2");
    expect(h3[0].children[0].id).toEqual("56uid22__toggle-btn");

    expect(h3[1].textContent).toEqual("Niveau 2");
    expect(h3[1].children[0].id).toEqual("56uid23__toggle-btn");
  });
});
