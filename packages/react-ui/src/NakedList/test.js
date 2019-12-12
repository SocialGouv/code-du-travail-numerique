import React from "react";
import { render } from "@testing-library/react";
import { NakedList } from ".";

describe("<Naked />", () => {
  it("renders", () => {
    const { container } = render(
      <NakedList>
        <li>OK</li>
        <li>sure</li>
      </NakedList>
    );
    expect(container).toMatchSnapshot();
  });
});
