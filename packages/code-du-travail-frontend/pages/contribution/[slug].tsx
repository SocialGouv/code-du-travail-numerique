import { extractMdxContentUrl } from "@socialgouv/modeles-social";
import React from "react";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import Contribution from "../../src/contributions/Contribution";
import { Layout } from "../../src/layout/Layout";
import {
  Breadcrumb,
  ElasticSearchContribution,
  ElasticSearchContributionConventionnelle,
  ElasticSearchContributionGeneric,
} from "@socialgouv/cdtn-utils";
import ContributionGenericPoc from "../../src/contributions/ContributionGenericPoc";
import ContributionCCPoc from "../../src/contributions/ContributionCCPoc";
import { showNewContribPage } from "../../src/contributions/utils";
import EventTracker from "../../src/lib/tracking/EventTracker";
import ContributionGeneric from "../../src/contributions/ContributionGeneric";
import ContributionCC from "../../src/contributions/ContributionCC";
import {
  getAll,
  getAllContributions,
  getBySourceAndSlugItems,
} from "../../src/api";
import { SITE_URL } from "../../src/config";

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
      props.answers?.conventionAnswer,
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
            {SLUG_FOR_POC_GENERIC.indexOf(props.slug ?? "") >= 0 ? (
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
}

export async function getStaticPaths() {
  const contribs = await getAllContributions();
  return {
    paths: contribs.map((v) => ({
      params: { slug: v.slug },
    })),
    fallback: true,
  };
}

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  let data: any;
  if (process.env.NEXT_PUBLIC_APP_ENV === "external-api") {
    const response = await fetch(`${SITE_URL}/api/items/contributions/${slug}`);
    data = await response.json();
  } else {
    data = await getBySourceAndSlugItems("contributions", slug);
  }

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
      let content: any;
      if (process.env.NEXT_PUBLIC_APP_ENV === "external-api") {
        const fetchContent = await fetch(
          `${SITE_URL}/api/items?url=${contentUrl}`
        );
        content = await fetchContent.json()[0];
      } else {
        content = await getAll(contentUrl)[0];
      }
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
