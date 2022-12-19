import { dateOneDayLater } from "../date";

describe("dateOneDayLater", () => {
  test("increment one day", () => {
    const newDate = dateOneDayLater("31/01/2022");
    expect(newDate).toBe("01/02/2022");
  });
});
