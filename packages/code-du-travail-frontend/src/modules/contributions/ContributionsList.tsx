"use client";

import React, {
  useState,
  useCallback,
  useMemo,
  useRef,
  useEffect,
} from "react";
import { ContainerWithNav } from "../layout/ContainerWithNav";
import { ContributionSection } from "./ContributionSection";
import { cleanHash } from "../utils";
import { fr } from "@codegouvfr/react-dsfr";

type ContributionItem = {
  title: string;
  description: string;
  slug: string;
  source: string;
};

type ContributionsData = {
  [theme: string]: ContributionItem[];
};

type Props = {
  contributions: ContributionsData;
  popularContributionSlugs: string[];
};

export const ContributionsList = ({
  contributions: initialContribs,
  popularContributionSlugs,
}: Props) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const firstHiddenItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>(
    {}
  );
  const sectionRefs = useRef<{ [key: string]: HTMLHeadingElement | null }>({});

  const documents = useMemo(() => initialContribs, [initialContribs]);

  const popularContributions = useMemo(() => {
    const allContribs: ContributionItem[] = [];
    Object.values(initialContribs).forEach((themeContribs) => {
      allContribs.push(...themeContribs);
    });

    return popularContributionSlugs
      .map((slug) => allContribs.find((contrib) => contrib.slug === slug))
      .filter((contrib): contrib is ContributionItem => contrib !== undefined);
  }, [initialContribs]);

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
        setTimeout(() => {
          const firstHiddenItem = firstHiddenItemRefs.current[sectionId];
          if (firstHiddenItem) {
            const link = firstHiddenItem.querySelector("a");
            link?.focus();
            link?.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
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

  useEffect(() => {
    const handleHashChange = () => {
      const hash = cleanHash(window.location.hash);
      if (hash && sectionRefs.current[hash]) {
        const heading = sectionRefs.current[hash];
        if (heading) {
          setTimeout(() => {
            heading.scrollIntoView({ behavior: "smooth", block: "start" });
            setTimeout(() => {
              heading.focus({ preventScroll: true });
            }, 300);
          }, 100);
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
      title="Fiches pratiques"
      description="Obtenez une réponse personnalisée selon votre convention collective"
      sidebarSections={sidebarSections}
      breadcrumbSegments={[]}
    >
      <ContributionSection
        ref={(el) => {
          sectionRefs.current["contenus-populaires"] = el;
        }}
        sectionId="contenus-populaires"
        title="Contenus populaires"
        items={popularContributions}
        isExpanded={expandedSections.has("contenus-populaires")}
        onToggle={toggleSection}
        firstHiddenItemRef={handleFirstHiddenItemRef}
        icon="/static/assets/img/star.svg"
      />

      {Object.keys(documents).map((theme) => {
        const sectionId = cleanHash(theme);
        return (
          <ContributionSection
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
            className={fr.cx("fr-mt-3w")}
          />
        );
      })}
    </ContainerWithNav>
  );
};
