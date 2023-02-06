import * as Sentry from "@sentry/nextjs";
import { Button, Container, Section, theme } from "@socialgouv/cdtn-ui";
import NextErrorComponent from "next/error";
import React from "react";
import styled from "styled-components";

import { Layout } from "../src/layout/Layout";

const MyError = ({ statusCode, hasGetInitialPropsRun, err }) => {
  if (!hasGetInitialPropsRun && err) {
    // getInitialProps is not called in case of
    // https://github.com/vercel/next.js/issues/8592. As a workaround, we pass
    // err via _app.js so it can be captured
    Sentry.captureException(err);
    // Flushing is not required in this case as it only happens on the client
  }

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

MyError.getInitialProps = async ({ res, err, asPath }) => {
  const errorInitialProps = {
    message: err && err.message,
    ...(await NextErrorComponent.getInitialProps({
      err,
      res,
    })),
  };

  // Workaround for https://github.com/vercel/next.js/issues/8592, mark when
  // getInitialProps has run
  errorInitialProps.hasGetInitialPropsRun = true;

  if (err) {
    Sentry.captureException(err);

    // Flushing before returning is necessary if deploying to Vercel, see
    // https://vercel.com/docs/platform/limits#streaming-responses
    await Sentry.flush(2000);

    return errorInitialProps;
  }

  // If this point is reached, getInitialProps was called without any
  // information about what the error might be. This is unexpected and may
  // indicate a bug introduced in Next.js, so record it in Sentry
  Sentry.captureException(
    new Error(`_error.js getInitialProps missing data at path: ${asPath}`)
  );
  await Sentry.flush(2000);

  return errorInitialProps;
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
