import React from "react";
import { render } from "@testing-library/react";
import Theme from "../pages/themes/[slug]";

/* Hard hard fail at mocking necessary call for this page to work correctly */

// import { fetchSearchResults } from "../src/search/search.service.js";

// jest.mock("../src/search/search.service.js", () => ({
//   fetchSearchResults: jest.fn()
// }));

// fetchSearchResults.mockResolvedValue({
//   items: [
//     {
//       _id: "id",
//       _source: {
//         source: "faq",
//         title: "ca marche pas",
//         slug: "et je ne comprends pas pourquoi"
//       }
//     }
//   ]
// });

describe("<Theme />", () => {
  it("should render", () => {
    const { container } = render(<Theme />);
    expect(container).toMatchSnapshot();
  });
});
