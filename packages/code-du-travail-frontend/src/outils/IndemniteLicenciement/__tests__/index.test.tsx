import { render } from "@testing-library/react";

import { CalculateurIndemnite } from "../";

describe("<CalculateurIndemnite />", () => {
  it("should render", () => {
    const { container } = render(
      <CalculateurIndemnite
        title="Indemnité de licenciement"
        displayTitle="Calculer l'indemnité de licenciement"
        icon=""
        publicodesRules={[]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
