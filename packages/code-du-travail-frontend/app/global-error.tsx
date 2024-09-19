"use client";

import { useEffect } from "react";
import { UnexpectedError } from "../src/modules/error/UnexpectedError";
import * as Sentry from "@sentry/nextjs";

export default function GlobalError({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
    Sentry.captureException(error);
  }, [error]);

  return (
    // global-error must include html and body tags
    <html>
      <body>
        <UnexpectedError />
      </body>
    </html>
  );
}
