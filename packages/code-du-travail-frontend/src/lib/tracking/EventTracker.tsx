import { useRouter } from "next/router";
import React from "react";

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
      (window as any)._adftrack.push({
        HttpHost: "server.adform.net",
        pm: 2867419,
        divider: encodeURIComponent("|"),
        pagename: encodeURIComponent(
          "2023-10-code.travail.gouv.fr-PageAccueil-ToutesPages"
        ),
        order: {
          sv1: "<insert sv1 value here>",
        },
      });
    }
  }, [urlToTrack, router.asPath]);

  // if (!trackingEnabled) return <></>;

  return (
    <>
      {urlToTrack && (
        // eslint-disable-next-line @next/next/no-sync-scripts
        <script src="/static/tarteaucitron/initTarteaucitron.js" />
      )}
    </>
  );
}
