import { Section, Wrapper } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import References from "../../src/common/References";
import { Layout } from "../../src/layout/Layout";
import { SOURCES } from "@socialgouv/cdtn-utils";
import { Contents } from "../../src/information";
import { QuestionnaireWrapper } from "../../src/questionnaire";
import { useRouter } from "next/router";
import { SITE_URL } from "../../src/config";
import { EditorialContentElasticDocument } from "@socialgouv/cdtn-types";

export type EditorialContentDataWrapper = {
  information: {
    _source: Partial<EditorialContentElasticDocument>;
    relatedItems?: string[];
  };
};

const Information = ({
  information: {
    _source: {
      breadcrumbs,
      contents,
      date,
      metaDescription = "",
      sectionDisplayMode,
      intro,
      references = [],
      title = "",
      dismissalProcess = false,
      slug = "",
    },
    relatedItems,
  } = { _source: {} },
}: EditorialContentDataWrapper) => {
  const { asPath } = useRouter();
  const anchor = asPath.split("#")[1];
  return (
    <Layout>
      <Metas title={title} description={metaDescription} />
      <Answer
        breadcrumbs={breadcrumbs}
        date={date}
        dateLabel="Mise à jour le"
        intro={intro}
        relatedItems={relatedItems}
        title={title}
      >
        {dismissalProcess && (
          <SlugSummaryWrapper variant="dark">
            <QuestionnaireWrapper
              name="dismissalProcess"
              personnalizedTitle="Votre situation"
              slug={slug}
              title={"Cette procédure concerne le cas suivant :"}
            ></QuestionnaireWrapper>
          </SlugSummaryWrapper>
        )}
        <Contents
          anchor={anchor}
          sectionDisplayMode={sectionDisplayMode}
          dismissalProcess={dismissalProcess}
          contents={contents}
        ></Contents>
        {references.map(
          ({ label, links }, index) =>
            links.length > 0 && (
              <Section key={`section-info-${index}`}>
                <References
                  label={label}
                  accordionDisplay={1}
                  references={links.map((reference, index) => ({
                    ...reference,
                    id: reference.id || `${name}-${index}`,
                  }))}
                />
              </Section>
            )
        )}
      </Answer>
    </Layout>
  );
};

export default Information;

export const getServerSideProps = async ({ query }) => {
  const responseContainer = await fetch(
    `${SITE_URL}/api/items/${SOURCES.EDITORIAL_CONTENT}/${query.slug}`
  );
  if (!responseContainer.ok) {
    return { notFound: true };
  }
  const information = await responseContainer.json();

  return { props: { information, slug: query.slug } };
};

const SlugSummaryWrapper = styled(Wrapper)`
  margin-bottom: 29px;
`;
