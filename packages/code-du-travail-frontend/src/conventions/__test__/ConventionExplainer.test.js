import React from "react";
import { fireEvent, render, wait } from "react-testing-library";
import ConventionExplainer from "../ConventionExplainer";

describe("<ConventionExplainer />", () => {
  it("should render", () => {
    const { container } = render(<ConventionExplainer />);
    expect(container).toMatchSnapshot();
  });

  it("is togglable", async () => {
    const { getByText, queryByText, container } = render(
      <ConventionExplainer />
    );
    fireEvent.click(getByText(/Explications sur les conventions/));
    await wait(() => {
      queryByText(/Qu'est ce qu'une convention collective \?/) == null;
    });
    expect(container).toMatchSnapshot();
  });
});
