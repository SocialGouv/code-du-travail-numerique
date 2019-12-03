import React from "react";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";

import SearchHero from "../src/search/SearchHero";
import { Layout } from "../src/layout/Layout";
import Themes from "../src/common/Themes";
import Outils from "../src/common/Outils";
import Metas from "../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const Home = ({ pageUrl, ogImage, children = [] }) => (
  <Layout currentPage="home">
    <Metas
      url={pageUrl}
      title="Code du travail numérique"
      description="Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (formation, rupture de contrat, démission, indemnités)."
      image={ogImage}
    />
    <SearchHero />
    <Outils />
    <Themes themes={children} />
  </Layout>
);

Home.getInitialProps = async () => {
  const response = await fetch(`${API_URL}/themes`);
  if (!response.ok) {
    return { statusCode: response.status };
  }
  const { children } = await response.json();
  return { children };
};

export default Home;
