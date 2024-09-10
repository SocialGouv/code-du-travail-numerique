"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    // global-error must include html and body tags
    <html>
      <body>
        <h2>Erreur</h2>
        <button onClick={() => reset()}>Try again</button>
      </body>
    </html>
  );
}
