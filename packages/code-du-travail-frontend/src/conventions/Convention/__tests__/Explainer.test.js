import React from "react";
import { fireEvent, render, wait } from "../../../../test/utils";
import Explainer from "../Explainer";

describe("<Explainer />", () => {
  it("is togglable", async () => {
    const { getByText, queryByText, container } = render(<Explainer />);
    fireEvent.click(
      getByText(/Plus d’informations sur les conventions collectives/)
    );
    await wait(() => {
      queryByText(/Qu’est ce qu’une convention collective \?/) === null;
    });
    expect(container).toMatchSnapshot();
  });
});
