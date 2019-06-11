import React from "react";
import Head from "next/head";
import getConfig from "next/config";
import Search from "../src/search/Search";
import { HomeLayout } from "../src/layout/HomeLayout";
import Themes from "../src/home/Themes";
import Outils from "../src/home/Outils";
import fetch from "isomorphic-unfetch";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const Home = ({ data: { themes } }) => (
  <HomeLayout>
    <Head>
      <title>Code du travail numérique</title>
      <meta
        name="description"
        content="Posez votre question sur le droit du travail et obtenez une réponse personalisée à vos questions (formation, rupture de contrat, démission, indémnités)."
      />
    </Head>
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
