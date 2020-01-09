import React from "react";
import { render } from "@testing-library/react";
import { CallToActionTile } from "../CallToAction";
import { icons } from "@socialgouv/react-ui/";

const tileProps = {
  action: "Bonjour",
  icon: icons.Salary,
  title: "Saluez moi"
};

describe("<Article />", () => {
  test("should render", () => {
    const { container } = render(
      <CallToActionTile {...tileProps}>
        Cette tuile vous fera dire bonjour !
      </CallToActionTile>
    );
    expect(container).toMatchSnapshot();
  });
});
