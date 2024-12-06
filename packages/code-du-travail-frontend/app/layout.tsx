import "./globals.css";
import { Metadata } from "next/types";
import { SITE_URL } from "../src/config";
import { headers } from "next/headers";
import DefaultLayout from "../src/modules/config/DefaultLayout";

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
  const headersData = headers();
  const nonce = headersData.get("x-nonce") ?? undefined;

  return (
    <DefaultLayout nonce={nonce} defaultColorScheme={"light"}>
      {children}
    </DefaultLayout>
  );
}
