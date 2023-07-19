import { extractMdxContentUrl } from "@socialgouv/modeles-social";
import React from "react";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import Contribution from "../../src/contributions/Contribution";
import { Layout } from "../../src/layout/Layout";
import { Breadcrumb } from "@socialgouv/cdtn-utils";
import { handleError } from "../../src/lib/fetch-error";
import { SITE_URL } from "../../src/config";
import ContributionGeneric from "../../src/contributions/Contribution-generic";

const fetchQuestion = ({ slug }) =>
  fetch(`${SITE_URL}/api/items/contributions/${slug}`);

interface Props {
  breadcrumbs: Breadcrumb[];
  description: string;
  title: string;
  slug: string;
  content;
  answers;
  relatedItems: Array<any>;
}

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

const SLUG_FOR_POC = [
  "les-conges-pour-evenements-familiaux",
  "quelle-est-la-duree-maximale-de-la-periode-dessai-sans-et-avec-renouvellement",
  "quelle-est-la-duree-de-preavis-en-cas-de-licenciement",
];
const showNewContribPage = (slug): boolean => {
  return SLUG_FOR_POC.indexOf(slug) >= 0;
};

function PageContribution(props: Props): JSX.Element {
  const {
    breadcrumbs,
    title,
    answers,
    description,
    relatedItems,
    content,
    slug,
  } = props;

  const metas = buildTitleAndDescription(
    breadcrumbs,
    answers.conventionAnswer,
    title,
    description
  );
  return (
    <Layout>
      <Metas title={metas.title} description={metas.description} />
      <Answer
        title={title}
        relatedItems={relatedItems}
        breadcrumbs={breadcrumbs}
      >
        {showNewContribPage(slug) ? (
          <ContributionGeneric
            answers={answers}
            slug={slug}
            content={(content && content._source) || {}}
          />
        ) : (
          <Contribution
            answers={answers}
            content={(content && content._source) || {}}
          />
        )}
      </Answer>
    </Layout>
  );
}

export const getServerSideProps = async ({ query }) => {
  const response = await fetchQuestion(query);
  if (!response.ok) {
    return handleError(response);
  }
  const data = await response.json();

  // Check Content tag exist on markdown
  const markdown =
    ((((data || {})._source || {}).answers || {}).generic || {}).markdown || "";

  const contentUrl = extractMdxContentUrl(markdown);
  if (contentUrl) {
    const fetchContent = await fetch(`${SITE_URL}/api/items?url=${contentUrl}`);
    const [content] = await fetchContent.json();
    return {
      props: { relatedItems: data.relatedItems, ...data._source, content },
    };
  }

  return { props: { relatedItems: data.relatedItems, ...data._source } };
};

export default PageContribution;
