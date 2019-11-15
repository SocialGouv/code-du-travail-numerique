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
  publicRuntimeConfig: { API_URL }
} = getConfig();

const fetchSheetMT = ({ slug }) => fetch(`${API_URL}/sheets-mt/${slug}`);

const Source = ({ name, url }) => (
  <a href={url} target="_blank" rel="noopener noreferrer">
    Voir le contenu original sur : {name}{" "}
  </a>
);

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
        url
      },
      relatedItems
    } = data;
    const formattedSections = sections.map(section => ({
      id: section.anchor,
      title: <h3>{section.title}</h3>,
      body: <TabContent>{section.html}</TabContent>
    }));
    const footer = <Source name="Ministère du travail" url={url} />;
    return (
      <Layout>
        <Metas
          url={pageUrl}
          title={title}
          description={description}
          image={ogImage}
        />
        <Answer
          title={title}
          relatedItems={relatedItems}
          emptyMessage="Cette fiche n'a pas été trouvée"
          intro={intro && <Intro>{intro}</Intro>}
          footer={footer}
          date={date}
          sourceType="Fiche ministère du Travail"
          breadcrumbs={breadcrumbs}
        >
          <Accordion preExpanded={[anchor]} items={formattedSections} />
        </Answer>
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
