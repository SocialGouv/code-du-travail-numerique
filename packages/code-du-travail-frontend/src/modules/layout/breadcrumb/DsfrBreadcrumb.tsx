"use client";

import Breadcrumb, {
  type BreadcrumbProps,
} from "@codegouvfr/react-dsfr/Breadcrumb";

/**
 * Client boundary around the DSFR breadcrumb.
 *
 * DSFR renders its links with the `Link` registered by `DsfrHead`, and that
 * registration only happens in the client bundle. Rendered as a server
 * component, the breadcrumb falls back to a plain `<a>` and every click
 * reloads the whole page instead of navigating client-side.
 */
export const DsfrBreadcrumb = (props: BreadcrumbProps) => (
  <Breadcrumb {...props} />
);
