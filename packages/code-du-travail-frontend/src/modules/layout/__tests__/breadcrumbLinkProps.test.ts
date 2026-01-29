import { getPathFromBreadcrumbLinkProps } from "../breadcrumbLinkProps";

describe("getPathFromBreadcrumbLinkProps", () => {
  it("returns href when href is a string", () => {
    expect(getPathFromBreadcrumbLinkProps({ href: "/foo" } as any)).toBe(
      "/foo"
    );
  });

  it("returns pathname when href is an object", () => {
    expect(
      getPathFromBreadcrumbLinkProps({ href: { pathname: "/bar" } } as any)
    ).toBe("/bar");
  });

  it("returns fallback when pathname is missing", () => {
    expect(getPathFromBreadcrumbLinkProps({ href: {} } as any, "/")).toBe("/");
    expect(
      getPathFromBreadcrumbLinkProps({ href: {} } as any, "/fallback")
    ).toBe("/fallback");
  });
});
