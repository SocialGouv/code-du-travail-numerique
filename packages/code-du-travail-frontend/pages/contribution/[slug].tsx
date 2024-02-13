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
import { handleError } from "../../src/lib/fetch-error";
import { SITE_URL } from "../../src/config";
import ContributionGeneric from "../../src/contributions/ContributionGeneric";
import ContributionCC from "../../src/contributions/ContributionCC";

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
  breadcrumbs: Breadcrumb[],
  conventionName: string | undefined,
  title: string,
  description: string
) => {
  if (breadcrumbs && breadcrumbs.length > 0 && conventionName) {
    const titleWithThemeAndCC =
      breadcrumbs[breadcrumbs.length - 1].label + " - " + conventionName;
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
const getTitleFromNewContrib = (contribution) => {
  if (contribution.ccnShortTitle.length > 14 || contribution.title.length > 50) {
    return contribution.title;
  }

  return `${contribution.ccnShortTitle}: ${contribution.title}`;
};

function PageContribution(props: Props): React.ReactElement {
  let metas: any = {};

  if (!props.isNewContribution) {
    metas = buildTitleAndDescription(
      props.breadcrumbs,
      props.answers.conventionAnswer?.shortName,
      props.title,
      props.description
    );
  } else {
    metas = buildTitleAndDescription(
      props.contribution.breadcrumbs,
      props.contribution.ccnShortTitle,
      props.contribution.title,
      props.contribution.description
    );
  }

  return (
    <Layout>
      {props.isNewContribution ? (
        <>
          <Metas title={metas.title} description={metas.description} />
          <Answer
            title={getTitleFromNewContrib(props.contribution)}
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
    </Layout>
  );
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
