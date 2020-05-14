// https://nextjs.org/docs/advanced-features/custom-error-page
import React, { useEffect } from "react";
import styled from "styled-components";
import { Button, Container, Section } from "@socialgouv/react-ui";
import { Layout } from "../src/layout/Layout";
import { initializeSentry, notifySentry } from "../src/sentry";

initializeSentry();

export default function CustomError({ message, statusCode }) {
  useEffect(() => {
    if (statusCode && statusCode >= 400) {
      notifySentry(statusCode, message);
    }
  }, [message, statusCode]);

  const content = (
    <>
      <h1>
        {statusCode
          ? `Nous sommes navrés, une erreur ${statusCode} est survenue.`
          : "Nous sommes navrés, une erreur est survenue."}
      </h1>
      <p>Notre équipe technique a été informée.</p>
      <Section>
        <Button variant="primary" as="a" href="/">
          Revenir à la page d’accueil
        </Button>
      </Section>
    </>
  );

  return (
    <Layout>
      <CenteredContainer>{content}</CenteredContainer>
    </Layout>
  );
}

CustomError.getInitialProps = async ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : null;
  return { statusCode, message: err && err.message };
};

const CenteredContainer = styled(Container)`
  text-align: center;
`;
