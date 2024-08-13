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

function PageContribution(props: Props): React.ReactElement {
  return (
    <Layout>
      <Metas
        //@ts-ignore
        title={props.contribution.metas.title}
        //@ts-ignore
        description={props.contribution.metas.description}
      />
      <Answer
        title={props.contribution.title}
        breadcrumbs={props.contribution.breadcrumbs}
        date={props.contribution.date}
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
