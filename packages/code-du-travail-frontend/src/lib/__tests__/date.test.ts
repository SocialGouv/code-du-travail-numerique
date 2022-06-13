import { isValidDate } from "../date";

describe("isValidDate", () => {
  test.each`
    date            | expected
    ${"21/02/2020"} | ${true}
    ${"21-02-2020"} | ${false}
    ${"2020-02-02"} | ${false}
    ${"21/2/2020"}  | ${false}
    ${"21/2/2"}     | ${false}
    ${"abc"}        | ${false}
    ${undefined}    | ${false}
    ${null}         | ${false}
    ${"18/02/2120"} | ${false}
    ${"18/02/1830"} | ${false}
    ${"18/02/1922"} | ${true}
  `("should return $expected for this date $date", ({ date, expected }) => {
    expect(isValidDate(date)).toBe(expected);
  });
});
