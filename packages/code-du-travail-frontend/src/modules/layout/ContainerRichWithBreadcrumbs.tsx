import { fr } from "@codegouvfr/react-dsfr";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { ContainerRichProps } from "./ContainerRich";
import { Breadcrumb as BreadcrumbType } from "@socialgouv/cdtn-types";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { Feedback } from "./feedback";
import React from "react";

type Props = ContainerRichProps & {
  currentPage: string;
  breacrumbs: BreadcrumbType[];
};

export const ContainerRichWithBreadcrumbs = ({
  children,
  relatedItems,
  title,
  description,
  breacrumbs,
  currentPage,
}: Props) => {
  return (
    <div>
      <Breadcrumb
        currentPageLabel={currentPage}
        homeLinkProps={{
          href: "/",
        }}
        segments={breacrumbs.map(({ label, slug }) => ({
          label: <>{label}</>,
          linkProps: { href: slug },
        }))}
        className={fr.cx("fr-mb-2w", "fr-mt-2w")}
      />
      <div
        className={fr.cx(
          "fr-grid-row",
          "fr-grid-row--gutters",
          "fr-mb-4w",
          "fr-mb-md-12w"
        )}
      >
        <div
          className={fr.cx(
            "fr-col-12",
            "fr-col-md-7",
            "fr-mb-6w",
            "fr-mb-md-0"
          )}
        >
          {children}
          <Feedback />
        </div>

        <div
          className={fr.cx("fr-col-12", "fr-col-offset-md-1", "fr-col-md-4")}
        >
          <RelatedItems relatedItems={relatedItems} />
          <Share title={title} metaDescription={description} />
        </div>
      </div>
    </div>
  );
};
