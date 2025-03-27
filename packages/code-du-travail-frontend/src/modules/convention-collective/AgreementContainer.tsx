"use client";

import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { ElasticAgreement } from "@socialgouv/cdtn-types";
import { RelatedItem } from "../documents";
import { format, parseISO } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { FrequentQuestions } from "./FrequentQuestions";
import { AgreementArticles } from "./AgreementArticles";
import { LegiFranceSearch } from "./LegiFranceSearch";
import { ContainerRichWithBreadcrumbs } from "../layout/ContainerRichWithBreadcrumbs";
import { getIdConvention } from "./utils";

type Props = {
  agreement: ElasticAgreement;
  relatedItems: { items: RelatedItem[]; title: string }[];
};

export function AgreementContainer({ agreement, relatedItems }: Props) {
  return (
    <ContainerRichWithBreadcrumbs
      currentPage={agreement.shortTitle}
      breacrumbs={[
        {
          label: "Convention collective",
          slug: "/convention-collective",
          position: 0,
        },
        ...agreement.breadcrumbs,
      ]}
      relatedItems={relatedItems}
      title={agreement.shortTitle}
      description={agreement.metaDescription}
    >
      <h1 data-testid="agreement-title">{agreement.shortTitle}</h1>
      <p data-testid="agreement-full-title">{agreement.title}</p>
      {agreement.date_publi && (
        <p data-testid="agreement-date">
          Entrée en vigueur le{" "}
          {format(parseISO(agreement.date_publi), "dd/MM/yyyy", {
            locale: frLocale,
          })}
        </p>
      )}
      <a
        href={`https://www.legifrance.gouv.fr/conv_coll/id/${getIdConvention(agreement.url)}`}
        target="_blank"
        className={fr.cx("fr-link")}
        data-testid="agreement-legifrance-link"
      >
        Retrouvez l&apos;intégralité de la convention collective sur Légifrance
      </a>

      <FrequentQuestions answers={agreement.answers} />
      <AgreementArticles
        articlesByTheme={agreement.articlesByTheme}
        containerId={agreement.id}
      />

      {agreement.url ? (
        <LegiFranceSearch
          idcc={agreement.num}
          shortTitle={agreement.shortTitle}
        />
      ) : (
        <p data-testid="agreement-not-treated-message" className="fr-mt-3w">
          Cette convention collective n&apos;est pas traitée par nos services.
        </p>
      )}
    </ContainerRichWithBreadcrumbs>
  );
}
