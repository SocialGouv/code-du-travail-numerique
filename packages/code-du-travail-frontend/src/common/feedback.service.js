export const feedbackUrl = "https://formspree.io/xwbdjqem";

export function postFeedback(data) {
  return fetch(feedbackUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(r => r.json());
}
