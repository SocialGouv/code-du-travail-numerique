import React from "react";
import { render } from "@wrapped-testing-library/react";
import Metas from "../Metas";

describe("<Metas />", () => {
  it("should render", () => {
    const url = "test.url";
    const title = "title";
    const description = "description";
    const image = "image.url";
    const { container } = render(
      <Metas url={url} title={title} description={description} image={image} />
    );
    expect(container).toMatchSnapshot();
  });
});
