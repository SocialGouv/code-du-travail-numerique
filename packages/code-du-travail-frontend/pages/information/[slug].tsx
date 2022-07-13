import { SOURCES } from "@socialgouv/cdtn-sources";
import {
  Accordion,
  Tabs,
  Button,
  icons,
  MoreContent,
  Section,
  theme,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import getConfig from "next/config";
import Link from "next/link";
import React from "react";
import htmlToHtmlAst from "rehype-parse";
import htmlAstToReact from "rehype-react";
import styled from "styled-components";
import unified from "unified";

import { A11yLink } from "../../src/common/A11yLink";
import Answer from "../../src/common/Answer";
import ImageWrapper from "../../src/common/ImageWrapper";
import Metas from "../../src/common/Metas";
import References from "../../src/common/References";
import { Layout } from "../../src/layout/Layout";
import { toUrl } from "../../src/lib";
import { EditorialContentDataWrapper, ContentBlock } from "cdtn-types";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const InfoLink = ({ children, href }) => {
  if (!href.includes("http")) {
    return (
      <Link href={href} passHref>
        <a>{children}</a>
      </Link>
    );
  }
  return (
    <A11yLink href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </A11yLink>
  );
};

const processor = unified()
  // @ts-ignore
  .use(htmlToHtmlAst, { fragment: true })
  // @ts-ignore
  .use(htmlAstToReact, {
    Fragment: React.Fragment,
    components: {
      a: InfoLink,
    },
    createElement: React.createElement,
  });

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
    },
    relatedItems,
  } = { _source: {} },
}: EditorialContentDataWrapper) => {
  let editorialContent = contents?.map(({ name, references = [], blocks }) => {
    return (
      <>
        {blocks.map(
          ({
            type,
            imgUrl = "",
            altText = "",
            fileUrl = "",
            html = "",
            size,
          }) => {
            const reactContent: any = processor.processSync(html).result;
            return type === "graphic" ? (
              <div key={name}>
                <ImageWrapper src={toUrl(imgUrl)} altText={altText} />
                <DownloadWrapper>
                  <Button
                    as="a"
                    className="no-after"
                    href={toUrl(fileUrl)}
                    narrow
                    variant="navLink"
                    download
                  >
                    Télécharger l‘infographie (pdf - {size})
                    <Download />
                  </Button>
                </DownloadWrapper>
                <MoreContent noLeftPadding title="Voir en détail">
                  <Wrapper variant="dark">{reactContent}</Wrapper>
                </MoreContent>
              </div>
            ) : (
              <React.Fragment key={name}>{reactContent}</React.Fragment>
            );
          }
        )}
        {references.map(
          ({ label, links }) =>
            links.length > 0 && (
              <StyledReferences
                label={label}
                accordionDisplay={1}
                references={links.map((reference, index) => ({
                  ...reference,
                  id: reference.id || `${name}-${index}`,
                }))}
              />
            )
        )}
      </>
    );
  });
  let contentWrapper;
  if (editorialContent && editorialContent.length > 1) {
    contentWrapper =
      sectionDisplayMode === "tab" ? (
        <Tabs
          data={contents?.map(({ title, name }, index) => ({
            panel: editorialContent?.[index],
            tab: title,
          }))}
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
  const responseContainer = await fetch(
    `${API_URL}/items/${SOURCES.EDITORIAL_CONTENT}/${slug}`
  );
  if (!responseContainer.ok) {
    return { statusCode: responseContainer.status };
  }
  const information = await responseContainer.json();

  return { anchor, information };
};

const { breakpoints, spacings } = theme;

const TabStylesWrapper = styled.div`
  & > div > div > div {
    overflow-x: initial;
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

const DownloadWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const Download = styled(icons.Download)`
  width: 2.2rem;
  margin-left: ${spacings.xsmall};
`;

const StyledReferences = styled(References)`
  margin-top: ${spacings.xmedium};
`;
