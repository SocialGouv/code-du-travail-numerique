import { render } from "@testing-library/react";
import React from "react";

import { agreement } from "../../Search/api/__tests__/agreement.mock";
import Convention from "..";

describe("<Convention />", () => {
  it("renders", () => {
    const { container } = render(<Convention convention={agreement} />);
    expect(container).toMatchSnapshot();
  });

  it("Doit afficher que la convention collective n'est pas traitée", () => {
    const { container } = render(
      <Convention
        convention={{
          slug: "9972-convention-collective-departementale-des-exploitations-agricoles-guyane",
          id: "9972",
          num: 9972,
          shortTitle:
            "Convention collective départementale des exploitations agricoles Guyane",
        }}
      />
    );
    expect(container).toHaveTextContent(
      "Cette convention collective n'est pas traitée par nos services."
    );
  });
});
