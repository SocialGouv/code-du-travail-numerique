import React, { useCallback, useState } from "react";
import styled from "styled-components";
import fetch from "isomorphic-unfetch";
import Link from "next/link";
import * as Sentry from "@sentry/browser";
import {
  Button,
  Container,
  Heading,
  icons,
  Input,
  Label,
  PageTitle,
  Section,
  theme,
  Toast,
  Wrapper
} from "@socialgouv/react-ui";

import { Layout } from "../src/layout/Layout";
import Metas from "../src/common/Metas";

const SARBACANE_LIST_ID = "NfFYeerWTaqxwdEcAH6Ttw";
const SARBACANE_ACCOUNT_ID = "5aa7db65b85b5350ef1cf23b";

const STATUS = {
  INITIAL: "initial",
  INVALID: "invalid",
  LOADING: "loading",
  REGISTERED: "registered",
  ERRORED: "errored"
};

const Newsletter = ({ pageUrl, ogImage }) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState(STATUS.INITIAL);

  const checkEmail = useCallback(email => {
    if (/.+@.+\..+/.test(email)) {
      setStatus(STATUS.INITIAL);
      return true;
    }
    setStatus(STATUS.INVALID);
    return false;
  }, []);

  const onSubmit = useCallback(
    async email => {
      if (!checkEmail(email, setStatus)) {
        return;
      }
      try {
        setStatus(STATUS.LOADING);
        const response = await fetch(
          `https://sarbacaneapis.com/v1/lists/${SARBACANE_LIST_ID}/contacts/upsert`,
          {
            method: "POST",
            headers: new Headers({
              accountId: SARBACANE_ACCOUNT_ID
            }),
            body: JSON.stringify({ email })
          }
        );
        if (response.ok) {
          setStatus(STATUS.REGISTERED);
        } else {
          setStatus(STATUS.ERRORED);
          const data = await response.json();
          Sentry.captureException(data.message);
        }
      } catch (error) {
        setStatus(STATUS.ERRORED);
        Sentry.captureException(error);
      }
    },
    [checkEmail]
  );

  let currentView = null;
  switch (status) {
    case STATUS.REGISTERED:
      currentView = (
        <CenterDiv>
          <Toast shadow animate="from-top">
            <StyledHeading as={Heading}>
              L’enregistrement s’est bien effectué.
            </StyledHeading>
            <CenterDiv>
              Merci de l’intérêt que vous portez au Code du Travail
              numérique&nbsp;!
              <br />
              <Link href="/" passHref>
                <Button variant="primary" as={StyledLink}>
                  Retourner sur la page d’accueil <StyledArrowRight />
                </Button>
              </Link>
            </CenterDiv>
          </Toast>
        </CenterDiv>
      );
      break;
    case STATUS.ERRORED:
      currentView = (
        <CenterDiv>
          <Toast shadow variant="primary" animate="from-top">
            <StyledHeading as={Heading}>
              Oups, une erreur est survenue pendant l’inscription.
            </StyledHeading>
            <CenterDiv>
              Nos équipes ont été informées.
              <br />
              <Link href="/" passHref>
                <Button variant="primary" as={StyledLink}>
                  Retourner sur la page d’accueil <StyledArrowRight />
                </Button>
              </Link>
            </CenterDiv>
          </Toast>
        </CenterDiv>
      );
      break;
    default:
      currentView = (
        <Wrapper variant="main">
          <Form
            onSubmit={e => {
              e.preventDefault();
              onSubmit(email);
            }}
          >
            <Label htmlFor="newsletter-email">Votre adresse email</Label>
            <Input
              name="email"
              id="newsletter-email"
              invalid={status === STATUS.INVALID}
              disabled={status === STATUS.LOADING}
              onChange={event => {
                setEmail(event.target.value);
                if (status === STATUS.INVALID) {
                  checkEmail(event.target.value);
                }
              }}
              onFocus={event =>
                event.target.value === "" && setStatus(STATUS.INITIAL)
              }
              onBlur={event => {
                checkEmail(event.target.value);
              }}
              value={email}
            />
            {status === STATUS.INVALID && (
              <Error>
                {email === ""
                  ? "Merci de renseigner votre email"
                  : "Adresse email invalide"}
              </Error>
            )}
            <SubmitWrapper>
              <StyledButton
                variant="primary"
                disabled={
                  status === STATUS.INVALID || status === STATUS.LOADING
                }
              >
                {status === STATUS.LOADING
                  ? "Enregistrement en cours"
                  : "S’inscrire"}
              </StyledButton>
            </SubmitWrapper>
          </Form>
        </Wrapper>
      );
      break;
  }

  return (
    <Layout>
      <Metas
        url={pageUrl}
        title="Inscription à la newsletter - Code du travail numérique"
        description="Inscription à la newsletter du Code du travail numérique. Recevez tous les mois l’actualité du Code du travail numérique."
        image={ogImage}
      />
      <Section>
        <Container narrow>
          <PageTitle>
            Recevez tous les mois l’actualité du Code du travail numérique
          </PageTitle>
          {currentView}
        </Container>
      </Section>
    </Layout>
  );
};
export default Newsletter;

const { breakpoints, spacings } = theme;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: stretch;
`;

const Error = styled.div`
  margin-top: ${theme.spacings.small};
  color: ${({ theme }) => theme.error};
  font-size: ${theme.fonts.sizes.small};
`;

const SubmitWrapper = styled.div`
  margin-top: ${spacings.xmedium};
  text-align: center;
  @media (max-width: ${breakpoints.mobile}) {
    display: flex;
    justify-content: stretch;
  }
`;

const StyledButton = styled(Button)`
  @media (max-width: ${breakpoints.mobile}) {
    flex: 1 0 auto;
  }
`;

const StyledHeading = styled.div`
  margin-top: ${spacings.base};
  text-align: center;
`;

const CenterDiv = styled.div`
  text-align: center;
`;

const StyledArrowRight = styled(icons.DirectionRight)`
  width: 2.8rem;
  height: 1.5rem;
  margin-left: ${spacings.base};
`;

const StyledLink = styled.a`
  margin: ${spacings.xmedium} 0;
`;
