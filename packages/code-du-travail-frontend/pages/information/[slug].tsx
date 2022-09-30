import { Accordion, Tabs, Section, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import References from "../../src/common/References";
import { Layout } from "../../src/layout/Layout";
import { EditorialContentDataWrapper } from "cdtn-types";
import {
  getContentBySlug,
  getContentByIds,
  getContentBlockIds,
  injectContentInfos,
} from "../../src/information";
import { ContentBlocks } from "../../src/information/Components";
import {
  QuestionnaireWrapper,
  trackClickInfoPageTab,
} from "../../src/questionnaire";

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
  let editorialContent = contents?.map(({ name, references = [], blocks }) => {
    return (
      <ContentBlocks
        key={name}
        name={name}
        references={references}
        blocks={blocks}
      ></ContentBlocks>
    );
  });
  let contentWrapper;
  if (editorialContent && editorialContent.length > 1) {
    contentWrapper =
      sectionDisplayMode === "tab" ? (
        <Tabs
          data={contents?.map(({ title }, index) => ({
            panel: editorialContent?.[index],
            tab: title,
          }))}
          onSelect={(index) => {
            if (dismissalProcess && contents) {
              const content = contents[index];
              trackClickInfoPageTab(content.name);
            }
          }}
        />
      ) : (
        <Accordion
          titleLevel={2}
          preExpanded={[anchor]}
          items={contents?.map(({ title, name }, index) => ({
            body: editorialContent?.[index],
            id: name,
            title,
          }))}
        />
      );
  }
  let sectionTitleStyleWrapper =
    sectionDisplayMode === "tab" ? (
      <TabStylesWrapper data-testid="tabs">{contentWrapper}</TabStylesWrapper>
    ) : (
      <GlobalStylesWrapper data-testid="accordion">
        {contentWrapper}
      </GlobalStylesWrapper>
    );

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
          <SlugSummaryWrapper>
            <QuestionnaireWrapper
              name="dismissalProcess"
              personnalizedTitle="Votre situation"
              slug={slug}
              title={"Cette procédure concerne le cas suivant :"}
              variant="dark"
            ></QuestionnaireWrapper>
          </SlugSummaryWrapper>
        )}
        {sectionTitleStyleWrapper}
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
  const contentBySlug = await getContentBySlug(slug);

  const cdtnIdToFetch = getContentBlockIds(contentBySlug._source.contents);
  let contents;

  if (cdtnIdToFetch && cdtnIdToFetch.length) {
    const fetchedContents = await getContentByIds(cdtnIdToFetch);
    contents = injectContentInfos(
      contentBySlug._source.contents,
      fetchedContents
    );
  } else {
    contents = contentBySlug._source.contents;
  }

  const information = {
    ...contentBySlug,
    _source: { ...contentBySlug._source, contents },
    slug,
  };

  return { anchor, information };
};

const { breakpoints, spacings } = theme;

const TabStylesWrapper = styled.div`
  & > div > div > div {
    overflow-x: auto;
  }
  img {
    max-width: 100%;
    height: auto;
  }

  li {
    flex: 1;
    font-size: 16px;
  }
`;

const GlobalStylesWrapper = styled.div`
  img {
    max-width: 100%;
    height: auto;
  }

  ul,
  ol {
    padding-left: ${spacings.larger};
  }

  li + li {
    margin-top: ${spacings.base};
    @media (max-width: ${breakpoints.mobile}) {
      margin-top: ${spacings.small};
    }
  }
`;

const SlugSummaryWrapper = styled.div`
  margin-bottom: 29px;
`;
