export function safeJsonStringify(value: unknown): string {
  // Prevent breaking out of the <script> tag and mitigate XSS vectors.
  // See: https://react.dev/reference/react-dom/components/common#dangerously-setting-the-inner-html
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}
