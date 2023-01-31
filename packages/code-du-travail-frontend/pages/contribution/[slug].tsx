import { extractMdxContentUrl } from "@socialgouv/modeles-social";
import getConfig from "next/config";
import React from "react";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import Contribution from "../../src/contributions/Contribution";
import { Layout } from "../../src/layout/Layout";
import { Breadcrumb } from "cdtn-types";
import { handleError } from "../../src/lib/fetch-error";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const fetchQuestion = ({ slug }) =>
  fetch(`${API_URL}/items/contributions/${slug}`);

interface Props {
  breadcrumbs: Breadcrumb[];
  description: string;
  title: string;
  content;
  answers;
  relatedItems: Array<any>;
}

function PageContribution(props: Props): JSX.Element {
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

  const { breadcrumbs, title, answers, description, relatedItems, content } =
    props;

  const metas = buildTitleAndDescription(
    breadcrumbs,
    answers.conventionAnswer,
    title,
    description
  );
  return (
    <div>
      <Layout>
        <Metas title={metas.title} description={metas.description} />
        <Answer
          title={title}
          relatedItems={relatedItems}
          breadcrumbs={breadcrumbs}
        >
          <Contribution
            answers={answers}
            content={(content && content._source) || {}}
          />
        </Answer>
      </Layout>
    </div>
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
    const fetchContent = await fetch(`${API_URL}/items?url=${contentUrl}`);
    const [content] = await fetchContent.json();
    return {
      props: { relatedItems: data.relatedItems, ...data._source, content },
    };
  }

  return { props: { relatedItems: data.relatedItems, ...data._source } };
};

export default PageContribution;
