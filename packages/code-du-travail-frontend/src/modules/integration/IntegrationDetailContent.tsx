"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Select } from "@codegouvfr/react-dsfr/Select";
import React, { useEffect, useState } from "react";

export type SelectItem = {
  value: string;
  label: string;
};

export type WidgetMessage = {
  [action: string]: {
    name: string;
    description: string;
    extra?: {
      [key: string]: string;
    };
  }[];
};

export type Widget = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  description: string[];
  shortTitle: string;
  shortDescription: string;
  url: string;
  id: string;
  messages?: WidgetMessage;
  isModele?: boolean;
};

export type Integration = {
  [slug: string]: Widget;
};

export interface IntegrationDetailContentProps
  extends Omit<Widget, "shortDescription" | "metaTitle" | "metaDescription"> {
  host: string;
  selectOptions?: SelectItem[] | null;
}

export const IntegrationDetailContent = ({
  description,
  title,
  shortTitle,
  url,
  host,
  messages,
  id,
  selectOptions,
}: IntegrationDetailContentProps) => {
  const escape = (url: string) => {
    return url
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const [message, setMessage] = useState<any>("");
  const [selectValue, setSelectValue] = useState(selectOptions?.[0]?.value);
  const [parsedUrl, setParsedUrl] = useState(
    url.replace("[value]", selectValue ?? "")
  );

  useEffect(() => {
    if (!selectValue) return;
    setParsedUrl(url.replace("[value]", selectValue));
  }, [selectValue, url]);

  useEffect(() => {
    const script = document.createElement("script");

    const handleMessage = ({ data, source }: MessageEvent) => {
      const iframe = document.getElementById(
        `cdtn-iframe-${id}`
      ) as HTMLIFrameElement;
      if (source === iframe?.contentWindow && data.kind === "click") {
        setMessage(data);
      }
    };

    window?.addEventListener("message", handleMessage, false);
    script.src = "/widget.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      window?.removeEventListener("message", handleMessage);
    };
  }, [id]);

  const codeBlockStyle = {
    backgroundColor: "#f5f5fe",
    padding: "1rem",
    borderRadius: "0.25rem",
    overflow: "auto" as const,
  };

  return (
    <>
      <h1
        className={fr.cx("fr-h2", "fr-mb-4w")}
        style={{ textAlign: "center" }}
        data-testid="integration-detail-title"
      >
        {title}
      </h1>

      <div
        className={fr.cx("fr-mb-4w")}
        data-testid="integration-detail-description"
      >
        {description.map((text, index) => (
          <p key={index} className={fr.cx("fr-mb-2w")}>
            {text}
          </p>
        ))}
      </div>

      {selectOptions && (
        <div
          className={fr.cx("fr-mb-4w")}
          data-testid="integration-detail-select"
        >
          <Select
            label=""
            nativeSelectProps={{
              onChange: (e) => setSelectValue(e.target.value),
              value: selectValue,
            }}
          >
            {selectOptions.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </Select>
        </div>
      )}

      <hr className={fr.cx("fr-hr", "fr-my-4w")} />

      <div
        className={fr.cx("fr-mb-4w")}
        data-testid="integration-detail-preview"
      >
        <a href={escape(`${host}${parsedUrl}`)}>{shortTitle}</a>
      </div>

      <hr className={fr.cx("fr-hr", "fr-my-4w")} />

      {message && (
        <div
          className={fr.cx("fr-callout", "fr-mb-4w")}
          data-testid="integration-detail-message"
        >
          <h3 className={fr.cx("fr-callout__title")}>Message envoyé:</h3>
          <pre style={{ ...codeBlockStyle, whiteSpace: "pre-wrap" }}>
            {JSON.stringify(message, null, 2)}
          </pre>
        </div>
      )}

      <IntegrationInstructions parsedUrl={parsedUrl} shortTitle={shortTitle} />

      {messages && <IntegrationTracking messages={messages} id={id} />}

      <div className={fr.cx("fr-alert", "fr-alert--info", "fr-mb-4w")}>
        <p className={fr.cx("fr-alert__title")}>Besoin d&apos;aide ?</p>
        <p>
          En cas de difficulté, nous vous invitons à nous contacter à
          l&apos;adresse suivante&nbsp;:{" "}
          <a href="mailto:codedutravailnumerique@travail.gouv.fr">
            codedutravailnumerique@travail.gouv.fr
          </a>
        </p>
      </div>
    </>
  );
};

interface IntegrationInstructionsProps {
  parsedUrl: string;
  shortTitle: string;
}

const IntegrationInstructions = ({
  parsedUrl,
  shortTitle,
}: IntegrationInstructionsProps) => {
  const codeBlockStyle = {
    backgroundColor: "#f5f5fe",
    padding: "1rem",
    borderRadius: "0.25rem",
    overflow: "auto" as const,
  };

  return (
    <div className={fr.cx("fr-mb-6w")} data-testid="integration-instructions">
      <h2 className={fr.cx("fr-h3", "fr-mb-3w")}>
        Intégrez ce module à votre site
      </h2>
      <p className={fr.cx("fr-mb-2w")}>
        L&apos;installation se passe en deux temps :
      </p>

      <ol className={fr.cx("fr-mb-4w")}>
        <li className={fr.cx("fr-mb-3w")}>
          <p className={fr.cx("fr-mb-1w")}>
            Ajoutez le code suivant dans la balise <code>&lt;body&gt;</code> de
            votre page&nbsp;:
          </p>
          <pre style={codeBlockStyle}>
            {`<script src="https://code.travail.gouv.fr/widget.js" defer></script>`}
          </pre>
        </li>
        <li>
          <p className={fr.cx("fr-mb-1w")}>
            Intégrez le code suivant à l&apos;endroit où vous souhaitez voir le
            module s&apos;afficher&nbsp;:
          </p>
          <pre style={codeBlockStyle}>
            {`<a href="https://code.travail.gouv.fr${parsedUrl}">${shortTitle}</a>`}
          </pre>
        </li>
      </ol>
    </div>
  );
};

interface IntegrationTrackingProps {
  messages: NonNullable<Widget["messages"]>;
  id: string;
}

const IntegrationTracking = ({ messages, id }: IntegrationTrackingProps) => {
  const codeBlockStyle = {
    fontSize: "0.875rem",
    backgroundColor: "#f5f5fe",
    padding: "1rem",
    borderRadius: "0.25rem",
    overflow: "auto" as const,
  };

  return (
    <div className={fr.cx("fr-mb-6w")} data-testid="integration-tracking">
      <h3 className={fr.cx("fr-h4", "fr-mb-3w")}>Messages</h3>
      <p className={fr.cx("fr-mb-2w")}>
        Il est possible d&apos;effectuer du tracking sur nos liens et boutons en
        interceptant les messages envoyés par le widget avec le code qui suit :
      </p>
      <pre style={codeBlockStyle}>
        {`window.addEventListener(
  "message",
  ({ data, source }) => {
    const iframe = document.getElementById('cdtn-iframe-${id}');
    if (
      source === iframe.contentWindow
      ${Object.keys(messages)
        .map((key) => `&& data.kind === "${key}"`)
        .join("\n      ")}
    ) {
      ${Object.keys(messages)
        .map((key) =>
          messages[key]
            .map(({ name, description, extra }) => {
              let extraString = "";
              if (extra) {
                extraString = Object.entries(extra)
                  .map(
                    ([key, value]) => `\n      data.extra.${key} // ${value}`
                  )
                  .join("");
              }
              return `data.name === '${name}' // ${description}${extraString}`;
            })
            .join("\n      ")
        )
        .join("\n      ")}
    }
  }
);`}
      </pre>
    </div>
  );
};
