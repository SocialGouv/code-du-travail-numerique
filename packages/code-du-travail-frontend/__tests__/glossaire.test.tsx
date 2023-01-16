import { render } from "@testing-library/react";
import React from "react";

import Glossaire from "../pages/glossaire";

const glossary = [
  {
    abbreviations: [],
    definition:
      "<p>Accord collectif de travail conclu au niveau d'une entreprise.</p>",
    referenceqs: [],
    slug: "accord-dentreprise",
    term: "Accord d'entreprise",
    variants: [
      "accord collectif d'entreprise",
      "accords d'entreprise",
      "accords collectifs d'entreprise",
    ],
  },
];
describe("<Glossaire />", () => {
  it("should render", () => {
    const { container } = render(<Glossaire glossary={glossary} />);
    expect(container).toMatchSnapshot();
  });
});
