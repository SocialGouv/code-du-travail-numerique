import {
  CodeSnippet,
  Container,
  Heading,
  PageTitle,
  Select,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Widget } from "../data";

type SelectItem = {
  value: string;
  label: string;
};

type IntegrationContainerProps = Omit<
  Widget,
  "shortDescription" | "metaTitle" | "metaDescription"
> & {
  host: string;
  selectOptions?: SelectItem[];
};

const IntegrationContainer = ({
  description,
  title,
  shortTitle,
  url,
  host,
  messages,
  id,
  selectOptions,
}: IntegrationContainerProps) => {
  const escape = (url: string) => {
    return url
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };
  const [message, setMessage] = useState("");
  const [oldSelectValue, setOldSelectValue] = useState<string | undefined>();
  const [selectValue, setSelectValue] = useState(selectOptions?.[0].value);
  const [parsedUrl, setParsedUrl] = useState(
    url.replace("[value]", selectValue ?? "")
  );
  const useScript = () => {
    useEffect(() => {
      const script = document.createElement("script");
      window?.addEventListener(
        "message",
        ({ data, source }) => {
          const iframe = document.getElementById(`cdtn-iframe-${id}`) as any;
          if (source === iframe?.contentWindow && data.kind === "click") {
            setMessage(data);
          }
        },
        false
      );

      script.src = "/widget.js";
      script.async = true;

      document.body.appendChild(script);

      const iframe = document.getElementById(
        `cdtn-iframe-${id}-${oldSelectValue}`
      ) as any;
      if (iframe) {
        const a = document.createElement("a");
        a.href = escape(`${host}${parsedUrl}`);
        iframe.after(a);
        iframe.remove();
      }

      return () => {
        document.body.removeChild(script);
      };
    }, [selectValue]);
  };
  useScript();
  return (
    <Container>
      <StyledTitle>{title}</StyledTitle>
      <Wrapper variant="main">
        {description.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
        {selectOptions && (
          <>
            <p></p>
            <Select
              onChange={(v) => {
                setOldSelectValue(selectValue);
                setSelectValue(v.target.value);
                setParsedUrl(url.replace("[value]", v.target.value ?? ""));
              }}
            >
              {selectOptions.map(({ value, label }) => {
                return (
                  <option key={label} value={value}>
                    {label}
                  </option>
                );
              })}
            </Select>
          </>
        )}
        <Separator />
        <a href={escape(`${host}${parsedUrl}`)}>{shortTitle}</a>
        <Separator />
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
        <Heading as="h2">Intégrez ce module à votre site</Heading>
        <p>L’installation se passe en deux temps :</p>
        <ol>
          <li>
            <p>
              ajoutez le code suivant dans la balise <code>&lt;body&gt;</code>{" "}
              de votre page&nbsp;:
            </p>

            <CodeSnippet>
              {`<script src="https://code.travail.gouv.fr/widget.js" defer></script>`}
            </CodeSnippet>
          </li>
          <li>
            <p>
              intégrez le code suivant à l’endroit où vous souhaitez voir le
              module s’afficher&nbsp;:
            </p>
            <CodeSnippet>{`<a href="https://code.travail.gouv.fr${parsedUrl}">${shortTitle}</a>`}</CodeSnippet>
          </li>
        </ol>

        {messages && (
          <>
            <Heading as="h3">Messages</Heading>
            <p>
              Il est possible d&apos;effectuer du tracking sur nos liens et
              boutons en interceptant les messages envoyés par le widget avec le
              code qui suit :
            </p>
            <CodeSnippet>
              {`window.addEventListener(
  "message",
  ({ data, source }) => {
    const iframe = document.getElementById('cdtn-iframe-${id}');
    if (
      source === iframe.contentWindow
      && data.kind === "click"
    ) {
      ${messages.click.map(
        ({ name, description }) => `
      data.name === '${name}' // ${description}`
      )}

    }
  }
);`}
            </CodeSnippet>
          </>
        )}
        <br />
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

const Separator = styled.div`
  border-top: 1px solid #e4e8ef;
  margin: 32px 0;
`;
