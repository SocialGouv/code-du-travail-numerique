import React from "react";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

import SearchHero from "../src/search/SearchHero";
import { Layout } from "../src/layout/Layout";
import Themes from "../src/common/Themes";
import Tools from "../src/common/Tools";
import Metas from "../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const Home = ({ pageUrl, ogImage, themes = [], tools = [] }) => (
  <Layout hideSearch={true}>
    <Metas
      url={pageUrl}
      title="Code du travail numérique"
      description="Posez votre question sur le droit du travail et obtenez une réponse personalisée à vos questions (formation, rupture de contrat, démission, indemnités)."
      image={ogImage}
    />
    <SearchHero />
    <Tools tools={tools} />
    <Themes themes={themes} />
  </Layout>
);

Home.getInitialProps = async () => {
  const [themesResponse, toolsResponse] = await Promise.all([
    fetch(`${API_URL}/themes`),
    fetch(`${API_URL}/tools`)
  ]);
  if (!themesResponse.ok) {
    return { statusCode: themesResponse.status };
  }
  if (!toolsResponse.ok) {
    return { statusCode: toolsResponse.status };
  }
  const [{ children: themes }, { children: tools }] = await Promise.all([
    themesResponse.json(),
    toolsResponse.json()
  ]);

  return { themes, tools };
};

export default Home;
