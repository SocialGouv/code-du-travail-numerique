import { dateOneDayLater } from "../date";

describe("dateOneDayLater", () => {
  test("increment one day", () => {
    expect(dateOneDayLater("31/01/2022")).toBe("01/02/2022");
  });
});
