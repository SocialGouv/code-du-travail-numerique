import React from "react";
import Head from "next/head";
import { Support } from "../src/support/Support";
import Search from "../src/search/Search";
import { HomeLayout } from "../src/layout/HomeLayout";
import Categories from "../src/Categories";

const Home = () => (
  <HomeLayout>
    <Head>
      <title>Code du travail numérique</title>
    </Head>
    <Search />
    <Categories />
    <Support />
  </HomeLayout>
);

export default Home;
