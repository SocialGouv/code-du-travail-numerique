"use client";

import React from "react";
import { fr } from "@codegouvfr/react-dsfr";
import { Feedback } from "../layout/feedback";
import Breadcrumb from "@codegouvfr/react-dsfr/Breadcrumb";
import { ElasticAgreement } from "@socialgouv/cdtn-types";
import { RelatedItems } from "../common/RelatedItems";
import { Share } from "../common/Share";
import { RelatedItem } from "../documents";
import { format, parseISO } from "date-fns";
import frLocale from "date-fns/locale/fr";
import { FrequentQuestions } from "./FrequentQuestions";
import { AgreementArticles } from "./AgreementArticles";
import { AgreementSearch } from "./AgreementSearch";

type Props = {
  agreement: ElasticAgreement;
  relatedItems: { items: RelatedItem[]; title: string }[];
};

export function AgreementContainer({ agreement, relatedItems }: Props) {
  return (
    <>
      <Breadcrumb
        currentPageLabel={agreement.shortTitle}
        homeLinkProps={{
          href: "/",
        }}
        segments={[
          {
            label: "Convention collective",
            linkProps: { href: "/convention-collective" },
          },
          ...agreement.breadcrumbs.map((breadcrumb) => ({
            label: breadcrumb.label,
            linkProps: { href: breadcrumb.slug },
          })),
        ]}
        className="fr-mb-1w"
      />

      <div className={fr.cx("fr-grid-row", "fr-grid-row--gutters")}>
        <div
          className={fr.cx(
            "fr-col-12",
            "fr-col-md-8",
            "fr-mb-md-0",
            "fr-mt-6w",
            "fr-p-0"
          )}
        >
          {agreement.date_publi && (
            <small data-testid="agreement-date">
              Entrée en vigueur le{" "}
              {format(parseISO(agreement.date_publi), "dd/MM/yyyy", {
                locale: frLocale,
              })}
            </small>
          )}
          <h1 data-testid="agreement-title">{agreement.shortTitle}</h1>
          <p data-testid="agreement-full-title">{agreement.title}</p>
          <a
            href={agreement.url}
            target="_blank"
            className={fr.cx("fr-link")}
            data-testid="agreement-legifrance-link"
          >
            Retrouver l’intégralité de la convention collective sur Légifrance
          </a>

          <FrequentQuestions answers={agreement.answers} />
          <AgreementArticles
            articlesByTheme={agreement.articlesByTheme}
            containerId={agreement.id}
          />

          {agreement.url ? (
            <AgreementSearch
              idcc={agreement.num}
              shortTitle={agreement.shortTitle}
            />
          ) : (
            <p data-testid="agreement-not-treated-message">
              Cette convention collective n&apos;est pas traitée par nos
              services.
            </p>
          )}
        </div>
        <div className={fr.cx("fr-col-12", "fr-col-md-4", "fr-mt-6w")}>
          <RelatedItems relatedItems={relatedItems} />
          <Share
            title={agreement.shortTitle}
            metaDescription={agreement.metaDescription}
          />
        </div>
      </div>

      <div className={fr.cx("fr-col-12", "fr-col-md-8", "fr-my-6w")}>
        <Feedback />
      </div>
    </>
  );
}
