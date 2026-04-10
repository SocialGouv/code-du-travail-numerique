"use client";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { css } from "@styled-system/css";
import DisplayContent from "../common/DisplayContent";
import { badgeColorClasses, getSourceLabel } from "./utils";
import { routeBySource } from "@socialgouv/cdtn-utils";

type SearchCardProps = {
  id?: string;
  title: string;
  description: string;
  source?: keyof typeof routeBySource;
  link: string;
  onClick?: () => void;
};

export const SearchCard: React.FC<SearchCardProps> = ({
  id,
  title,
  description,
  source,
  link,
  onClick,
}) => {
  return (
    <Card
      start={
        source ? (
          <p
            className={`${fr.cx("fr-tag", "fr-tag--sm", "fr-text--xs", "fr-text--bold")} ${badgeColorClasses[source]}`}
          >
            {getSourceLabel(source)}
          </p>
        ) : null
      }
      border
      horizontal
      title={title}
      titleAs="h3"
      size="medium"
      enlargeLink
      linkProps={{
        id: id,
        href: link,
        onClick: onClick,
      }}
      desc={
        <span className={contentLimited}>
          <DisplayContent titleLevel={2} content={description} />
        </span>
      }
      className={fr.cx("fr-mb-0")}
      classes={{
        start: fr.cx("fr-mb-2w"),
      }}
    />
  );
};

const contentLimited = css({
  display: "-webkit-box !important",
  // @ts-expect-error - vendor prefixed properties
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 6,
  overflow: "hidden",
  textOverflow: "ellipsis",
  overflowWrap: "break-word",
  whiteSpace: "normal", // Important : force le retour à la ligne
});
