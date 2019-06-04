import React from "react";
import { render } from "react-testing-library";
import { Category } from ".";

describe("<Category />", () => {
  test("should render with default props", () => {
    const { container } = render(
      <Category
        title="title"
        text="texte"
        icon="https://rawgit.com/SocialGouv/code-du-travail-html/master/docs/assets/icons/handshake.svg"
      />
    );
    expect(container).toMatchSnapshot();
  });
  test("should render small", () => {
    const { container } = render(
      <Category
        small
        title="title"
        text="texte"
        icon="https://rawgit.com/SocialGouv/code-du-travail-html/master/docs/assets/icons/handshake.svg"
      />
    );
    expect(container).toMatchSnapshot();
  });
});
