import React, { useState, useEffect } from "react";
import styled from "styled-components";
import cookie from "js-cookie";
import { Toast, theme } from "@socialgouv/react-ui";

const CookieConsent = () => {
  const [isCookieConsentHidden, setCookieConsentHidden] = useState(true);
  useEffect(() => {
    setCookieConsentHidden(cookie.get("cookieConsent"));
  }, []);
  if (isCookieConsentHidden) return null;
  return (
    <Wrapper>
      <Toast
        variant="info"
        wide
        shadow
        animate="from-bottom"
        onRemove={() => {
          setCookieConsentHidden(true);
          cookie.set("cookieConsent", true, { expires: 365 });
        }}
      >
        En poursuivant votre navigation sur ce site, vous acceptez l’utilisation
        de cookies pour établir des mesures de fréquentation et d’utilisation du
        site.
        <A
          title="consulter l'ordonance"
          rel="noopener noreferrer"
          href="http://master.code-du-travail-numerique.dev.factory.social.gouv.fr/mentions-legales"
        >
          En savoir plus
        </A>
      </Toast>
    </Wrapper>
  );
};

export default CookieConsent;

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
