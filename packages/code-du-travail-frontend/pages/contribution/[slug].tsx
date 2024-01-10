import { extractMdxContentUrl } from "@socialgouv/modeles-social";
import React from "react";

import Metas from "../../src/common/Metas";
import Contribution from "../../src/contributions/Contribution";
import {
  Breadcrumb,
  ElasticSearchContribution,
  ElasticSearchContributionConventionnelle,
  ElasticSearchContributionGeneric,
} from "@socialgouv/cdtn-utils";
import { handleError } from "../../src/lib/fetch-error";
import { SITE_URL } from "../../src/config";
import ContributionGenericPoc from "../../src/contributions/ContributionGenericPoc";
import ContributionCCPoc from "../../src/contributions/ContributionCCPoc";
import { showNewContribPage } from "../../src/contributions/utils";
import EventTracker from "../../src/lib/tracking/EventTracker";
import ContributionGeneric from "../../src/contributions/ContributionGeneric";
import ContributionCC from "../../src/contributions/ContributionCC";
import Layout from "../../src/layout-dsfr/Layout";
import Answer from "../../src/common-dsfr/Answer";

const fetchQuestion = ({ slug }) =>
  fetch(`${SITE_URL}/api/items/contributions/${slug}`);

type NewProps = {
  contribution: ElasticSearchContribution;
  isNewContribution: true;
};

type OldProps = {
  breadcrumbs: Breadcrumb[];
  description: string;
  title: string;
  slug: string;
  answers;
  relatedItems: Array<any>;
  content;
  isNewContribution: false;
};

type Props = NewProps | OldProps;

const buildTitleAndDescription = (
  breadcrumbs,
  conventionAnswer,
  title,
  description
) => {
  if (breadcrumbs && breadcrumbs.length > 0 && conventionAnswer) {
    const titleWithThemeAndCC =
      breadcrumbs[breadcrumbs.length - 1].label +
      " - " +
      conventionAnswer.shortName;
    return {
      description: title + " " + description,
      title: titleWithThemeAndCC,
    };
  }
  return {
    description,
    title,
  };
};
const SLUG_FOR_POC_GENERIC = ["les-conges-pour-evenements-familiaux"];

function PageContribution(props: Props): React.ReactElement {
  let metas: any = {};

  if (!props.isNewContribution) {
    metas = buildTitleAndDescription(
      props.breadcrumbs,
      props.answers.conventionAnswer,
      props.title,
      props.description
    );
  }

  return (
    <Layout>
      {props.isNewContribution ? (
        <>
          <Metas
            title={props.contribution.title}
            description={props.contribution.description}
          />
          <Answer
            title={props.contribution.title}
            breadcrumbs={props.contribution.breadcrumbs}
          >
            <h2>Test</h2>
            {props.contribution.idcc === "0000" ? ("Contribution") : ("Contribution personnalisée")}
          </Answer>
        </>
      ) : (
        "Hello !"
      )}
    </Layout>
  );
  /*
  return (
    <Layout>
      {props.isNewContribution ? (
        <>
          <Metas
            title={props.contribution.title}
            description={props.contribution.description}
          />
          <Answer
            title={props.contribution.title}
            breadcrumbs={props.contribution.breadcrumbs}
          >
            {props.contribution.idcc === "0000" ? (
              <ContributionGeneric
                contribution={
                  props.contribution as ElasticSearchContributionGeneric
                }
              />
            ) : (
              <ContributionCC
                contribution={
                  props.contribution as ElasticSearchContributionConventionnelle
                }
              />
            )}
          </Answer>
        </>
      ) : (
        <>
          <Metas title={metas.title} description={metas.description} />
          <Answer
            title={props.title}
            relatedItems={props.relatedItems}
            breadcrumbs={props.breadcrumbs}
          >
            {SLUG_FOR_POC_GENERIC.indexOf(props.slug) >= 0 ? (
              <ContributionGenericPoc
                answers={props.answers}
                slug={props.slug}
                content={(props.content && props.content._source) || {}}
              />
            ) : (
              <>
                {showNewContribPage(props.slug) ? (
                  <ContributionCCPoc
                    answers={props.answers}
                    slug={props.slug}
                    content={(props.content && props.content._source) || {}}
                  />
                ) : (
                  <Contribution
                    answers={props.answers}
                    content={(props.content && props.content._source) || {}}
                  />
                )}
              </>
            )}
          </Answer>
        </>
      )}
      <EventTracker />
    </Layout>
  );
  */
}

export const getServerSideProps = async ({ query }) => {
  const response = await fetchQuestion(query);
  if (!response.ok) {
    return handleError(response);
  }
  const data = await response.json();

  if (
    data._source?.type === "content" ||
    data._source?.type === "fiche-sp" ||
    data._source?.type === "generic-no-cdt" ||
    data._source?.type === "cdt"
  ) {
    return {
      props: {
        contribution: data._source,
        isNewContribution: true,
      },
    };
  } else {
    // Check Content tag exist on markdown
    const markdown =
      ((((data || {})._source || {}).answers || {}).generic || {}).markdown ||
      "";

    const contentUrl = extractMdxContentUrl(markdown);
    if (contentUrl) {
      const fetchContent = await fetch(
        `${SITE_URL}/api/items?url=${contentUrl}`
      );
      const [content] = await fetchContent.json();
      return {
        props: {
          relatedItems: data.relatedItems,
          ...data._source,
          content,
          isNewContribution: false,
        },
      };
    }

    return {
      props: {
        relatedItems: data.relatedItems,
        ...data._source,
        isNewContribution: false,
      },
    };
  }
};

export default PageContribution;
