import { PIWIK_URL } from "../../../config";

export const detectAdBlockCall = async (): Promise<boolean> => {
  return fetch(PIWIK_URL, {
    method: "HEAD",
    mode: "no-cors",
    cache: "no-store",
  })
    .then(({ redirected }) => {
      return redirected;
    })
    .catch(() => {
      return true;
    });
};
