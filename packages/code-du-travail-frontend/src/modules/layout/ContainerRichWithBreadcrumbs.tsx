import { fr } from "@codegouvfr/react-dsfr";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { ContainerRichProps } from "./ContainerRich";
import { Breadcrumb as BreadcrumbType } from "@socialgouv/cdtn-types";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { Feedback } from "./feedback";
import React from "react";
import { BreadcrumbListJsonLd } from "../seo/jsonld";
import { WhatsNewLink } from "./whatsnew";

type Props = ContainerRichProps & {
  currentPage: string;
  breadcrumbs: BreadcrumbType[];
  showShare?: boolean;
};

export const ContainerRichWithBreadcrumbs = ({
  children,
  relatedItems,
  title,
  description,
  breadcrumbs,
  currentPage,
  showFeedback = true,
  showWhatsNewLink = false,
  showShare = false,
}: Props) => {
  return (
    <div>
      <BreadcrumbListJsonLd
        currentPageLabel={currentPage}
        items={breadcrumbs.map(({ label, slug }) => ({
          label,
          href: slug,
        }))}
      />
      <Breadcrumb
        currentPageLabel={currentPage}
        homeLinkProps={{
          href: "/",
        }}
        segments={breadcrumbs.map(({ label, slug }) => ({
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
