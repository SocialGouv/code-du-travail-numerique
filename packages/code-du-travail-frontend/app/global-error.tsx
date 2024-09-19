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
