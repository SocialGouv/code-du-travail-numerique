import { useRouter } from "next/router";
import React, { PropsWithChildren } from "react";
import { Breadcrumb } from "@socialgouv/cdtn-utils";
import Breadcrumbs from "./Breadcrumbs";
import Alert from "@codegouvfr/react-dsfr/Alert";
import Article from "./Article";

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
  const router = useRouter();
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      {!html && !children && (
        <Alert description={emptyMessage} severity="error" title="" />
      )}
      <div
        className={
          "fr-grid-row fr-grid-row--center fr-grid-row--middle fr-pb-8w"
        }
      >
        {(html || children) && (
          <Article
            title={title}
            metaDescription={metaDescription}
            date={date}
            dateLabel={dateLabel}
            source={source}
          >
            {children}
          </Article>
        )}
      </div>
    </>
  );
  /*
  return (
    <>
      <Breadcrumbs items={breadcrumbs} />
      <ConventionModal />
      <MainAsideLayout>
        <MainContent hasResults={relatedItems.length > 0} className={className}>
          {!html && !children && <BigError>{emptyMessage}</BigError>}
          {(html || children) && (
            <Article
              suptitle={
                suptitle ||
                (breadcrumbs.length > 0 &&
                  breadcrumbs[breadcrumbs.length - 1].label)
              }
              subtitle={subtitle}
              title={title}
              metaDescription={metaDescription}
              date={date}
              dateLabel={dateLabel}
              source={source}
            >
              {intro && (
                <IntroWrapper variant="dark">
                  {isHTML(intro) ? (
                    <Html>{intro}</Html>
                  ) : (
                    <Paragraph noMargin>{intro}</Paragraph>
                  )}
                </IntroWrapper>
              )}
              {html && <Html>{html}</Html>}
              {children}
            </Article>
          )}
          {additionalContent}
          <ShareContainer>
            <Paragraph noMargin>Partager ce contenu&nbsp;:&nbsp;</Paragraph>
            <Share
              title={title}
              metaDescription={metaDescription}
              tabIndex={-1}
            />
          </ShareContainer>
          <Feedback url={router.asPath} />
        </MainContent>
        {relatedItems.length > 0 && (
          <AsideContent sticky>
            <RelatedItems items={relatedItems} />
          </AsideContent>
        )}
      </MainAsideLayout>
    </>
  );
   */
}

export default Answer;
