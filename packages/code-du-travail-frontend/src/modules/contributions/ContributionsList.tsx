"use client";

import React, { useState, useCallback, useMemo, useRef } from "react";
import { ContainerWithNav } from "../layout/ContainerWithNav";
import { ContributionSection } from "./ContributionSection";

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
  contribs: ContributionsData;
};

const popularContributionSlugs = [
  "en-cas-darret-maladie-du-salarie-lemployeur-doit-il-assurer-le-maintien-de-salaire",
  "les-conges-pour-evenements-familiaux",
  "a-quelles-indemnites-peut-pretendre-un-salarie-qui-part-a-la-retraite",
  "quelles-sont-les-consequences-du-non-respect-du-preavis-par-le-salarie-ou-lemployeur",
  "quelle-est-la-duree-du-preavis-en-cas-de-demission",
  "le-preavis-de-demission-doit-il-etre-execute-en-totalite-y-compris-si-le-salarie-a-retrouve-un-emploi",
];

export const ContributionsList = ({ contribs: initialContribs }: Props) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const firstHiddenItemRefs = useRef<{ [key: string]: HTMLLIElement | null }>(
    {}
  );

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

  const sidebarSections = useMemo(() => {
    return [
      { id: "contenus-populaires", label: "Contenus populaires" },
      ...Object.keys(documents).map((theme) => ({
        id: theme.toLowerCase().replace(/\s+/g, "-"),
        label: theme,
      })),
    ];
  }, [documents]);

  return (
    <ContainerWithNav
      title="Vos fiches pratiques"
      description="Obtenez une réponse personnalisée selon votre convention collective"
      sidebarSections={sidebarSections}
      breadcrumbSegments={[]}
    >
      <ContributionSection
        sectionId="contenus-populaires"
        title="Contenus populaires"
        items={popularContributions}
        isExpanded={expandedSections.has("contenus-populaires")}
        onToggle={toggleSection}
        firstHiddenItemRef={handleFirstHiddenItemRef}
        icon="/static/assets/img/star.svg"
      />

      {Object.keys(documents).map((theme) => {
        const sectionId = theme.toLowerCase().replace(/\s+/g, "-");
        return (
          <ContributionSection
            key={sectionId}
            sectionId={sectionId}
            title={theme}
            items={documents[theme]}
            isExpanded={expandedSections.has(sectionId)}
            onToggle={toggleSection}
            firstHiddenItemRef={handleFirstHiddenItemRef}
          />
        );
      })}
    </ContainerWithNav>
  );
};
