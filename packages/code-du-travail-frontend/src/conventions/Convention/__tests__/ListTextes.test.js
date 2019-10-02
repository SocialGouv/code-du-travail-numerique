import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

import ListTextes from "../ListTextes";

describe("<ListTextes />", () => {
  it("renders a list of textes", async () => {
    const { container } = render(
      <ListTextes conventionId={"ok"} typeTextes={"salaires"} />
    );
    await wait(() => {});
    expect(container).toMatchSnapshot();
  });

  it("renders a text", async () => {
    const { container, getByText } = render(
      <ListTextes conventionId={"toujours ok"} typeTextes={"salaires"} />
    );
    await wait(() => {});
    const articleLink = getByText(/Avenant n/);
    fireEvent.click(articleLink);
    expect(container).toMatchSnapshot();
  });
});
