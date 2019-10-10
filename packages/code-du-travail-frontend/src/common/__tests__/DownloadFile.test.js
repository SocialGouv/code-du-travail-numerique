import React from "react";
import { render, getByTitle } from "@testing-library/react";
import { DownloadFile } from "../DownloadFile";

describe("<DownloadFile />", () => {
  it("should render with courrier icon", () => {
    const { container } = render(
      <DownloadFile title="FooFile" file="http://file.url" type="Courrier" />
    );
    expect(container).toMatchSnapshot();
    const textContent = getByTitle(
      container,
      "Télécharger le courrier type"
    ).textContent.trim();
    expect(textContent).toMatch(/FooFile/);
    expect(textContent).toMatch(/Courrier/);
    expect(textContent).toMatch(/url$/);
  });
});
