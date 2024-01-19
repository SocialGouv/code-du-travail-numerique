import React from "react";
import { Breadcrumb } from "@socialgouv/cdtn-utils";
import { Breadcrumb as BreadcrumbDsfr } from "@codegouvfr/react-dsfr/Breadcrumb";

type Props = {
  items: Breadcrumb[];
  currentPage: string;
};

export default function Breadcrumbs({
  items,
  currentPage,
}: Props): JSX.Element {
  if (!items || items.length === 0) {
    return <></>;
  }
  return (
    <BreadcrumbDsfr
      currentPageLabel={currentPage}
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
