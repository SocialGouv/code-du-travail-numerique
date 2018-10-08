import React from "react";
import Head from "next/head";

import ContentComponents from "../src/content";
import Search from "../src/search/Search";

const urlToSourceType = {
  question: "faq"
  //"code-du-travail": "code_du_travail"
};

const getComponent = type => ContentComponents[urlToSourceType[type] || type];

class Content extends React.Component {
  static async getInitialProps({ res, query }) {
    const cmp = getComponent(query.source);
    const data = await cmp
      .fetch(query)
      .then(r => r.json())
      .catch(e => {
        console.log("e", e);
        throw e;
      });
    return {
      data,
      query
    };
  }

  render() {
    const { data, query } = this.props;
    const cmp = getComponent(query.source);
    const View = cmp.View;
    return (
      <React.Fragment>
        <Head>
          <title>{data._source.title}</title>
        </Head>
        <Search />
        <View {...data._source} />;
      </React.Fragment>
    );
  }
}

export default Content;
