import { render } from "@testing-library/react";

import { DureePreavisLicenciement } from "..";

describe("<DureePreavisLicenciement />", () => {
  it("should render", () => {
    const { container } = render(
      <DureePreavisLicenciement
        title="Préavis de licenciement"
        titleH1="Calculer le préavis de licenciement"
        icon=""
      />
    );
    expect(container).toMatchSnapshot();
  });
});
