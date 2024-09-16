import { getBaseUrl } from "../index";

describe("getBaseUrl", () => {
  it("should remove query parameters from the URL", () => {
    const url = "https://example.com/page?param=value";
    const result = getBaseUrl(url);
    expect(result).toBe("https://example.com/page");
  });

  it("should return the same URL if there are no query parameters", () => {
    const url = "https://example.com/page";
    const result = getBaseUrl(url);
    expect(result).toBe(url);
  });

  it("should handle URLs with multiple query parameters", () => {
    const url = "https://example.com/page?param1=value1&param2=value2";
    const result = getBaseUrl(url);
    expect(result).toBe("https://example.com/page");
  });

  it("should handle URLs with hash fragments", () => {
    const url = "https://example.com/page?param=value#section";
    const result = getBaseUrl(url);
    expect(result).toBe("https://example.com/page");
  });

  it("should handle URLs with no path", () => {
    const url = "https://example.com?param=value";
    const result = getBaseUrl(url);
    expect(result).toBe("https://example.com");
  });
});
