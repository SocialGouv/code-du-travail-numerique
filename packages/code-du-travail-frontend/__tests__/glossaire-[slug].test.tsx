import { render } from "@testing-library/react";
import React from "react";

import Term from "../pages/glossaire/[slug]";

const term = {
  abbreviations: [],
  definition:
    "<p>Accord collectif de travail conclu au niveau d'une entreprise.</p>",
  references: [],
  slug: "accord-dentreprise",
  term: "Accord d'entreprise",
  variants: [
    "accord collectif d'entreprise",
    "accords d'entreprise",
    "accords collectifs d'entreprise",
  ],
};

describe("<Term />", () => {
  it("should render", () => {
    const { container } = render(<Term {...term} />);
    expect(container).toMatchSnapshot();
  });
});
