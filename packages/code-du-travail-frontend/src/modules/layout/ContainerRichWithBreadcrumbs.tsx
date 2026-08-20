import { fr } from "@codegouvfr/react-dsfr";
import { Breadcrumbs, BreadcrumbSegment } from "./breadcrumb";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { ContainerRichProps } from "./ContainerRich";
import { Feedback } from "./feedback";
import React from "react";
import { WhatsNewLink } from "./whatsnew";

type Props = ContainerRichProps & {
  currentPage: string;
  breadcrumbSegments?: BreadcrumbSegment[];
  showShare?: boolean;
};

export const ContainerRichWithBreadcrumbs = ({
  children,
  relatedItems,
  title,
  description,
  breadcrumbSegments = [],
  currentPage,
  showFeedback = true,
  showWhatsNewLink = false,
  showShare = false,
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
          {children}
          {showFeedback && <Feedback />}
        </div>

        <div
          className={fr.cx("fr-col-12", "fr-col-offset-md-1", "fr-col-md-4")}
        >
          {showWhatsNewLink && <WhatsNewLink />}
          <RelatedItems relatedItems={relatedItems} />
          {showShare && <Share title={title} metaDescription={description} />}
        </div>
      </div>
    </div>
  );
};
