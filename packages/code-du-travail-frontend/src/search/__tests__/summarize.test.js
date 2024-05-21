import { summarize } from "../utils";

describe("utils summarize", () => {
  it("should handle html tags", () => {
    expect(summarize("<p>test1 test2&nbsp;test3</p>")).toEqual(
      "test1 test2 test3"
    );
  });
});
