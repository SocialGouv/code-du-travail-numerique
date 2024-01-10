import React from "react";
import { Breadcrumb } from "@socialgouv/cdtn-utils";
import { Breadcrumb as BreadcrumbDsfr } from "@codegouvfr/react-dsfr/Breadcrumb";

type Props = {
  items: Breadcrumb[];
};

export default function Breadcrumbs({ items }: Props): JSX.Element {
  if (!items || items.length === 0) {
    return <></>;
  }
  return (
    <BreadcrumbDsfr
      currentPageLabel=""
      homeLinkProps={{
        href: "/",
      }}
      segments={items.map(({ label, slug }) => ({
        label,
        linkProps: {
          href: slug,
        },
      }))}
    />
  );
}
