import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Toast, theme } from "@cdt/ui-old";

const Disclaimer = () => {
  const [isDisclaimerHidden, setDisclaimerHidden] = useState(true);
  useEffect(() => {
    setDisclaimerHidden(sessionStorage.getItem("isDisclaimerHidden"));
  }, []);
  if (isDisclaimerHidden) return null;
  return (
    <Wrapper>
      <Toast
        variant="warning"
        wide
        shadow
        animate="from-bottom"
        onRemove={() => {
          sessionStorage.setItem("isDisclaimerHidden", true);
          setDisclaimerHidden(true);
        }}
      >
        Ce site est en cours de construction, la fiabilité des réponses qui s’y
        trouvent ne sont pas garanties.
        <A
          title="consulter l'ordonance"
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.legifrance.gouv.fr/affichTexteArticle.do;jsessionid=AE9DCF75DDCF0465784CEE0E7D62729F.tplgfr37s_2?idArticle=JORFARTI000035607420&cidTexte=JORFTEXT000035607388&dateTexte=29990101&categorieLien=id"
        >
          L’ouverture officielle du site
        </A>
        est prévue pour 2020.
      </Toast>
    </Wrapper>
  );
};

export default Disclaimer;

const { spacing } = theme;

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  padding: ${spacing.base};
  width: 100%;
  z-index: 1000;
`;

const A = styled.a`
  padding: 0 ${spacing.tiny};
`;
