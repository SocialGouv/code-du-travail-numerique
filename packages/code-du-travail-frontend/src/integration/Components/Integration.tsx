import {
  Accordion,
  CodeSnippet,
  Container,
  PageTitle,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

type IntegrationContainerProps = {
  id: string;
  description: string;
  title: string;
  shortTitle: string;
  url: string;
  host: string;
};

const IntegrationContainer = ({
  id,
  description,
  title,
  shortTitle,
  url,
  host,
}: IntegrationContainerProps) => {
  const useScript = () => {
    useEffect(() => {
      const script = document.createElement("script");

      script.src = "/widget.js";
      script.async = true;

      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }, []);
  };
  useScript();
  // const router = useRouter();
  return (
    <Container narrow>
      <PageTitle>{title}</PageTitle>
      <Wrapper variant="main">
        <p>{description}</p>
        <a href={`${host}${url}`}>{shortTitle}</a>
        <p>
          Comment faire ? Voici la méthode pour intégrer ce module à votre site
          :
        </p>
        <Accordion
          titleLevel={2}
          preExpanded={["id-js"]}
          items={[
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
                    Ensuite, intégrez le code suivant à l’endroit où vous
                    souhaitez voir le module s’afficher&nbsp;:
                  </p>

                  <CodeSnippet>{`<a href="https://code.travail.gouv.fr${url}">${shortTitle}</a>`}</CodeSnippet>
                </>
              ),
              id: "id-js",
              title: "javascript",
            },
          ]}
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
