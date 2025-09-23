"use client";

import { DsfrHeadBase as DsfrHead } from "@codegouvfr/react-dsfr/next-app-router/DsfrHead";
import { DsfrProviderBase as DsfrProvider } from "@codegouvfr/react-dsfr/next-app-router/DsfrProvider";
import { createGetHtmlAttributes } from "@codegouvfr/react-dsfr/next-app-router/getHtmlAttributes";
import { DefaultColorScheme } from "@codegouvfr/react-dsfr/next-app-router";
import Link from "../common/Link";
import { MatomoProvider } from "./MatomoAnalytics";
import { StartDsfrLight } from "./StartDsfrLight";
import { ENV } from "../../config";
import { SentryTest } from "../sentry";
import { ConsentManager } from "../cookie-consent";
import { shouldShowCookieBanner } from "../cookie-consent/config";
import { usePathname } from "next/navigation";
import { Suspense } from "react";

type Props = {
  children: React.ReactNode;
  defaultColorScheme: DefaultColorScheme;
};

// Create the getHtmlAttributes function
const { getHtmlAttributes } = createGetHtmlAttributes({
  defaultColorScheme: "light",
});

// Component that uses usePathname wrapped in Suspense boundary
function CookieBannerWrapper() {
  const pathname = usePathname() || "";
  const showCookieBanner = shouldShowCookieBanner(pathname);
  return showCookieBanner ? <ConsentManager /> : null;
}

export default function DefaultLayout({ children, defaultColorScheme }: Props) {
  const lang = "fr";

  return (
    <Suspense fallback={null}>
      <MatomoProvider>
        <html {...getHtmlAttributes({ lang })}>
          <head>
            <StartDsfrLight />
            <DsfrHead
              Link={Link}
              preloadFonts={[
                //"Marianne-Light",
                //"Marianne-Light_Italic",
                "Marianne-Regular",
                //"Marianne-Regular_Italic",
                "Marianne-Medium",
                //"Marianne-Medium_Italic",
                "Marianne-Bold",
                //"Marianne-Bold_Italic",
                //"Spectral-Regular",
                //"Spectral-ExtraBold"
              ]}
            />
          </head>
          <body>
            <DsfrProvider
              lang={lang}
              Link={Link}
              defaultColorScheme={defaultColorScheme}
            >
              {children}
              <Suspense fallback={null}>
                <CookieBannerWrapper />
              </Suspense>
            </DsfrProvider>

            {ENV === "development" && <SentryTest />}
          </body>
        </html>
      </MatomoProvider>
    </Suspense>
  );
}
