import React, { useState, useEffect } from "react";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import styled from "styled-components";
import { Toast, theme } from "@cdt/ui";

import { Link } from "../routes";
import Search from "../src/search/Search";
import { HomeLayout } from "../src/layout/HomeLayout";
import Themes from "../src/home/Themes";
import Outils from "../src/home/Outils";
import { Metas } from "../src/common/Metas";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

const Home = ({ pageUrl, ogImage, data: { themes } }) => (
  <HomeLayout>
    <Metas
      url={pageUrl}
      title="Code du travail numérique"
      description="Posez votre question sur le droit du travail et obtenez une réponse personalisée à vos questions (formation, rupture de contrat, démission, indémnités)."
      image={ogImage}
    />
    <ToastDroitDuTravail />
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

const ToastDroitDuTravail = () => {
  const [isToastHidden, setToastHidden] = useState(true);
  useEffect(() => {
    setToastHidden(localStorage.getItem("isToastHidden"));
  });
  if (isToastHidden) return null;
  return (
    <Wrapper>
      <Toast
        shadow
        animate="from-top"
        onRemove={() => {
          localStorage.setItem("isToastHidden", true);
          setToastHidden(true);
        }}
      >
        <Link route="droit-du-travail">
          <a>Le droit du travail, c‘est quoi ?</a>
        </Link>
      </Toast>
    </Wrapper>
  );
};

const { spacing } = theme;

const Wrapper = styled.div`
  display: inline-block;
  position: fixed;
  top: 0;
  left: 50%;
  margin: 0 auto;
  padding: ${spacing.base};
  z-index: 10000;
  transform: translateX(-50%);
`;
