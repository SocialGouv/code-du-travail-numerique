"use client";

import React, { useEffect } from "react";
import { MailElasticDocument } from "@socialgouv/cdtn-types";
import { Feedback } from "../layout/feedback";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { fr } from "@codegouvfr/react-dsfr";
import { DownloadTile } from "./components/DownloadTile";
import { CopyButton } from "./components/CopyButton";
import { LetterModelContent } from "./components/LetterModelContent";
import { RelatedItem } from "../documents";
import { useModeleEvents } from "./tracking";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";

export type LetterModelProps = Pick<
  MailElasticDocument,
  | "breadcrumbs"
  | "date"
  | "intro"
  | "title"
  | "filesize"
  | "filename"
  | "html"
  | "slug"
  | "metaDescription"
> & {
  relatedItems: { items: RelatedItem[]; title: string }[];
} & {
  extension: string;
};

export const LetterModel = ({
  breadcrumbs,
  filename,
  filesize,
  extension,
  html,
  slug,
  relatedItems,
  title,
  metaDescription,
  intro,
  date,
}: LetterModelProps) => {
  const trackCopy = useModeleEvents(slug);

  useEffect(() => {
    document.addEventListener("copy", trackCopy);
    return () => {
      document.removeEventListener("copy", trackCopy);
    };
  }, [trackCopy]);

  return (
    <>
      <Breadcrumb
        currentPageLabel={title}
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
        <div className={fr.cx("fr-col-12", "fr-col-md-7")}>
          <h1 className={fr.cx("fr-mb-6w")}>{title}</h1>
          <LetterModelContent
            slug={slug}
            date={date}
            intro={intro}
            title={title}
            filesize={filesize}
            filename={filename}
            extension={extension}
            html={html}
          />
          <Feedback />
        </div>

        <div
          className={fr.cx("fr-col-12", "fr-col-offset-md-1", "fr-col-md-4")}
        >
          <div className={fr.cx("fr-hidden", "fr-unhidden-md")}>
            <div className={fr.cx("fr-mb-6w")}>
              <DownloadTile
                filename={filename}
                filesize={filesize}
                extension={extension}
                title={title}
              />
            </div>
            <CopyButton slug={slug} />
          </div>
          <RelatedItems relatedItems={relatedItems} />
          <Share title={title} metaDescription={metaDescription} />
        </div>
      </div>
    </>
  );
};
