import { useEffect, useState } from "react";
import { PIWIK_URL } from "../../../config";

export const useDetectAdBlock = () => {
  const [adBlockDetected, setAdBlockDetected] = useState(false);

  useEffect(() => {
    fetch(PIWIK_URL, {
      method: "HEAD",
      mode: "no-cors",
      cache: "no-store",
    })
      .then(({ redirected }) => {
        if (redirected) setAdBlockDetected(true);
      })
      .catch(() => {
        setAdBlockDetected(true);
      });
  }, []);

  return adBlockDetected;
};
