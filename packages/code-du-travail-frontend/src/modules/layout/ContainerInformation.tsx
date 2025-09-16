import { fr } from "@codegouvfr/react-dsfr";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { ContainerRichProps } from "./ContainerRich";
import { Breadcrumb as BreadcrumbType } from "@socialgouv/cdtn-types";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { Feedback } from "./feedback";
import React from "react";
import { GraphicContentPart } from "@socialgouv/cdtn-types/build/hasura/editorial-content";
import { KeysToCamelCase } from "../informations/type";
import { DownloadTile } from "../informations/components/DownloadTile";

type Props = ContainerRichProps & {
  currentPage: string;
  breadcrumbs: BreadcrumbType[];
  header: React.ReactNode;
  infography?: KeysToCamelCase<GraphicContentPart>;
  dismissalProcess?: boolean;
};

export const ContainerInformation = ({
  header,
  children,
  relatedItems,
  title,
  description,
  breadcrumbs,
  currentPage,
  infography,
  dismissalProcess,
}: Props) => {
  return (
    <div>
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
      {dismissalProcess && header}
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
          {!dismissalProcess && header}
          {children}
          <Feedback />
        </div>

        <div
          className={fr.cx("fr-col-12", "fr-col-offset-md-1", "fr-col-md-4")}
        >
          {infography && (
            <div className={fr.cx("fr-hidden", "fr-unhidden-md")}>
              <div className={fr.cx("fr-mb-6w")}>
                <DownloadTile
                  filename={infography.fileUrl}
                  filesize={infography.size}
                  titleAs={"h2"}
                />
              </div>
            </div>
          )}

          <RelatedItems relatedItems={relatedItems} />
          <Share title={title} metaDescription={description} />
        </div>
      </div>
    </div>
  );
};
