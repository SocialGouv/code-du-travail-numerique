import React from "react";
import { render } from "@testing-library/react";
import { DownloadFile } from "../DownloadFile";

describe("<DownloadFile />", () => {
  it("should render with courrier icon", () => {
    const { container } = render(
      <DownloadFile title="FooFile" file="http://file.url" type="Courrier" />
    );
    expect(container).toMatchSnapshot();
  });
});
