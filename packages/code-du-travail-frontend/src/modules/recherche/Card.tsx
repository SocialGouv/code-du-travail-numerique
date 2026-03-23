"use client";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { css } from "@styled-system/css";
import DisplayContent from "../common/DisplayContent";

type SearchCardProps = {
  id?: string;
  title: string;
  description: string;
  category?: string;
  link: string;
  onClick?: () => void;
  hiddenHeader?: boolean;
};

export const SearchCard: React.FC<SearchCardProps> = ({
  id,
  title,
  description,
  category,
  link,
  onClick,
  hiddenHeader = false,
}) => {
  return (
    <div className={fr.cx("fr-col-12", "fr-col-md-6")}>
      <Card
        start={
          category ? (
            <p className={fr.cx("fr-tag", "fr-tag--sm")}>{category}</p>
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
        classes={{
          start: hiddenHeader ? fr.cx("fr-hidden") : fr.cx("fr-mb-2w"),
        }}
      />
    </div>
  );
};

const contentLimited = css({
  display: "-webkit-box !important",
  // @ts-expect-error - vendor prefixed properties
  WebkitBoxOrient: "vertical",
  WebkitLineClamp: 2,
  overflow: "hidden",
  textOverflow: "ellipsis",
  overflowWrap: "break-word",
  whiteSpace: "normal", // Important : force le retour à la ligne
});
