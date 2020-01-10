import React from "react";
import { render } from "@testing-library/react";
import Header from "../Header";

describe("<Header />", () => {
  const constantDate = new Date("2020-01-01T12:00:00");

  beforeAll(() => {
    global.Date = class extends Date {
      constructor() {
        super();
        return constantDate;
      }
    };
  });
  it("should render", () => {
    const { container } = render(<Header />);
    expect(container).toMatchSnapshot();
  });
});
