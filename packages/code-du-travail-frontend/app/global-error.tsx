"use client";

import { useEffect } from "react";
import { UnexpectedError } from "../src/modules/error/UnexpectedError";
import { Metadata } from "next";
import { captureError } from "../src/modules/sentry/error";

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
    captureError(error, {
      type: "client",
      url: window.location.href,
      path: window.location.pathname,
    });
  }, [error]);

  return (
    <html>
      <body>
        <UnexpectedError />
      </body>
    </html>
  );
}
