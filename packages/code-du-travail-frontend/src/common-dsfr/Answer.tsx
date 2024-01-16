import React, { PropsWithChildren } from "react";
import { Breadcrumb } from "@socialgouv/cdtn-utils";
import Breadcrumbs from "./Breadcrumbs";
import Alert from "@codegouvfr/react-dsfr/Alert";
import Article from "./Article";
import { Container } from "../design-system/layout/Container";
import { cdtnStyleEnabled } from "../layout-dsfr";
import { fr } from "@codegouvfr/react-dsfr";

type AnswerProps = {
  additionalContent?: any;
  breadcrumbs?: Breadcrumb[];
  className?: string;
  date?: string;
  dateLabel?: string;
  emptyMessage?: string;
  html?: string | null;
  intro?: string | null;
  metaDescription?: string;
  relatedItems?: any[];
  source?: any;
  subtitle?: any;
  suptitle?: string;
  title: string;
};

function Answer({
  additionalContent,
  breadcrumbs = [],
  children = null,
  className,
  date,
  dateLabel,
  emptyMessage = "Aucun résultat",
  html = null,
  intro = null,
  metaDescription = "",
  relatedItems = [],
  source,
  subtitle,
  suptitle,
  title,
}: PropsWithChildren<AnswerProps>) {
  return (
    <>
      <div className={"fr-container"}>
        <Breadcrumbs items={breadcrumbs} currentPage={title} />
      </div>

      {!html && !children && (
        <Alert description={emptyMessage} severity="error" title="" />
      )}

      <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle fr-mb-4w">
        <div className="fr-col-12 fr-col-offset-md-2 fr-col-md-8 fr-col-offset-lg-3 fr-col-lg-6">
          <Container
            style={
              cdtnStyleEnabled
                ? {
                    backgroundColor: "#ffffff",
                    borderRadius: "0.6rem",
                    paddingTop: "1rem",
                    boxShadow: "rgba(121, 148, 212, 0.2) 0px 1rem 2rem",
                    paddingBottom: `${fr.spacing("4w")}`
                  }
                : undefined
            }
          >
            {(html || children) && (
              <Article
                suptitle={
                  suptitle ||
                  (breadcrumbs.length > 0 &&
                    breadcrumbs[breadcrumbs.length - 1].label)
                }
                title={title}
                metaDescription={metaDescription}
                date={date}
                dateLabel={dateLabel}
                source={source}
              >
                {children}
              </Article>
            )}
          </Container>
        </div>
      </div>
    </>
  );
}

export default Answer;
