import { render } from "@testing-library/react";

import { SimulateurIndemnitePrecarite } from "..";

describe("<SimulateurIndemnitePrecarite />", () => {
  it("should render", () => {
    const { container } = render(
      <SimulateurIndemnitePrecarite
        title="Indemnité de précarité"
        titleH1="Calculer l'indemnité de précarité"
        icon=""
      />
    );
    expect(container).toMatchSnapshot();
  });
});
