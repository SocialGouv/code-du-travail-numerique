import React from "react";
import { render } from "@testing-library/react";
import Accordion from "../Accordion";
import accordionDataMock from "./mocks/accordionData.json";
import { FicheSPDataTexteChapitre } from "../../type";

describe("<Accordion />", () => {
  it("should have different levels of headings & render both BlocCas & Chapitre", () => {
    const { container, getAllByRole } = render(
      <Accordion
        data={accordionDataMock as FicheSPDataTexteChapitre}
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
  });
});
