import type { BreadcrumbProps } from "@codegouvfr/react-dsfr/Breadcrumb";

type Segment = NonNullable<BreadcrumbProps["segments"]>[number];
type SegmentLinkProps = Segment["linkProps"];

export function getPathFromBreadcrumbLinkProps(
  linkProps: SegmentLinkProps,
  fallbackPathname = "/"
): string {
  const href = linkProps?.href as unknown;

  if (typeof href === "string") return href;

  if (href && typeof href === "object") {
    const pathname = (href as { pathname?: unknown }).pathname;
    if (typeof pathname === "string") return pathname;
  }

  return fallbackPathname;
}
