import { theme, Toast } from "@socialgouv/cdtn-ui";
import cookie from "js-cookie";
import React, { useCallback, useEffect, useState } from "react";
import styled from "styled-components";

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
      <Toast wide shadow animate="from-bottom" onRemove={onToastRemove}>
        Nous utilisons des cookies pour établir des mesures anonymisées de
        fréquentation et d’utilisation du site.
        <A
          title="Mentions legales"
          rel="noopener noreferrer"
          href="/mentions-legales"
        >
          En savoir plus
        </A>
      </Toast>
    </Wrapper>
  );
};

export default CookieConsent;

const { spacings } = theme;

const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  z-index: 4;
  width: 100%;
  padding: ${spacings.base};
`;

const A = styled.a`
  padding: 0 ${spacings.tiny};
`;
