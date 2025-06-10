"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { css } from "@styled-system/css";
import React, { useEffect, useState } from "react";
import { IntegrationInstructions } from "./IntegrationInstructions";
import { IntegrationTracking } from "./IntegrationTracking";
import { IntegrationDetailContentProps } from "./types";

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

  return (
    <>
      <h1
        className={fr.cx("fr-h2", "fr-mb-4w")}
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
          className={fr.cx("fr-alert", "fr-alert--info", "fr-mb-4w")}
          data-testid="integration-detail-message"
        >
          <h3 className={fr.cx("fr-alert__title")}>Message envoyé:</h3>
          <pre>{JSON.stringify(message, null, 2)}</pre>
        </div>
      )}

      <IntegrationInstructions parsedUrl={parsedUrl} shortTitle={shortTitle} />

      {messages && <IntegrationTracking messages={messages} id={id} />}

      <p className={fr.cx("fr-mb-0")}>
        En cas de difficulté, nous vous invitons à nous contacter à
        l&apos;adresse suivante&nbsp;:{" "}
        <a href="mailto:codedutravailnumerique@travail.gouv.fr">
          codedutravailnumerique@travail.gouv.fr
        </a>
      </p>
    </>
  );
};
