import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumbs, BreadcrumbSegment } from "./breadcrumb";
import { RelatedItems } from "../common/RelatedItems";
import { ContainerRichProps } from "./ContainerRich";
import { Feedback } from "./feedback";
import React from "react";

type Props = ContainerRichProps & {
  currentPage: string;
  breadcrumbSegments?: BreadcrumbSegment[];
  header: React.ReactNode;
};

export const ContainerInformation = ({
  header,
  children,
  relatedItems,
  breadcrumbSegments = [],
  currentPage,
}: Props) => {
  return (
    <div>
      <Breadcrumbs
        currentPageLabel={currentPage}
        segments={breadcrumbSegments}
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
          {header}
          {children}
          <Feedback />
        </div>

        <div
          className={fr.cx("fr-col-12", "fr-col-offset-md-1", "fr-col-md-4")}
        >
          <RelatedItems relatedItems={relatedItems} />
        </div>
      </div>
    </div>
  );
};
