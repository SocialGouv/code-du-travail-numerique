import { icons } from "@socialgouv/cdtn-ui/";
import { render } from "@testing-library/react";
import React from "react";

import { CallToActionTile } from "../CallToAction";

const tileProps = {
  action: "Bonjour",
  href: "/test",
  icon: icons.Salary,
  title: "Saluez moi",
};

describe("<CallToActionTile />", () => {
  test("should render", () => {
    const { container } = render(
      <CallToActionTile {...tileProps}>
        <p>Cette tuile vous fera dire bonjour !</p>
      </CallToActionTile>
    );
    expect(container).toMatchSnapshot();
  });
});
