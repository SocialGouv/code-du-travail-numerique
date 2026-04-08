"use client";

import { UnexpectedError } from "../src/modules/errors/UnexpectedError";
import { DsfrLayout } from "../src/modules/layout";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Erreur",
  description: "Erreur inattendue s'est produite",
};

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (error.name === "ChunkLoadError") {
      const key = `chunk-reload:${error.message}`;
      if (!sessionStorage.getItem(key)) {
        sessionStorage.setItem(key, "1");
        window.location.reload();
        return;
      }
    }
    console.error(error);
    Sentry.captureException(error);
  }, [error]);
  return (
    <DsfrLayout>
      <UnexpectedError />
    </DsfrLayout>
  );
}
