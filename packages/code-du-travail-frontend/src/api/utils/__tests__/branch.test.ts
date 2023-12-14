import { removeLinked } from "../branch";

describe("removeLinked", () => {
  it('removes "linked/" from a string', () => {
    const str = "linked/foo";
    expect(removeLinked(str)).toBe("foo");
  });

  it('removes "linked-" from a string', () => {
    const str = "linked-foo";
    expect(removeLinked(str)).toBe("foo");
  });

  it('does not modify string without "linked"', () => {
    const str = "foo";
    expect(removeLinked(str)).toBe("foo");
  });

  it('removes one "linked" occurrences', () => {
    const str = "linked/linked-foo";
    expect(removeLinked(str)).toBe("linked-foo");
  });
});
