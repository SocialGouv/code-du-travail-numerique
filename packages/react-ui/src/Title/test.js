import React from "react";
import { render } from "@testing-library/react";
import { PageTitle } from ".";

describe("<Title />", () => {
  test("should render a title ", () => {
    const { container } = render(
      <PageTitle desc="Hello">Lorem Ipsum</PageTitle>
    );
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        margin: 2rem 0 2rem 0;
        color: #005994;
        font-weight: normal;
        font-size: 2.25rem;
        font-family: Muli,-apple-system,BlinkMacSystemFont,"Helvetica Neue", Helvetica,Arial,sans-serif;
        line-height: 1.4;
      }

      <div>
        <h1
          class="c0"
        >
          Lorem Ipsum
        </h1>
      </div>
    `);
  });
  test("should render as h2 ", () => {
    const { container } = render(
      <PageTitle desc="Hello">Lorem Ipsum</PageTitle>
    );
    expect(container).toMatchInlineSnapshot(`
      .c0 {
        margin: 2rem 0 2rem 0;
        color: #005994;
        font-weight: normal;
        font-size: 2.25rem;
        font-family: Muli,-apple-system,BlinkMacSystemFont,"Helvetica Neue", Helvetica,Arial,sans-serif;
        line-height: 1.4;
      }

      <div>
        <h1
          class="c0"
        >
          Lorem Ipsum
        </h1>
      </div>
    `);
  });
});
