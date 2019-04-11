export const feedbackUrl = "https://formspree.io/xbalrgzm";

export function postFeedback(data) {
  return fetch(feedbackUrl, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(r => r.json())
    .then(data => {
      // todo (@ju) sentry/piwik
      if (data.error) {
        // meh! formspree api return 200 with a success / error data
        throw new Error("cannot send form : " + data.error);
      }
    });
}
