"use client";

import { fr } from "@codegouvfr/react-dsfr";
import { Button } from "@codegouvfr/react-dsfr/Button";
import { useState, useRef } from "react";
import { css } from "@styled-system/css";
import { useModeleEvents } from "../tracking";

export const CopyButton = ({ slug }: { slug: string }) => {
  const [isCopied, setCopied] = useState(false);
  const trackCopy = useModeleEvents(slug);
  const modelCopiedRef = useRef<HTMLParagraphElement>(null);

  const copyToClipboard = (text: string): boolean => {
    try {
      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.top = "-9999px";
      textarea.style.left = "-9999px";
      document.body.appendChild(textarea);
      textarea.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(textarea);
      return ok;
    } catch {
      return false;
    }
  };

  const copyContent = async () => {
    const container = document?.getElementById("content-to-copy");
    if (!container) return;

    const text = container.innerText || container.textContent || "";
    if (!text) return;

    try {
      // Prefer modern clipboard API (requires user gesture + permissions).
      if (navigator?.clipboard?.writeText) {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        trackCopy();
        setTimeout(() => {
          modelCopiedRef.current?.focus();
        }, 100);
        return;
      }
    } catch {
      // fallthrough to legacy
    }

    const ok = copyToClipboard(text);
    if (ok) {
      setCopied(true);
      trackCopy();
      setTimeout(() => {
        modelCopiedRef.current?.focus();
      }, 100);
    }
  };

  return (
    <>
      <Button
        data-testid="copy-button"
        className={w100}
        iconId="fr-icon-clipboard-line"
        onClick={copyContent}
        priority="secondary"
      >
        Copier le modèle
      </Button>
      <div className={`${fr.cx("fr-py-2v")} ${fixHeight}`} aria-live="polite">
        {isCopied && (
          <div>
            <p ref={modelCopiedRef} tabIndex={-1}>
              <span
                className={`${fr.cx("ri-check-line")} ${css({
                  color: "var(--text-default-success)",
                })}`}
                aria-hidden="true"
              />
              Modèle copié
            </p>
          </div>
        )}
      </div>
    </>
  );
};

const w100 = css({
  w: "100%!",
  justifyContent: "center",
});

const fixHeight = css({
  h: "48px",
});
