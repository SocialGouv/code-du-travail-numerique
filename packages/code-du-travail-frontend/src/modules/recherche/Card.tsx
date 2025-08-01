"use client";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { summarize } from "../../search/utils";

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
        desc={summarize(description)}
        classes={{
          start: hiddenHeader ? fr.cx("fr-hidden") : fr.cx("fr-mb-2w"),
        }}
      />
    </div>
  );
};
