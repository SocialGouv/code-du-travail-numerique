"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Select } from "@codegouvfr/react-dsfr/Select";
import React, { useEffect, useState } from "react";
import { IntegrationInstructions } from "./IntegrationInstructions";
import { IntegrationTracking } from "./IntegrationTracking";
import { IntegrationDetailContentProps } from "./types";
import Link from "../common/Link";

declare global {
  interface Window {
    cdtnLoadWidgets?: () => void;
  }
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
  const [message, setMessage] = useState<any>(null);
  const [selectValue, setSelectValue] = useState(selectOptions?.[0]?.value);
  const [parsedUrl, setParsedUrl] = useState(
    url.replace("[value]", selectValue ?? "")
  );

  const previewContainerId = `integration-widget-preview-${id}`;
  const widgetHref = `${host}${parsedUrl}`;

  useEffect(() => {
    if (!selectValue) return;
    setParsedUrl(url.replace("[value]", selectValue));
  }, [selectValue, url]);

  useEffect(() => {
    const handleMessage = ({ data, source }: MessageEvent) => {
      if (!data || data.kind !== "click") return;

      const container = document.getElementById(previewContainerId);
      const iframe = container?.querySelector(
        "iframe"
      ) as HTMLIFrameElement | null;

      if (iframe && source === iframe.contentWindow) {
        setMessage(data);
      }
    };

    window.addEventListener("message", handleMessage, false);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, [previewContainerId]);

  useEffect(() => {
    const existingScript =
      document.querySelector('script[data-cdtn-widget="true"]') ??
      document.querySelector('script[src="/widget.js"]') ??
      document.querySelector('script[src$="/widget.js"]');

    if (existingScript) {
      window.cdtnLoadWidgets?.();
      return;
    }

    const script = document.createElement("script");
    script.dataset.cdtnWidget = "true";
    script.src = "/widget.js";
    script.async = true;
    script.onload = () => {
      window.cdtnLoadWidgets?.();
    };
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  useEffect(() => {
    // Reset message display when switching the preview
    setMessage(null);

    // widget.js mutates the DOM (replaces the link with an iframe).
    // Before reloading, remove any previous iframe to avoid duplicates.
    const container = document.getElementById(previewContainerId);
    const existingIframe = container?.querySelector("iframe");
    existingIframe?.remove();

    window.cdtnLoadWidgets?.();
  }, [previewContainerId, widgetHref]);

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
        id={previewContainerId}
      >
        {/* Replaced by widget.js into an iframe */}
        <a href={widgetHref}>{shortTitle}</a>
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
        En cas de difficulté, nous vous invitons à nous contacter à l’adresse
        suivante&nbsp;:{" "}
        <Link href="mailto:codedutravailnumerique@travail.gouv.fr">
          codedutravailnumerique@travail.gouv.fr
        </Link>
      </p>
    </>
  );
};
