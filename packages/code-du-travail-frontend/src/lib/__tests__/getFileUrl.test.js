import { toUrl } from "../getFileUrl";

describe("toUrl", () => {
  test("should return a url for a file", () => {
    expect(toUrl("io.md")).toBe("azure.url/cdtn/io.md");
  });

  test("should return a url from a url", () => {
    expect(toUrl("complete.url/dev/io.md")).toBe("azure.url/cdtn/io.md");
  });

  test("should return input if no match", () => {
    expect(toUrl()).toBe(undefined);
  });
});
