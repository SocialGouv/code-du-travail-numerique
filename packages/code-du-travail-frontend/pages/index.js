import React from "react";
import Head from "next/head";
import { Support } from "../src/support/Support";
import Search from "../src/search/Search";
import { HomeLayout } from "../src/layout/HomeLayout";
import Categories from "../src/home/Categories";
import Outils from "../src/home/Outils";

const Home = () => (
  <HomeLayout>
    <Head>
      <title>Code du travail numérique</title>
    </Head>
    <Search />
    <Categories />
    <Outils />
    <Support />
  </HomeLayout>
);

export default Home;
