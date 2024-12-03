import React from "react";
import { render } from "@testing-library/react";
import blocCasDataMock from "./mocks/blocCasData.json";
import { FicheSPDataWithElementChildren } from "../../type";
import SectionWithTitle from "../SectionWithTitle";

describe("<SectionWithTitle />", () => {
  it("n'affiche rien si pas de titre", () => {
    const { container } = render(
      <SectionWithTitle
        data={{
          type: "element",
          children: [{ name: "Texte", children: [], type: "element" }],
          name: "Cas",
        }}
        headingLevel={0}
      />
    );
    expect(container).toBeEmpty();
  });

  it("should render section", () => {
    const { container, getAllByRole } = render(
      <SectionWithTitle
        data={blocCasDataMock as FicheSPDataWithElementChildren}
        headingLevel={2}
      />
    );
    expect(container).toMatchSnapshot();

    const h2 = getAllByRole("heading", { level: 4 });
    expect(h2[0].textContent).toEqual("Vous êtes une victime directe");
  });
});
