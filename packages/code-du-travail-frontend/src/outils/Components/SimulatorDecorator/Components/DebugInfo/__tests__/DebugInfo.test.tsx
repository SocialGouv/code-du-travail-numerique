import { render } from "@testing-library/react";
import React from "react";
import DebugInfo from "../index";

describe("DebugInfo", () => {
  it("should show the form values in pretty format", () => {
    const { container } = render(
      <DebugInfo formValues={{ name: "John", surname: "Doe" }} />
    );
    const pre = container.querySelector("pre");
    expect(pre).not.toBeNull();
    expect(pre?.innerHTML).toBe(
      "{\n" + '  "name": "John",\n' + '  "surname": "Doe"\n' + "}"
    );
  });
});
