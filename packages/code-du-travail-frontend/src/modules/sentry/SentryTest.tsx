"use client";

import { Button } from "@codegouvfr/react-dsfr/Button";
import { useCallback, useEffect, useState } from "react";
import { Container } from "@socialgouv/cdtn-ui";

export const SentryTest = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState("");
  const [errorEnabled, setErrorEnabled] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const newText = typedText + event.key.toLowerCase();
      setTypedText(newText.slice(-6)); // Keep only last 6 characters

      if (newText.endsWith("sentry")) {
        setIsVisible(true);
        console.log("Sentry test activated!");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [typedText]);

  const triggerServerError = useCallback(async () => {
    try {
      console.log("Making request to test endpoint...");
      // Make a request to our test endpoint that will throw a server error
      const response = await fetch("/api/test-sentry-error?trigger=true");
      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response
          .text()
          .catch(() => "No error text available");
        console.error("Server error details:", {
          status: response.status,
          statusText: response.statusText,
          errorText,
        });
        throw new Error(`Server error: ${response.status} - ${errorText}`);
      }
    } catch (error) {
      console.error("Server-side error test:", error);
      throw error;
    }
  }, []);

  const triggerError = useCallback(() => {
    // Log configuration and start of error test
    console.log("Starting Sentry test with config:", {
      dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
      environment: process.env.NEXT_PUBLIC_EGAPRO_ENV,
    });

    console.log(
      "Triggering test error - this should be caught by the error boundary..."
    );

    // Create and throw an error that will be caught by the error boundary
    try {
      // Create an error with a stack trace by actually throwing it
      throw new Error("Test error for Sentry integration");
    } catch (e) {
      const error = e as Error;
      error.name = "SentryTestError";
      error.cause = "Manual test trigger";
      throw error;
    }
  }, []);

  if (!isVisible) return null;
  const arrayOfString = ["a", "b", "c"];
  return (
    <Container>
      <div>
        <Button onClick={triggerError}>Trigger client-side error</Button>
      </div>
      <div>
        <Button
          onClick={() => {
            setErrorEnabled(true);
          }}
        >
          Trigger client-side error 2
        </Button>
      </div>
      <div>
        <Button onClick={triggerServerError}>Trigger server-side error</Button>
      </div>
      {errorEnabled && <div>{arrayOfString}</div>}
    </Container>
  );
};
