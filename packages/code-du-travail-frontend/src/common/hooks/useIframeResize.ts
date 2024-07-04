import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";

export const isIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

const minHeight = 200;
export const useIframeResizer = () => {
  useEffect(() => {
    if (!isIframe()) {
      return;
    }
    try {
      if (!window?.ResizeObserver) {
        return;
      }
      const observer = new ResizeObserver(([entry]) => {
        const value = Math.max(minHeight, entry.contentRect.height);
        window?.parent?.postMessage({ kind: "resize-height", value }, "*");
      });
      observer.observe(window?.document?.body);

      return () => observer.disconnect();
    } catch (e) {
      console.error(e);
      Sentry.captureException(e);
    }
  }, []);
};
