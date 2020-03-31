import React from "react";
import { render } from "@testing-library/react";
import Glossaire from "../pages/glossaire";
const glossary = [
  {
    title: "Accord d'entreprise",
    slug: "accord-dentreprise",
    abbrs: [],
    variants: [
      "accord collectif d'entreprise",
      "accords d'entreprise",
      "accords collectifs d'entreprise",
    ],
    definition:
      "<p>Accord collectif de travail conclu au niveau d'une entreprise.</p>",
    refs: [],
  },
];
describe("<Glossaire />", () => {
  it("should render", () => {
    const { container } = render(<Glossaire glossary={glossary} />);
    expect(container).toMatchSnapshot();
  });
});
