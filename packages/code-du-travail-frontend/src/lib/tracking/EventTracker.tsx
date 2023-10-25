import { useRouter } from "next/router";
import React from "react";
import Script from "next/script";

import { URL_TRACKED } from "./constants";

const trackingEnabled =
  process.env.NEXT_PUBLIC_IS_PRODUCTION_DEPLOYMENT === "true";

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
    if (
      typeof window !== "undefined" &&
      typeof (window as any)._adftrack !== "undefined" &&
      urlToTrack
    ) {
      (window as any)._adftrack = Array.isArray((window as any)._adftrack)
        ? (window as any)._adftrack
        : (window as any)._adftrack
        ? [(window as any)._adftrack]
        : [];
      (window as any)._adftrack.push({
        HttpHost: "server.adform.net",
        pm: 2867419,
        divider: encodeURIComponent("|"),
        pagename: encodeURIComponent(
          "2023-10-code.travail.gouv.fr-PageAccueil-ToutesPages"
        ),
        order: {
          sv1: `${window.location.origin}${urlToTrack.url}`,
        },
      });
      (function () {
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        s.src = "https://s2.adform.net/banners/scripts/st/trackpoint-async.js";
        var x: any = document.getElementsByTagName("script")[0];
        x.parentNode.insertBefore(s, x);
      })();
    }
  }, [urlToTrack, router.asPath]);

  if (!trackingEnabled) return <></>;

  return (
    <>
      {urlToTrack && (
        <Script src="/static/tarteaucitron/initTarteaucitron.js" />
      )}
    </>
  );
}
