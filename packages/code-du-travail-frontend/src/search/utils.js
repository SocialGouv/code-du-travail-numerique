export const summarize = (text = "") =>
  text.length > 160 ? text.slice(0, text.indexOf(" ", 160)) + "…" : text;
