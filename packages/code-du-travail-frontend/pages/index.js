import React from "react";
import getConfig from "next/config";
import Search from "../src/search/Search";
import { HomeLayout } from "../src/layout/HomeLayout";
import Themes from "../src/home/Themes";
import Outils from "../src/home/Outils";
import fetch from "isomorphic-unfetch";
import { Metas } from "../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const Home = ({ data: { themes } }) => (
  <HomeLayout>
    <Metas
      url=""
      title="Code du travail numérique"
      description="Posez votre question sur le droit du travail et obtenez une réponse personalisée à vos questions (formation, rupture de contrat, démission, indémnités)."
    />
    <Search />
    <Themes themes={themes} />
    <Outils />
  </HomeLayout>
);
Home.getInitialProps = async () => {
  const response = await fetch(`${API_URL}/themes`);
  if (!response.ok) {
    return {
      data: { themes: [] },
      errorCode: response.status,
      errorStatus: response.statusText
    };
  }
  const themes = await response.json();
  return {
    data: {
      themes: themes.children
    }
  };
};
export default Home;
