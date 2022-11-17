import { Section, Wrapper } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import References from "../../src/common/References";
import { Layout } from "../../src/layout/Layout";
import { EditorialContentDataWrapper } from "cdtn-types";
import { getInformationBySlug } from "../../src/information";
import { Contents } from "../../src/information/Components";
import { QuestionnaireWrapper } from "../../src/questionnaire";

const Information = ({
  anchor,
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
    },
    relatedItems,
    slug,
  } = { _source: {}, slug: "" },
}: EditorialContentDataWrapper) => {
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
          ({ label, links }) =>
            links.length > 0 && (
              <Section>
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

Information.getInitialProps = async ({ query: { slug }, asPath }) => {
  // beware, this one is undefined when rendered server-side
  const anchor = asPath.split("#")[1];
  const information = await getInformationBySlug(slug);

  return { anchor, information };
};

const SlugSummaryWrapper = styled(Wrapper)`
  margin-bottom: 29px;
`;
