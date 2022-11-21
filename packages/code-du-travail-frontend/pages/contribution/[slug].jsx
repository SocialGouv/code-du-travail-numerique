import { extractMdxContentUrl } from "@cdt/data";
import getConfig from "next/config";
import { withRouter } from "next/router";
import React from "react";

import Answer from "../../src/common/Answer";
import Metas from "../../src/common/Metas";
import Contribution from "../../src/contributions/Contribution";
import { Layout } from "../../src/layout/Layout";
import EventTracker from "../../src/lib/tracking/EventTracker";

const {
  publicRuntimeConfig: { API_URL },
} = getConfig();

const fetchQuestion = ({ slug }) =>
  fetch(`${API_URL}/items/contributions/${slug}`);

class PageContribution extends React.Component {
  static async getInitialProps({ query }) {
    const response = await fetchQuestion(query);
    if (!response.ok) {
      return { statusCode: response.status };
    }
    const data = await response.json();

    // Check Content tag exist on markdown
    const markdown =
      ((((data || {})._source || {}).answers || {}).generic || {}).markdown ||
      "";

    const contentUrl = extractMdxContentUrl(markdown);
    if (contentUrl) {
      const fetchContent = await fetch(`${API_URL}/items?url=${contentUrl}`);
      const [content] = await fetchContent.json();
      return { content, data };
    }

    return { data };
  }

  buildTitleAndDescription(breadcrumbs, conventionAnswer, title, description) {
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
  }

  buildDescription(title, description) {
    if (title) {
      return title + " " + description;
    }
    return description;
  }

  render() {
    const {
      data: {
        _source: { breadcrumbs, title, answers, description },
        relatedItems,
      } = {
        _source: {},
      },
      content,
    } = this.props;

    const metas = this.buildTitleAndDescription(
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
            emptyMessage="Cette question n'a pas été trouvée"
          >
            <Contribution
              answers={answers}
              content={(content && content._source) || {}}
            />
          </Answer>
        </Layout>
        <EventTracker />
      </div>
    );
  }
}

export default withRouter(PageContribution);
