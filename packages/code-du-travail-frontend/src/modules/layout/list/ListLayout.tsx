"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { ContainerWithNav } from "../ContainerWithNav";
import { Section } from "./component/Section";
import { cleanHash } from "../../utils";
import { fr } from "@codegouvfr/react-dsfr";
import { SourceKeys } from "@socialgouv/cdtn-utils";

type Item = {
  title: string;
  description: string;
  slug: string;
  source: string;
};

type Data = {
  [theme: string]: Item[];
};

type Props = {
  title: string;
  description: string;
  source: SourceKeys;
  data: Data;
  popularSlugs: string[];
};

const SCROLL_DELAY_MS = 100;

export const ListLayout = ({
  title,
  description,
  source,
  data: initialData,
  popularSlugs,
}: Props) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const firstHiddenItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>(
    {}
  );
  const sectionRefs = useRef<{ [key: string]: HTMLHeadingElement | null }>({});
  const buttonRefs = useRef<{ [key: string]: HTMLButtonElement | null }>({});

  const documents = useMemo(() => initialData, [initialData]);

  const popularItems = useMemo(() => {
    const allItems: Item[] = [];
    Object.values(initialData).forEach((theme) => {
      allItems.push(...theme);
    });

    return popularSlugs
      .map((slug) => allItems.find((item) => item.slug === slug))
      .filter((item): item is Item => item !== undefined);
  }, [initialData]);

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
        setTimeout(() => {
          const button = buttonRefs.current[sectionId];
          if (button) {
            const offsetTop =
              button.getBoundingClientRect().top + window.scrollY - 64; // 4rem = 64px
            window.scrollTo({ top: offsetTop, behavior: "smooth" });
            setTimeout(() => {
              button.focus({ preventScroll: true });
            }, SCROLL_DELAY_MS);
          }
        }, SCROLL_DELAY_MS);
      } else {
        newSet.add(sectionId);
        setTimeout(() => {
          const firstHiddenItem = firstHiddenItemRefs.current[sectionId];
          if (firstHiddenItem) {
            const link = firstHiddenItem.querySelector("a");
            link?.focus();
            link?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, SCROLL_DELAY_MS);
      }
      return newSet;
    });
  }, []);

  const handleFirstHiddenItemRef = useCallback(
    (sectionId: string, el: HTMLLIElement | null) => {
      firstHiddenItemRefs.current[sectionId] = el;
    },
    []
  );

  const handleButtonRef = useCallback(
    (sectionId: string, el: HTMLButtonElement | null) => {
      buttonRefs.current[sectionId] = el;
    },
    []
  );

  useEffect(() => {
    const handleHashChange = () => {
      const hash = cleanHash(window.location.hash);
      if (hash && sectionRefs.current[hash]) {
        const heading = sectionRefs.current[hash];
        if (heading) {
          const offsetTop =
            heading.getBoundingClientRect().top + window.scrollY - 64;
          window.scrollTo({ top: offsetTop, behavior: "smooth" });
          setTimeout(() => {
            heading.focus({ preventScroll: true });
          }, SCROLL_DELAY_MS);
        }
      }
    };

    handleHashChange();

    window.addEventListener("hashchange", handleHashChange);

    return () => {
      window.removeEventListener("hashchange", handleHashChange);
    };
  }, []);

  const sidebarSections = useMemo(() => {
    return [
      { id: "contenus-populaires", label: "Contenus populaires" },
      ...Object.keys(documents).map((theme) => ({
        id: cleanHash(theme),
        label: theme,
      })),
    ];
  }, [documents]);

  return (
    <ContainerWithNav
      title={title}
      description={description}
      sidebarSections={sidebarSections}
      breadcrumbSegments={[]}
    >
      <Section
        source={source}
        ref={(el) => {
          sectionRefs.current["contenus-populaires"] = el;
        }}
        sectionId="contenus-populaires"
        title="Contenus populaires"
        items={popularItems}
        isExpanded={expandedSections.has("contenus-populaires")}
        onToggle={toggleSection}
        firstHiddenItemRef={handleFirstHiddenItemRef}
        buttonRef={handleButtonRef}
        icon="/static/assets/img/star.svg"
      />

      {Object.keys(documents).map((theme) => {
        const sectionId = cleanHash(theme);
        return (
          <Section
            source={source}
            key={sectionId}
            ref={(el) => {
              sectionRefs.current[sectionId] = el;
            }}
            sectionId={sectionId}
            title={theme}
            items={documents[theme]}
            isExpanded={expandedSections.has(sectionId)}
            onToggle={toggleSection}
            firstHiddenItemRef={handleFirstHiddenItemRef}
            buttonRef={handleButtonRef}
            className={fr.cx("fr-mt-3w")}
          />
        );
      })}
    </ContainerWithNav>
  );
};
