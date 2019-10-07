export const feedbackUrl = "https://formspree.io/xbalrgzm";
export const feedbackLightUrl = "https://formspree.io/mlpjjlom";
import fetch from "isomorphic-unfetch";

export function postFeedback(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(r => r.json())
    .then(data => {
      if (data.error) {
        // meh! formspree api return 200 with a success / error data
        throw new Error("cannot send form : " + data.error);
      }
    });
}
