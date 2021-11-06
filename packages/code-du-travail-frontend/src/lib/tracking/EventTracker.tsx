import { useRouter } from "next/router";
import React from "react";

import { URL_TRACKED } from "./constants";

export default function EventTracker(): JSX.Element {
  const router = useRouter();

  const urlToTrack = React.useMemo(() => {
    const path = router.asPath ?? "";
    const cleanPath = path.includes("?")
      ? path.substring(0, path.indexOf("?"))
      : path;
    return URL_TRACKED.find((urlTracked) => urlTracked.url === cleanPath);
  }, [router.asPath]);

  React.useEffect(() => {
    if (typeof window !== "undefined" && typeof window.gtag !== "undefined") {
      window.gtag("event", "conversion", {
        allow_custom_scripts: true,
        send_to: `DC-3048978/emplo253/${urlToTrack.type}+unique`,
        u1: `${window.location.origin}${urlToTrack.url}`,
      });
    }
  }, [urlToTrack, router.asPath]);

  return (
    <>
      {urlToTrack && (
        <script
          type="text/javascript"
          src="/static/tarteaucitron/initTarteaucitron.js"
        />
      )}
    </>
  );
}
