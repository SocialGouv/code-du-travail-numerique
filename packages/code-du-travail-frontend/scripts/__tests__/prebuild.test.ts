import { filePath, generateRobotsTxt } from "../prebuild";
import fs from "fs";

jest.mock("fs");

describe("robots.txt", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should generate production robots.txt", () => {
    const host = "localhost";
    const robotsProd = [
      "User-agent: *",
      "Disallow: /assets/",
      "Disallow: /images/",
      "",
      `Sitemap: https://${host}/sitemap.xml`,
    ].join("\n");
    generateRobotsTxt(true, host);
    expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, robotsProd);
  });
  it("should generate development robots.txt", () => {
    const host = "localhost";
    const robotsDev = ["User-agent: *", "Disallow: /"].join("\n");
    generateRobotsTxt(false, host);
    expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, robotsDev);
  });
});
