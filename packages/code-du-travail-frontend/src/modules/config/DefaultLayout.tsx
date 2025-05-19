import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import Link from "../common/Link";
import { MatomoAnalytics } from "./MatomoAnalytics";
import { DefaultColorScheme } from "@codegouvfr/react-dsfr/next-appdir";
import { StartDsfrLight } from "./StartDsfrLight";
import { ENV } from "../../config";
import { SentryTest } from "../sentry";
import { ConsentManager } from "../cookie-consent";

type Props = {
  children: React.ReactNode;
  nonce: string | undefined;
  defaultColorScheme: DefaultColorScheme;
};

export default function DefaultLayout({
  children,
  nonce,
  defaultColorScheme,
}: Props) {
  const lang = "fr";
  return (
    <html {...getHtmlAttributes({ defaultColorScheme, lang })}>
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
          nonce={nonce}
        />
      </head>
      <body>
        <DsfrProvider lang={lang}>
          {children}
          <ConsentManager />
        </DsfrProvider>
        <MatomoAnalytics />
        {ENV === "development" && <SentryTest />}
      </body>
    </html>
  );
}
