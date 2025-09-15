"use client";

import React from "react";
import { ElasticAgreement } from "@socialgouv/cdtn-types";
import { AccordionWithAnchor } from "../common/AccordionWithAnchor";
import { fr } from "@codegouvfr/react-dsfr";
import Link from "../common/Link";

type Props = {
  articlesByTheme: ElasticAgreement["articlesByTheme"];
  containerId: string;
};

const BLOCKS = {
  1: { label: "Salaires minima hiérarchiques" },
  10: { label: "Période d'essai : conditions et renouvellement" },
  11: { label: "Contrats de travail : poursuite" },
  12: { label: "Salarié temporaire : poursuite" },
  13: { label: "Salarié porté : rémunération" },
  14: { important: true, label: "Risques professionnels : prévention" },
  15: { important: true, label: "Emploi des travailleurs handicapés" },
  16: { important: true, label: "Délégués syndicaux" },
  17: { important: true, label: "Primes travaux dangereux et insalubres" },
  2: { label: "Classifications" },
  3: { label: "Fonds financement paritarisme : mutualisation" },
  4: { label: "Fonds formation professionnelle : mutualisation" },
  5: { label: "Prévoyance" },
  6: { label: "Durée du travail, répartition et aménagement des horaires" },
  7: { label: "Contrats à durée déterminée et contrats de travail temporaire" },
  8: { label: "Contrat à durée indéterminée de chantier ou d'opération" },
  9: { label: "Egalité professionnelle femme-homme" },
};

export function AgreementArticles({ articlesByTheme, containerId }: Props) {
  if (!articlesByTheme || articlesByTheme.length === 0) {
    return null;
  }

  return (
    <div
      id="agreement-articles"
      className={fr.cx("fr-mt-6w")}
      data-testid="agreement-articles-container"
    >
      <h2 data-testid="agreement-articles-title">
        Articles de la convention collective
      </h2>
      <p data-testid="agreement-articles-description">
        Consultez les articles de la convention collective qui s&apos;appliquent
        à votre situation dans les thèmes sélectionnés ci-dessous.
      </p>
      <div
        className={fr.cx("fr-highlight")}
        data-testid="agreement-articles-highlight"
      >
        <p>
          Les thèmes sélectionnés sont les thèmes pour lesquels la convention
          collective s&apos;applique à votre situation. Cela signifie que même
          s&apos;il existe un accord d&apos;entreprise sur ces thèmes, celui-ci
          ne peut prévoir de règles différentes de celles prévues par la
          convention collective.
        </p>
        <p>
          En effet, selon la loi, il existe 13 thèmes dans lesquels
          l&apos;accord d&apos;entreprise ne peut prévoir de règles différentes
          de celles de la convention collective, et 4 thèmes dans lesquels la
          convention collective doit indiquer expressément que l&apos;accord
          d&apos;entreprise ne peut prévoir de règles différentes.
        </p>
        <p>
          Sources : <Link href="/code-du-travail/l2253-1">Article L2253-1</Link>
          , <Link href="/code-du-travail/l2253-2">Article L2253-2</Link>,{" "}
          <Link href="/code-du-travail/l2253-3">Article L2253-3</Link>
        </p>
      </div>

      <AccordionWithAnchor
        data-testid="agreement-articles-accordion"
        items={articlesByTheme.map(({ bloc, articles }) => ({
          title: BLOCKS[bloc].label,
          content: (
            <div data-testid={`agreement-articles-bloc-${bloc}`}>
              {BLOCKS[bloc].important && (
                <div
                  className={fr.cx("fr-highlight", "fr-mb-3w")}
                  data-testid="agreement-articles-important-notice"
                >
                  <h3
                    className={fr.cx("fr-h5")}
                    data-testid="agreement-articles-important-title"
                  >
                    Important
                  </h3>
                  <p data-testid="agreement-articles-important-description">
                    Pour que ce thème s&apos;applique à votre situation, il doit
                    être indiqué dans l&apos;article en question qu&apos;un
                    accord d&apos;entreprise ne peut pas déroger à la convention
                    collective; à moins que l&apos;accord d&apos;entreprise ne
                    prévoie des garanties au moins équivalentes.
                  </p>
                </div>
              )}
              <ul
                className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}
                data-testid="agreement-articles-list"
              >
                {articles.map((article) => (
                  <li
                    key={article.id}
                    className={fr.cx("fr-col-12")}
                    data-testid={`agreement-article-item-${article.id}`}
                  >
                    <Link
                      href={`https://legifrance.gouv.fr/conv_coll/id/${article.id}/?idConteneur=${containerId}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      title={`Article ${article.title} : ${article.section}`}
                      data-testid={`agreement-article-link-${article.id}`}
                    >
                      <strong
                        data-testid={`agreement-article-title-${article.id}`}
                      >{`Article ${article.title} : `}</strong>
                      <span
                        data-testid={`agreement-article-section-${article.id}`}
                      >
                        {article.section}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ),
        }))}
        titleAs="h3"
      />
    </div>
  );
}
