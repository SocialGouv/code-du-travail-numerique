"use client";

import React, { useEffect } from "react";
import { MailElasticDocument } from "@socialgouv/cdtn-types";
import { Feedback } from "../layout/feedback";
import { RelatedItems } from "../common/RelatedItems";
import { fr } from "@codegouvfr/react-dsfr";
import { DownloadTile } from "./components/DownloadTile";
import { CopyButton } from "./components/CopyButton";
import { LetterModelContent } from "./components/LetterModelContent";
import { RelatedItem } from "../documents";
import { useModeleEvents } from "./tracking";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { ArticleJsonLd, BreadcrumbListJsonLd } from "../seo/jsonld";
import { ThemeTags } from "../common/ThemeTags";
import { notifyNpsTrigger } from "../nps/triggerBus";
import { NpsTrigger } from "../nps/constants";

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
  intro,
  date,
}: LetterModelProps) => {
  const trackCopy = useModeleEvents(slug);

  useEffect(() => {
    const onCopy = () => {
      trackCopy();
      // Déclencheur NPS : copie du contenu (Ctrl+C) sur un modèle de courrier.
      notifyNpsTrigger(NpsTrigger.COPY);
    };
    document.addEventListener("copy", onCopy);
    return () => {
      document.removeEventListener("copy", onCopy);
    };
  }, [trackCopy]);

  return (
    <>
      <BreadcrumbListJsonLd
        currentPageLabel={title}
        items={breadcrumbs.map(({ label, slug }) => ({
          label,
          href: slug,
        }))}
      />
      <ArticleJsonLd
        title={title}
        datePublished={date}
        breadcrumbs={breadcrumbs}
      />
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
        <div className={fr.cx("fr-col-12", "fr-col-lg-7")}>
          <h1 className={fr.cx("fr-mb-6w")}>{title}</h1>
          <ThemeTags breadcrumbs={breadcrumbs} />
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
          className={fr.cx("fr-col-12", "fr-col-offset-lg-1", "fr-col-lg-4")}
        >
          <div className={fr.cx("fr-hidden", "fr-unhidden-lg")}>
            {/* onClickCapture : le clic sur le lien de téléchargement bulle
                jusqu'ici et arme le déclencheur NPS (modèles de courrier). */}
            <div
              className={fr.cx("fr-mb-6w")}
              onClickCapture={() => notifyNpsTrigger(NpsTrigger.DOWNLOAD)}
            >
              <DownloadTile
                filename={filename}
                filesize={filesize}
                extension={extension}
                title={title}
                titleAs={"h3"}
              />
            </div>
            <CopyButton slug={slug} />
          </div>
          <RelatedItems relatedItems={relatedItems} />
        </div>
      </div>
    </>
  );
};
