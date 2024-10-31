"use client";

import React, { useEffect } from "react";
import { Breadcrumb as BreadcrumbType } from "@socialgouv/cdtn-types";
import { Feedback } from "../layout/feedback";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { fr } from "@codegouvfr/react-dsfr";
import { DownloadTile } from "./components/DownloadTile";
import { CopyButton } from "./components/CopyButton";
import { LetterModelContent } from "./components/LetterModelContent";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { useTrackCopy } from "./tracking";

export interface LetterModelProps {
  breadcrumbs: BreadcrumbType[];
  date: string;
  intro: string;
  title: string;
  relatedItems: Array<any>;
  metaDescription: string;
  filesize: number;
  filename: string;
  html: any;
  slug: string;
}

export const LetterModel = ({
  breadcrumbs,
  filename,
  filesize,
  html,
  slug,
  relatedItems,
  title,
  metaDescription,
  intro,
  date,
}: LetterModelProps) => {
  const trackCopy = useTrackCopy(slug);

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
            html={html}
          ></LetterModelContent>
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
                title={title}
              ></DownloadTile>
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
