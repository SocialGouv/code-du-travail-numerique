"use client";

import { UnexpectedError } from "../src/modules/error/UnexpectedError";
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
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
    Sentry.captureException(error);
  }, [error]);
  return (
    <DsfrLayout>
      <UnexpectedError />
    </DsfrLayout>
  );
}
