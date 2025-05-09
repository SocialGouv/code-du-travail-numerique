"use client";
import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Card } from "@codegouvfr/react-dsfr/Card";
import { summarize } from "../../search/utils";

type SearchCardProps = {
  title: string;
  description: string;
  category?: string;
  link: string;
  onClick?: () => void;
};

export const SearchCard: React.FC<SearchCardProps> = ({
  title,
  description,
  category,
  link,
  onClick,
}) => {
  return (
    <div className="fr-col-12 fr-col-md-6">
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
          href: link,
          onClick: onClick,
        }}
        desc={summarize(description)}
        classes={{
          start: fr.cx("fr-mb-2w"),
          title: "fr-card__title--blue-france",
        }}
      />
    </div>
  );
};
