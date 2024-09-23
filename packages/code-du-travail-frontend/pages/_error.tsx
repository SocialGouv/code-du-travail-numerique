import * as Sentry from "@sentry/nextjs";
import { Button, Container, Section, theme } from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";
import Error from "next/error";

import { Layout } from "../src/layout/Layout";

const MyError = ({ statusCode }) => {
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
};

MyError.getInitialProps = async (contextData) => {
  // In case this is running in a serverless function, await this in order to give Sentry
  // time to send the error before the lambda exits
  await Sentry.captureUnderscoreErrorException(contextData);

  // This will contain the status code of the response
  return Error.getInitialProps(contextData);
};

export default MyError;

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
