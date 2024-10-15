"use client";

import React, { useCallback, useEffect } from "react";
import { Breadcrumb } from "@socialgouv/cdtn-types";
import { MatomoActionEvent, MatomoBaseEvent } from "../../lib";
import { push as matopush } from "@socialgouv/matomo-next";
import { Feedback } from "../layout/feedback";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { fr } from "@codegouvfr/react-dsfr";
import { DownloadTile } from "./components/DownloadTile";
import { CopyButton } from "./components/CopyButton";
import { LetterModelContent } from "./components/LetterModelContent";

export interface LetterModelProps {
  breadcrumbs: Breadcrumb[];
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
  const trackCopy = useCallback(() => {
    matopush([
      MatomoBaseEvent.TRACK_EVENT,
      MatomoBaseEvent.PAGE_MODELS,
      MatomoActionEvent.TYPE_CTRL_C,
      slug,
    ]);
  }, []);

  useEffect(() => {
    document.addEventListener("copy", trackCopy);
    return () => {
      document.removeEventListener("copy", trackCopy);
    };
  }, [trackCopy]);

  return (
    <div
      className={fr.cx(
        "fr-grid-row",
        "fr-grid-row--gutters",
        "fr-my-4w",
        "fr-my-md-12w"
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

      <div className={fr.cx("fr-col-12", "fr-col-offset-md-1", "fr-col-md-4")}>
        <div className={fr.cx("fr-hidden", "fr-unhidden-md")}>
          <div className={fr.cx("fr-mb-6w")}>
            <DownloadTile
              filename={filename}
              filesize={filesize}
              title={title}
            ></DownloadTile>
          </div>
          <CopyButton />
        </div>
        <RelatedItems relatedItems={relatedItems} />
        <Share title={title} metaDescription={metaDescription} />
      </div>
    </div>
  );
};
