"use client";
import { useEffect } from "react";

export const isIframe = () => {
  try {
    return window.self !== window.top;
  } catch (e) {
    return true;
  }
};

const minHeight = 200;

const postMessage = (value) => {
  try {
    window?.parent?.postMessage({ kind: "resize-height", value }, "*");
  } catch (e) {
    console.error(e);
  }
};
const postOffsetHeight = () => {
  const box = document.querySelector("body");
  box && postMessage(box.offsetHeight);
};

export const useIframeResizer = () => {
  useEffect(() => {
    if (!isIframe()) {
      return;
    }
    try {
      if (!window?.ResizeObserver) {
        return postOffsetHeight();
      }
      const observer = new ResizeObserver(([entry]) => {
        const value = Math.max(minHeight, entry.contentRect.height);
        window?.parent?.postMessage({ kind: "resize-height", value }, "*");
      });
      observer.observe(window?.document?.body);

      return () => observer.disconnect();
    } catch (e) {
      return postOffsetHeight();
    }
  }, []);
};
