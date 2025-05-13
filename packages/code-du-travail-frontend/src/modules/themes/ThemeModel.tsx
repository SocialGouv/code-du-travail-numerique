"use client";

import { fr } from "@codegouvfr/react-dsfr";
import React from "react";
import { ThemeElasticDocument } from "@socialgouv/cdtn-types/build/elastic/theme";
import { ContainerList } from "../layout/ContainerList";
import Button from "@codegouvfr/react-dsfr/Button";
import { css } from "@styled-system/css";
import Card from "@codegouvfr/react-dsfr/Card";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { useThemeTracking } from "./tracking";
import { summarize } from "../utils";
import { DocumentRef } from "@socialgouv/cdtn-types";

type ExternalRef = DocumentRef & {
  source: "external";
  url: string;
};

type Props = {
  theme: Pick<
    ThemeElasticDocument,
    "title" | "description" | "children" | "refs" | "breadcrumbs"
  >;
};

export const ThemeModel = ({ theme }: Props) => {
  const { emitDocumentClickButtonEvent } = useThemeTracking();
  return (
    <ContainerList
      title={theme.title}
      segments={theme.breadcrumbs.map((breadcrumb) => ({
        label: breadcrumb.label,
        linkProps: { href: breadcrumb.slug },
      }))}
    >
      <h1 id="themes" className={fr.cx("fr-mt-0", "fr-mb-6w")}>
        {theme.title}
      </h1>

      {theme.description && theme.description != "" && (
        <p className={fr.cx("fr-text--md")}>{theme.description}</p>
      )}

      {theme.children && theme.children.length > 0 && (
        <ul className={`${fr.cx("fr-mt-6w", "fr-mx-md-3w")} ${ul}`}>
          {theme.children.map((child) => {
            return (
              <li key={child.slug} className={`${fr.cx("fr-m-3v")} ${li}`}>
                <Button
                  priority="secondary"
                  linkProps={{
                    href: `/${getRouteBySource(SOURCES.THEMES)}/${child.slug}`,
                  }}
                  size="large"
                  className={link}
                >
                  {child.label}
                </Button>
              </li>
            );
          })}
        </ul>
      )}

      <ul
        className={`${fr.cx(
          "fr-mt-6w",
          "fr-grid-row",
          "fr-grid-row--gutters",
          "fr-grid-row--left"
        )}`}
      >
        {theme.refs.map((refs) => {
          return (
            <li
              key={refs.slug}
              className={`${fr.cx(
                "fr-col-12",
                "fr-col-sm-12",
                "fr-col-md-6",
                "fr-col-lg-6"
              )} ${li}`}
            >
              <Card
                border
                desc={summarize(refs.description)}
                horizontal
                linkProps={{
                  href:
                    refs.source === "external"
                      ? (refs as unknown as ExternalRef).url
                      : `/${getRouteBySource(refs.source)}/${refs.slug}`,
                  onClick: () =>
                    refs.source === "external"
                      ? emitDocumentClickButtonEvent(
                          refs.source,
                          refs.slug,
                          (refs as unknown as ExternalRef).url
                        )
                      : emitDocumentClickButtonEvent(refs.source, refs.slug),
                }}
                size="medium"
                title={refs.title}
                titleAs="h2"
                enlargeLink
                classes={{
                  start: fr.cx("fr-mb-2w"),
                }}
              />
            </li>
          );
        })}
      </ul>
    </ContainerList>
  );
};

const ul = css({
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  justifyContent: "center",
  padding: "0 !important",
});

const li = css({
  listStyle: "none!",
});

const link = css({
  textAlign: "center",
});
