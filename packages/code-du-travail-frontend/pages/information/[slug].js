import React from "react";
import getConfig from "next/config";
import Link from "next/link";
import styled from "styled-components";
import {
  Button,
  icons,
  MoreContent,
  theme,
  Wrapper,
} from "@socialgouv/react-ui";
import { SOURCES } from "@cdt/sources";
import htmlToHtmlAst from "rehype-parse";
import htmlAstToReact from "rehype-react";
import unified from "unified";

import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import ReferencesJuridiques from "../../src/common/ReferencesJuridiques";
import TYPE_REFERENCE from "../../src/common/ReferencesJuridiques/typeReference";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const InfoLink = ({ children, href }) => {
  if (!href.includes("http")) {
    const [, sourceRoute, slug] = href.split("/");
    return (
      <Link href={`/${sourceRoute}${slug ? "/[slug]" : ""}`} as={href} passHref>
        <a>{children}</a>
      </Link>
    );
  }
  return (
    <a href={href} rel="noopener noreferrer" target="_blank">
      {children}
    </a>
  );
};

const processor = unified()
  .use(htmlToHtmlAst, { fragment: true })
  .use(htmlAstToReact, {
    createElement: React.createElement,
    components: {
      a: InfoLink,
    },
    Fragment: React.Fragment,
  });

const Information = ({
  pageUrl,
  ogImage,
  information: {
    _source: {
      breadcrumbs,
      contents,
      date,
      folder,
      description,
      references = [],
      title,
    },
    relatedItems,
  } = { _source: {} },
}) => {
  const editorialContent = contents.map(
    ({ type, name, altText, size, html }) => {
      const reactContent = processor.processSync(html).result;
      return type === "graphic" ? (
        <figure key={name}>
          <img src={`/docs/${folder}/graphics/${name}.jpg`} alt={altText} />
          <DownloadWrapper>
            <Button
              as="a"
              className="no-after"
              href={`/docs/${folder}/graphics/${name}.pdf`}
              narrow
              variant="navLink"
              download
            >
              Télécharger l‘infographie (pdf - {size})
              <Download />
            </Button>
          </DownloadWrapper>
          <figcaption>
            <MoreContent noLeftPadding title="Voir en détail">
              <Wrapper variant="dark">{reactContent}</Wrapper>
            </MoreContent>
          </figcaption>
        </figure>
      ) : (
        <React.Fragment key={name}>{reactContent}</React.Fragment>
      );
    }
  );
  return (
    <Layout>
      <Metas
        url={pageUrl}
        title={title}
        description={description}
        image={ogImage}
      />
      <Answer
        breadcrumbs={breadcrumbs}
        date={date}
        dateLabel="Mise à jour le"
        intro={description}
        relatedItems={relatedItems}
        title={title}
      >
        <GlobalStylesWrapper>{editorialContent}</GlobalStylesWrapper>
        {references.length > 0 && (
          <ReferencesJuridiques accordionDisplay={1} references={references} />
        )}
      </Answer>
    </Layout>
  );
};

export default Information;

Information.getInitialProps = async ({ query: { slug } }) => {
  const responseContainer = await fetch(
    `${API_URL}/items/${SOURCES.EDITORIAL_CONTENT}/${slug}`
  );
  if (!responseContainer.ok) {
    return { statusCode: responseContainer.status };
  }
  const information = await responseContainer.json();

  return { information };
};

const { breakpoints, spacings } = theme;

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
