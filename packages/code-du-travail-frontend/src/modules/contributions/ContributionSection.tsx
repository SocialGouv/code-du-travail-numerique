import { fr } from "@codegouvfr/react-dsfr";
import React, { forwardRef } from "react";
import { css } from "@styled-system/css";
import Card from "@codegouvfr/react-dsfr/Card";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { summarize } from "../utils";
import Button from "@codegouvfr/react-dsfr/Button";
import Image from "next/image";

type ContributionItem = {
  title: string;
  description: string;
  slug: string;
  source: string;
};

type ContributionSectionProps = {
  sectionId: string;
  title: string;
  items: ContributionItem[];
  isExpanded: boolean;
  onToggle: (sectionId: string) => void;
  firstHiddenItemRef: (sectionId: string, el: HTMLLIElement | null) => void;
  icon?: string;
};

export const ContributionSection = forwardRef<
  HTMLHeadingElement,
  ContributionSectionProps
>(
  (
    { sectionId, title, items, isExpanded, onToggle, firstHiddenItemRef, icon },
    ref
  ) => {
    const hasMoreThan6 = items.length > 6;
    const displayedItems =
      hasMoreThan6 && !isExpanded ? items.slice(0, 6) : items;

    return (
      <section id={sectionId} className={fr.cx("fr-mt-6w")}>
        <h2
          ref={ref}
          tabIndex={-1}
          className={`${fr.cx("fr-h3", "fr-mb-4w")} ${titleWithIcon} ${focusableTitle}`}
        >
          {icon && (
            <Image
              src={icon}
              alt=""
              width={35}
              height={35}
              className={iconStyles}
            />
          )}
          {title}
        </h2>
        <ul
          className={`${fr.cx(
            "fr-grid-row",
            "fr-grid-row--gutters",
            "fr-grid-row--left"
          )}`}
        >
          {displayedItems.map((item, index) => (
            <li
              key={item.slug}
              ref={(el) => {
                if (hasMoreThan6 && index === 6) {
                  firstHiddenItemRef(sectionId, el);
                }
              }}
              className={`${fr.cx(
                "fr-col-12",
                "fr-col-sm-12",
                "fr-col-md-6",
                "fr-col-lg-6"
              )} ${li}`}
            >
              <Card
                border
                desc={summarize(item.description)}
                horizontal
                linkProps={{
                  href: `/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${item.slug}`,
                }}
                size="medium"
                title={item.title}
                titleAs="h3"
                enlargeLink
                classes={{
                  start: fr.cx("fr-hidden"),
                }}
              />
            </li>
          ))}
        </ul>
        {hasMoreThan6 && (
          <div className={fr.cx("fr-mt-4w")}>
            <Button
              priority="secondary"
              iconId={
                isExpanded
                  ? "fr-icon-arrow-up-s-line"
                  : "fr-icon-arrow-down-s-line"
              }
              iconPosition="right"
              onClick={() => onToggle(sectionId)}
            >
              {isExpanded ? "Masquer" : "Tout afficher"}
            </Button>
          </div>
        )}
      </section>
    );
  }
);

ContributionSection.displayName = "ContributionSection";

const li = css({
  listStyle: "none!",
});

const titleWithIcon = css({
  display: "flex",
  alignItems: "center",
  gap: "0.5rem",
});

const iconStyles = css({
  flexShrink: 0,
});

const focusableTitle = css({
  outline: "none",
  "&:focus": {
    outline: "2px solid var(--border-active-blue-france)",
    outlineOffset: "4px",
    borderRadius: "4px",
  },
});
