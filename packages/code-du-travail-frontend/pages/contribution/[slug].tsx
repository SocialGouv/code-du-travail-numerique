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
import EventTracker from "../../src/lib/tracking/EventTracker";
import ContributionGeneric from "../../src/contributions/ContributionGeneric";
import ContributionCC from "../../src/contributions/ContributionCC";
import {
  getAll,
  getAllContributions,
  getBySourceAndSlugItems,
} from "../../src/api";
import { REVALIDATE_TIME } from "../../src/config";

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
            <Contribution
              answers={props.answers}
              content={(props.content && props.content._source) || {}}
            />
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
    fallback: false,
  };
}

export const getStaticProps = async (context) => {
  const slug = context.params.slug;
  const data = await getBySourceAndSlugItems("contributions", slug);
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
      revalidate: REVALIDATE_TIME,
    };
  } else {
    // Check Content tag exist on markdown
    const markdown =
      ((((data || {})._source || {}).answers || {}).generic || {}).markdown ||
      "";

    const contentUrl = extractMdxContentUrl(markdown);
    if (contentUrl) {
      const [content] = await getAll(contentUrl);
      return {
        props: {
          relatedItems: data.relatedItems,
          ...data._source,
          content,
          isNewContribution: false,
        },
        revalidate: REVALIDATE_TIME,
      };
    }

    return {
      props: {
        relatedItems: data.relatedItems,
        ...data._source,
        isNewContribution: false,
      },
      revalidate: REVALIDATE_TIME,
    };
  }
};

export default PageContribution;
