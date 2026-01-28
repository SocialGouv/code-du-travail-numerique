import { fr } from "@codegouvfr/react-dsfr";
import React, { forwardRef } from "react";
import { css } from "@styled-system/css";
import Card from "@codegouvfr/react-dsfr/Card";
import { getRouteBySource } from "@socialgouv/cdtn-utils/";
import { summarize } from "../../../utils";
import Button from "@codegouvfr/react-dsfr/Button";
import Image from "next/image";
import { routeBySource } from "@socialgouv/cdtn-utils";

const INITIAL_ITEMS_DISPLAY_COUNT = 6;

type Item = {
  title: string;
  description: string;
  slug: string;
  source: string;
};

type SectionProps = {
  sectionId: string;
  title: string;
  items: Item[];
  isExpanded: boolean;
  onToggle: (sectionId: string) => void;
  firstHiddenItemRef: (sectionId: string, el: HTMLLIElement | null) => void;
  buttonRef: (sectionId: string, el: HTMLButtonElement | null) => void;
  icon?: string;
  className?: string;
};

export const Section = forwardRef<HTMLHeadingElement, SectionProps>(
  (
    {
      sectionId,
      title,
      items,
      isExpanded,
      className,
      onToggle,
      firstHiddenItemRef,
      buttonRef,
      icon,
    },
    ref
  ) => {
    const hasMoreThanN = items.length > INITIAL_ITEMS_DISPLAY_COUNT;
    const displayedItems =
      hasMoreThanN && !isExpanded
        ? items.slice(0, INITIAL_ITEMS_DISPLAY_COUNT)
        : items;

    return (
      <section className={className}>
        <h2
          id={sectionId}
          tabIndex={-1}
          ref={ref}
          className={`${fr.cx("fr-h3", "fr-mb-3w")} ${titleWithIcon} ${focusableTitle}`}
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
          id={`${sectionId}-items`}
          aria-live="polite"
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
                if (hasMoreThanN && index === INITIAL_ITEMS_DISPLAY_COUNT) {
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
                  href: `/${getRouteBySource(item.source as keyof typeof routeBySource)}/${item.slug}`,
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
        {hasMoreThanN && (
          <div className={fr.cx("fr-mt-4w")}>
            <Button
              ref={(el) => buttonRef(sectionId, el)}
              priority="secondary"
              iconId={
                isExpanded
                  ? "fr-icon-arrow-up-s-line"
                  : "fr-icon-arrow-down-s-line"
              }
              iconPosition="right"
              onClick={() => onToggle(sectionId)}
              aria-expanded={isExpanded}
              aria-controls={`${sectionId}-items`}
              aria-label={`${isExpanded ? "Masquer" : "Tout afficher"} les contenus de ${title}`}
            >
              {isExpanded ? "Masquer" : "Tout afficher"}
            </Button>
          </div>
        )}
      </section>
    );
  }
);

Section.displayName = "Section";

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
  scrollMarginTop: "64px",
  "&:focus": {
    outline: "2px solid var(--border-active-blue-france)",
    outlineOffset: "4px",
    borderRadius: "4px",
  },
});
