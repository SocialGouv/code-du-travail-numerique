import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import { Accordion } from "@socialgouv/react-ui";
import Answer from "../../src/common/Answer";
import { Layout } from "../../src/layout/Layout";
import Metas from "../../src/common/Metas";
import Html from "../../src/common/Html";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const fetchSheetMT = ({ slug }) => fetch(`${API_URL}/sheets-mt/${slug}`);

class Fiche extends React.Component {
  static async getInitialProps({ query, asPath }) {
    // beware, this one is undefined when rendered server-side
    const anchor = asPath.split("#")[1];
    const response = await fetchSheetMT(query);
    if (!response.ok) {
      return { statusCode: response.status };
    }

    const data = await response.json();
    return { data, anchor };
  }

  render() {
    const { data = { _source: {} }, anchor, pageUrl, ogImage } = this.props;
    const {
      _source: {
        breadcrumbs,
        date,
        description,
        intro,
        sections = [],
        title,
        url,
      },
      relatedItems,
    } = data;

    // titleless section have the page title but no anchor.
    const untitledSection = sections.find((section) => !section.anchor);
    const titledSections = sections
      .filter((section) => section.anchor)
      .map(({ anchor, html, title }) => ({
        id: anchor,
        title: <h2>{title}</h2>,
        body: <TabContent>{html}</TabContent>,
      }));
    return (
      <Layout>
        <Metas
          url={pageUrl}
          title={title}
          description={description}
          image={ogImage}
        />
        <StyledAnswer
          title={title}
          relatedItems={relatedItems}
          emptyMessage="Cette fiche n'a pas été trouvée"
          intro={intro && <Intro>{intro}</Intro>}
          date={date}
          source={{ name: "Fiche Ministère du travail", url }}
          breadcrumbs={breadcrumbs}
        >
          {untitledSection && <Html>{untitledSection.html}</Html>}
          <Accordion preExpanded={[anchor]} items={titledSections} />
        </StyledAnswer>
      </Layout>
    );
  }
}

export default withRouter(Fiche);

const Intro = styled(Html)`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

const TabContent = styled(Html)`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;

const StyledAnswer = styled(Answer)`
  img {
    max-width: 100%;
    height: auto;
  }
`;
