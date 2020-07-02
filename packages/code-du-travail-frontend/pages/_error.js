// https://nextjs.org/docs/advanced-features/custom-error-page
import { Button, Container, Section, theme } from "@socialgouv/react-ui";
import React, { useEffect } from "react";
import styled from "styled-components";

import { Layout } from "../src/layout/Layout";
import { initializeSentry, notifySentry } from "../src/sentry";

initializeSentry();

export default function CustomError({ message, statusCode }) {
  useEffect(() => {
    if (statusCode && statusCode >= 400) {
      notifySentry(statusCode, message);
    }
  }, [message, statusCode]);

  return (
    <Layout>
      <CenteredContainer>
        {statusCode && <Suptitle>ERREUR {statusCode}</Suptitle>}
        <H1>Désolé, une erreur s’est produite…</H1>
        <p>Notre équipe technique a été informée et interviendra sous peu.</p>
        <Section>
          <Button variant="primary" as="a" href="/">
            Revenir à la page d’accueil
          </Button>
        </Section>
      </CenteredContainer>
    </Layout>
  );
}

CustomError.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { message: err && err.message, statusCode };
};

const { fonts, spacings } = theme;

const Suptitle = styled.div`
  margin-bottom: ${spacings.base};
  color: ${({ theme }) => theme.altText};
  font-weight: bold;
  font-size: ${fonts.sizes.headings.small};
`;

const H1 = styled.h1`
  margin-top: 0;
`;

const CenteredContainer = styled(Container)`
  text-align: center;
`;
