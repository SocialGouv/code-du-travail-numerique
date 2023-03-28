import {
  Accordion,
  CodeSnippet,
  Container,
  PageTitle,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { WidgetMessage } from "../data";

type IntegrationContainerProps = {
  id: string;
  description: string;
  title: string;
  shortTitle: string;
  url: string;
  host: string;
  messages?: WidgetMessage;
};

const IntegrationContainer = ({
  description,
  title,
  shortTitle,
  url,
  host,
  messages,
}: IntegrationContainerProps) => {
  const [message, setMessage] = useState("");
  const useScript = () => {
    useEffect(() => {
      const script = document.createElement("script");
      window?.addEventListener(
        "message",
        ({ data }) => {
          if (data.action === "click") {
            setMessage(data);
          }
        },
        false
      );

      script.src = "/widget.js";
      script.async = true;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }, []);
  };
  useScript();
  const accordionItems = [
    {
      body: (
        <>
          <p>
            L’installation se passe en deux temps.
            <br />
            Premièrement, ajoutez le code suivant dans la balise{" "}
            <code>&lt;body&gt;</code> de votre page&nbsp;:
          </p>
          <CodeSnippet>
            {`<script src="https://code.travail.gouv.fr/widget.js" defer></script>`}
          </CodeSnippet>
          <p>
            Ensuite, intégrez le code suivant à l’endroit où vous souhaitez voir
            le module s’afficher&nbsp;:
          </p>

          <CodeSnippet>{`<a href="https://code.travail.gouv.fr${url}">${shortTitle}</a>`}</CodeSnippet>
        </>
      ),
      id: "id-js",
      title: "javascript",
    },
  ];
  if (messages) {
    const messageCode = (
      <>
        <CodeSnippet>
          {`
      window?.addEventListener(
        "message",
        ({ data }) => {
          if (data.action === "click") {
            ${messages.click.map(
              ({ name, description }) => `
            data.name === '${name}' // ${description}`
            )}

          }
        },
        false
      );
    `}
        </CodeSnippet>
      </>
    );
    accordionItems.push({
      body: (
        <>
          <p>
            Il est possible d&apos;intercepter des messages provenant de clicks
            sur ce widget avec le code qui suit :
          </p>
          {messageCode}
        </>
      ),
      id: "id-js",
      title: "messages",
    });
  }
  return (
    <Container>
      <StyledTitle>{title}</StyledTitle>
      <Wrapper variant="main">
        <p>{description}</p>
        <a href={`${host}${url}`}>{shortTitle}</a>
        {message ? (
          <div>
            Message envoyé:
            <CodeSnippet variant="secondary">
              {JSON.stringify(message)}
            </CodeSnippet>
          </div>
        ) : (
          <></>
        )}
        <p>
          Comment faire ? Voici la méthode pour intégrer ce module à votre site
          :
        </p>
        <Accordion
          titleLevel={2}
          preExpanded={["id-js"]}
          items={accordionItems}
        />
        <p>
          En cas de difficulté, nous vous invitons à nous contacter à l’adresse
          suivante&nbsp;:{" "}
          <a href="mailto:codedutravailnumerique@travail.gouv.fr">
            codedutravailnumerique@travail.gouv.fr
          </a>
        </p>
      </Wrapper>
    </Container>
  );
};

export default IntegrationContainer;

const StyledTitle = styled(PageTitle)`
  max-width: 700px;
  margin: auto;
  margin-bottom: 40px;
`;
