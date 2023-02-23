import { useEffect } from "react";

export const isIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

export const useIframeResizer = () => {
  useEffect(() => {
    if (!isIframe()) {
      return;
    }

    const minHeight = 700;
    const observer = new ResizeObserver(([entry]) => {
      const value = Math.max(minHeight, entry.contentRect.height);
      window.parent?.postMessage({ kind: "resize-height", value }, "*");
    });
    observer.observe(window.document.body);

    return () => observer.disconnect();
  }, []);
};
