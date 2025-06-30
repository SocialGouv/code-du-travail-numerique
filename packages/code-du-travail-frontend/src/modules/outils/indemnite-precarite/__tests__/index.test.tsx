import { render } from "@testing-library/react";
import IndemnitePrecariteSimulator from "../IndemnitePrecariteSimulator";

describe("<IndemnitePrecariteSimulator />", () => {
  it("should render", () => {
    const { container } = render(
      <IndemnitePrecariteSimulator
        title="Indemnité de précarité"
        displayTitle="Indemnité de précarité"
        relatedItems={[]}
      />
    );
    expect(container).toMatchSnapshot();
  });
});
