import React, { useState, useEffect, useCallback } from "react";
import styled from "styled-components";
import cookie from "js-cookie";
import { Toast, theme } from "@socialgouv/react-ui";

const CookieConsent = () => {
  const [isCookieConsentHidden, setCookieConsentHidden] = useState(true);
  useEffect(() => {
    setCookieConsentHidden(cookie.get("cookieConsent"));
  }, []);
  const onToastRemove = useCallback(() => {
    setCookieConsentHidden(true);
    cookie.set("cookieConsent", true, { expires: 365 });
  }, []);

  if (isCookieConsentHidden) return null;

  return (
    <Wrapper>
      <Toast
        variant="info"
        wide
        shadow
        animate="from-bottom"
        onRemove={onToastRemove}
      >
        Nous utilisons des cookies pour établir des mesures anonymisées de
        fréquentation et d’utilisation du site.
        <A
          title="Mentions legales"
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
  z-index: 1000;
  width: 100%;
  padding: ${spacing.base};
`;

const A = styled.a`
  padding: 0 ${spacing.tiny};
`;
