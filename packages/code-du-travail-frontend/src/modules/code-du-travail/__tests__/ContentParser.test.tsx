import { render } from "@testing-library/react";
import { ContentParser } from "../ContentParser";

describe("CDT content parser", () => {
  test("should move space at the end of link to the end of link tag", () => {
    const html = `<a href="https://test.com">text </a>to test`;
    const { baseElement } = render(<ContentParser>{html}</ContentParser>);

    expect(baseElement.outerHTML).toEqual(
      `<body><div><a href="https://test.com">text</a> to test</div></body>`
    );
  });
});
