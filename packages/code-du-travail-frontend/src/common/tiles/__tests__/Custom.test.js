import React from "react";
import { render } from "@testing-library/react";
import { CustomTile } from "../Custom";
import { icons } from "@socialgouv/react-ui/";

const tileProps = {
  action: "Bonjour",
  icon: icons.Salary,
  title: "Saluez moi"
};

describe("<Article />", () => {
  test("should render", () => {
    const { container } = render(
      <CustomTile {...tileProps}>
        Cette tuile vous fera dire bonjour !
      </CustomTile>
    );
    expect(container).toMatchSnapshot();
  });
});
