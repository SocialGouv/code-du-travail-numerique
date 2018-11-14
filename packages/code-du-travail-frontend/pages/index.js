import React from "react";
import Head from "next/head";
import { Support } from "../src/support/Support";
import Search from "../src/search/Search";
import Categories from "../src/Categories";

const Home = () => (
  <div>
    <Head>
      <title>Code du travail numérique</title>
    </Head>
    <Search />
    <Categories />
    <Support />
  </div>
);

export default Home;
