import React from "react";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import { Layout } from "../../src/layout/Layout";
import {
  Breadcrumb,
  ContributionElasticDocument,
  ElasticSearchContribution,
  ElasticSearchContributionConventionnelle,
  ElasticSearchContributionGeneric,
} from "@socialgouv/cdtn-types";
import ContributionGeneric from "../../src/contributions/ContributionGeneric";
import ContributionCC from "../../src/contributions/ContributionCC";
import { getBySourceAndSlugItems } from "../../src/api";

type Props = {
  contribution: ElasticSearchContribution;
};

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
  if (
    !contribution.ccnShortTitle ||
    contribution.ccnShortTitle.length > 14 ||
    contribution.title.length > 50
  ) {
    return contribution.title;
  }

  return `${contribution.title} - ${contribution.ccnShortTitle}`;
};

function PageContribution(props: Props): React.ReactElement {
  let metas: any = {};

  metas = buildTitleAndDescription(
    props.contribution.breadcrumbs,
    "ccnShortTitle" in props.contribution
      ? props.contribution.ccnShortTitle
      : undefined,
    props.contribution.title,
    props.contribution.description
  );

  return (
    <Layout>
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
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const data = await getBySourceAndSlugItems<ContributionElasticDocument>(
    "contributions",
    query.slug
  );
  if (!data?._source) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      contribution: data._source,
    },
  };
};

export default PageContribution;
