import "./globals.css";
import { DsfrHead } from "@codegouvfr/react-dsfr/next-appdir/DsfrHead";
import { DsfrProvider } from "@codegouvfr/react-dsfr/next-appdir/DsfrProvider";
import { getHtmlAttributes } from "@codegouvfr/react-dsfr/next-appdir/getHtmlAttributes";
import Link from "next/link";
import { defaultColorScheme } from "../src/modules/config/defaultColorScheme";
import { StartDsfr } from "../src/modules/config/StartDsfr";
import { Metadata } from "next/types";
import { SITE_URL } from "../src/config";
import { headers } from "next/headers";

export const metadata: Metadata = {
  title: {
    template: "%s  - Code du travail numérique",
    default: "Code du travail numérique",
  },
  description:
    "Posez votre question sur le droit du travail et obtenez une réponse personnalisée à vos questions (contrat de travail, congés payés, formation, démission, indemnités).",
  metadataBase: new URL(SITE_URL),
  twitter: {
    card: "summary",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const lang = "fr";
  const nonce = headers().get("x-nonce") ?? undefined;
  console.log("Nonce", nonce);
  return (
    <html
      {...getHtmlAttributes({ defaultColorScheme, lang })}
      prefix="og: http://ogp.me/ns#"
    >
      <head>
        <StartDsfr />
        <DsfrHead
          Link={Link}
          preloadFonts={[
            "Marianne-Regular",
            "Marianne-Medium",
            "Marianne-Bold",
          ]}
          nonce={nonce}
        />
      </head>
      <body>
        <DsfrProvider lang={lang}>{children}</DsfrProvider>
      </body>
    </html>
  );
}
