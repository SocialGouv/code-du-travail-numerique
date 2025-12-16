"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Select } from "@codegouvfr/react-dsfr/Select";
import { useEffect, useMemo, useRef, useState } from "react";
import { IntegrationInstructions } from "./IntegrationInstructions";
import { IntegrationTracking } from "./IntegrationTracking";
import { IntegrationDetailContentProps } from "./types";
import Link from "../common/Link";

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

  useEffect(() => {
    if (!selectValue) return;
    setParsedUrl(url.replace("[value]", selectValue));
  }, [selectValue, url]);

  const iframeSrc = useMemo(() => `${host}${parsedUrl}`, [host, parsedUrl]);
  const iframeDomId = useMemo(() => `cdtn-iframe-${id}`, [id]);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [iframeHeight, setIframeHeight] = useState<number>(200);

  useEffect(() => {
    const HEADER_MENU_HEIGHT = 50;

    const handleMessage = ({ data, source }: MessageEvent) => {
      const iframe = iframeRef.current;
      if (!iframe) return;
      if (source !== iframe.contentWindow) return;

      if (data?.kind === "resize-height" && typeof data?.value === "number") {
        setIframeHeight(data.value + 16);
      }

      if (data?.kind === "scroll-to-top") {
        const bodyPosition = document.body.getBoundingClientRect();
        const iframePosition = iframe.getBoundingClientRect();
        window.scrollTo(
          0,
          iframePosition.top - bodyPosition.top - HEADER_MENU_HEIGHT
        );
      }

      if (data?.kind === "click") {
        setMessage(data);
      }
    };

    window.addEventListener("message", handleMessage, false);
    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

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
        <iframe
          key={iframeSrc}
          ref={iframeRef}
          id={iframeDomId}
          title={shortTitle}
          src={iframeSrc}
          style={{
            width: "100%",
            border: "none",
            minHeight: 200,
            height: iframeHeight,
          }}
        />
        <p className={fr.cx("fr-mt-2w", "fr-mb-0")}>
          <Link href={iframeSrc} target="_blank" rel="noopener noreferrer">
            Ouvrir le widget dans un nouvel onglet
          </Link>
        </p>
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
        <Link href="mailto:codedutravailnumerique@travail.gouv.fr">
          codedutravailnumerique@travail.gouv.fr
        </Link>
      </p>
    </>
  );
};
