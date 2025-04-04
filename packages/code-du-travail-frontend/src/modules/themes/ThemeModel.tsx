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
        <ul className={`${fr.cx("fr-mt-6w", "fr-mx-md-6w")} ${ul}`}>
          {theme.children.map((child) => {
            return (
              <li key={child.slug} className={`${fr.cx("fr-m-3v")} ${li}`}>
                <Button
                  priority="secondary"
                  linkProps={{
                    href: `/${getRouteBySource(SOURCES.THEMES)}/${child.slug}`,
                  }}
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
                desc={refs.description}
                horizontal
                linkProps={{
                  href: `/${getRouteBySource(refs.source)}/${refs.slug}`,
                  onClick: () =>
                    emitDocumentClickButtonEvent(refs.source, refs.slug),
                }}
                size="medium"
                title={refs.title}
                titleAs="h2"
                enlargeLink
                end={
                  <p className={fr.cx("fr-m-0", "fr-text--xs")}>Consulter</p>
                }
                classes={{
                  start: fr.cx("fr-mb-2w"),
                  end: fr.cx("fr-text--xs"),
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
});

const li = css({
  listStyle: "none!",
});
