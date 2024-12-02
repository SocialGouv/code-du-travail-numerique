"use client";

import { useEffect } from "react";
import { UnexpectedError } from "../src/modules/error/UnexpectedError";
import * as Sentry from "@sentry/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erreur",
  description: "Erreur inattendue s'est produite",
};

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
    Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body>
        <UnexpectedError />
      </body>
    </html>
  );
}
