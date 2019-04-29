import React from "react";
import Head from "next/head";
import Search from "../src/search/Search";
import { HomeLayout } from "../src/layout/HomeLayout";
import Categories from "../src/home/Categories";
import Outils from "../src/home/Outils";

const Home = () => (
  <HomeLayout>
    <Head>
      <title>Code du travail numérique</title>
      <meta
        name="description"
        content="Posez votre question sur le droit du travail et obtenez une réponse personalisée à vos questions (formation, rupture de contrat, démission, indémnités)."
      />
    </Head>
    <Search />
    <Categories />
    <Outils />
  </HomeLayout>
);

export default Home;
