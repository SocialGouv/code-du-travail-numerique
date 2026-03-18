"use client";

import React from "react";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { ElasticAgreement } from "@socialgouv/cdtn-types";
import { AccordionWithAnchor } from "../common/AccordionWithAnchor";
import { fr } from "@codegouvfr/react-dsfr";
import Link from "../common/Link";
import { removeCCNumberFromSlug } from "../utils/removeCCNumberFromSlug";

type Props = {
  answers: ElasticAgreement["answers"];
  agreementSlug?: string;
};

export function FrequentQuestions({ answers, agreementSlug }: Props) {
  if (!answers || answers.length === 0) {
    return null;
  }

  return (
    <div
      id="frequent-questions"
      className={fr.cx("fr-mt-6w")}
      data-testid="frequent-questions-container"
    >
      <h2 data-testid="frequent-questions-title">
        Questions-réponses fréquentes
      </h2>
      <p data-testid="frequent-questions-description">
        Retrouvez les questions-réponses les plus fréquentes organisées par
        thème et élaborées par le ministère du Travail vous concernant.
      </p>
      <AccordionWithAnchor
        data-testid="frequent-questions-accordion"
        items={answers.map((group, index) => ({
          title: group.theme,
          content: (
            <ul id={`frequent-questions-list-${index}`}>
              {group.answers.map((item) => {
                const genericSlug = removeCCNumberFromSlug(item.slug);
                const href =
                  genericSlug === "les-conges-pour-evenements-familiaux" &&
                  agreementSlug
                    ? `/contribution/${genericSlug}/${agreementSlug}`
                    : `/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${item.slug}`;
                return (
                  <li key={item.slug} data-testid="frequent-question-item">
                    <Link
                      href={href}
                      data-testid={`frequent-question-link-${item.slug}`}
                    >
                      {item.question}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ),
        }))}
        titleAs="h3"
      />
    </div>
  );
}
