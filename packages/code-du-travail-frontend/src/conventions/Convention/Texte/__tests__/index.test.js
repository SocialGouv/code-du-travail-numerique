import React from "react";
import { render } from "@testing-library/react";
import Texte from "..";
import { texteDeBase } from "../../../__tests__/api.conventions.mock";

describe("<Texte />", () => {
  it("renders without a title", () => {
    const { container } = render(<Texte node={texteDeBase.content} />);
    expect(container).toMatchSnapshot();
  });

  it("renders with a title", () => {
    const { container } = render(
      <Texte
        node={texteDeBase.content}
        title="This title must be in snapshot"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
