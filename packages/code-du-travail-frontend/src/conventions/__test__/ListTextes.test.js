import React from "react";
import { render, fireEvent, wait } from "@testing-library/react";

import ListTextes from "../Convention/ListTextes";
import {
  containerAndTexteDeBase,
  textesSalaires
} from "./api.conventions.mock";

jest.mock("isomorphic-unfetch");
import fetch from "isomorphic-unfetch";
import { fetchResponse } from "../../../test/mockFetch";

/**
 * TODO: mock response so snapshot show real ui, but we have
 * Commented out because of an "act" warning. Possible auto-fix with react 16.9
 * https://github.com/testing-library/react-testing-library/issues/281
 **/

describe("<ListTextes />", () => {
  fetch.mockResolvedValue(fetchResponse({ _source: textesSalaires }));
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
