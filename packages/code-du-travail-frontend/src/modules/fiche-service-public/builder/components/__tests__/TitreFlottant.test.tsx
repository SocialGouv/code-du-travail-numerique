import React from "react";
import { render } from "@testing-library/react";
import TitreFlottant from "../TitreFlottant";
import { FicheSPDataTitreFlottant } from "../../type";

describe("<TitleFloattant />", () => {
  const data: FicheSPDataTitreFlottant = {
    type: "element",
    name: "TitreFlottant",
    children: [
      {
        type: "element",
        name: "Paragraphe",
        children: [
          {
            type: "text",
            text: "Remboursement des frais",
          },
        ],
      },
    ],
  };

  it("should render a H{x} whose {x} is headingLevel + 2", () => {
    const { getByText } = render(<TitreFlottant level={2} data={data} />);
    expect(getByText("Remboursement des frais").tagName).toEqual("H4");
  });
  it("heading should default to H6", () => {
    const { getByText } = render(<TitreFlottant level={10} data={data} />);
    expect(getByText("Remboursement des frais").tagName).toEqual("H6");
  });

  it("should return nothing", () => {
    const dataEmptyChildren: FicheSPDataTitreFlottant = {
      type: "element",
      name: "TitreFlottant",
      children: [],
    };
    const { container } = render(
      <TitreFlottant level={10} data={dataEmptyChildren} />
    );
    expect(container).toBeEmpty();
  });
});
