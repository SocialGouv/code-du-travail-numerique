import { filePath, generateRobotsTxt } from "../prebuild";
import fs from "fs";

jest.mock("fs");

describe("robots.txt", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it("should generate production robots.txt", () => {
    const robotsProd = [
      "User-agent: *",
      "Disallow: /assets/",
      "Disallow: /images/",
      "",
      `Sitemap: https://code.travail.gouv.fr/sitemap.xml`,
    ].join("\n");
    generateRobotsTxt(true, "code.travail.gouv.fr");
    expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, robotsProd);
  });
  it("should generate development robots.txt", () => {
    const robotsDev = ["User-agent: *", "Disallow: /"].join("\n");
    generateRobotsTxt(false, "localhost");
    expect(fs.writeFileSync).toHaveBeenCalledWith(filePath, robotsDev);
  });
});
