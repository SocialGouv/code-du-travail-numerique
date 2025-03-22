"use client";

import React from "react";
import { getRouteBySource, SOURCES } from "@socialgouv/cdtn-utils";
import { ElasticAgreement } from "@socialgouv/cdtn-types";
import { AccordionWithAnchor } from "../common/AccordionWithAnchor";
import { fr } from "@codegouvfr/react-dsfr";

type Props = {
  answers: ElasticAgreement["answers"];
};

export function FrequentQuestions({ answers }: Props) {
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
            <ul
              id={`frequent-questions-list-${index}`}
              data-testid="frequent-questions-list"
            >
              {group.answers.map((item, itemIndex) => (
                <li
                  id={`frequent-question-${itemIndex}`}
                  key={item.slug}
                  data-testid="frequent-question-item"
                >
                  <a
                    href={`/${getRouteBySource(SOURCES.CONTRIBUTIONS)}/${item.slug}`}
                    data-testid={`frequent-question-link-${item.slug}`}
                  >
                    {item.question}
                  </a>
                </li>
              ))}
            </ul>
          ),
        }))}
        titleAs="h3"
      />
    </div>
  );
}
