import React from "react";
import { render, fireEvent, wait } from "react-testing-library";

import { mockFetch } from "../../../test/mockFetch";
import ListTextes from "../Convention/ListTextes";
import { containerAndTexteDeBase, textesSalaires } from "./sampleData";

/**
 * TODO: mock response so snapshot show real ui, but we have
 * Commented out because of an "act" warning. Possible auto-fix with react 16.9
 * https://github.com/testing-library/react-testing-library/issues/281
 **/

describe("<ListTextes />", () => {
  mockFetch(Promise.resolve({ _source: textesSalaires }));
  it("renders a list of textes", async () => {
    const { container } = render(
      <ListTextes
        conventionId={containerAndTexteDeBase.id}
        typeTextes={"salaires"}
      />
    );
    await wait(() => {});
    expect(container).toMatchSnapshot();
  });

  it("renders a text", async () => {
    const { container, getByText } = render(
      <ListTextes
        conventionId={containerAndTexteDeBase.id}
        typeTextes={"salaires"}
      />
    );
    await wait(() => {});
    const articleLink = getByText(/Avenant n/);
    fireEvent.click(articleLink);
    expect(container).toMatchSnapshot();
  });
});
