// @ts-ignore
import fs from "fs";

export const downloadAllUrlsToValidate = async () => {
  const urls: string[] = ["/convention-collective", "/contribution"];

  const response = await fetch(
    "https://code-du-travail-numerique-preprod.ovh.fabrique.social.gouv.fr/api/plan-du-site"
  );
  const data = await response.json();

  data.informations.forEach((doc) => {
    urls.push("/information/" + doc.slug);
  });

  data.agreements.forEach((doc) => {
    urls.push("/convention-collective/" + doc.slug);
  });

  fs.writeFileSync(
    "./cypress/support/urls-to-validate.json",
    JSON.stringify(urls)
  );

  const urlsContributions: string[] = [];
  data.contributions.forEach((contrib) => {
    urlsContributions.push("/contribution/" + contrib.generic.slug);
    contrib.agreements.forEach((doc) => {
      urlsContributions.push("/contribution/" + doc.slug);
    });
  });

  fs.writeFileSync(
    "./cypress/support/urls-contributions-to-validate.json",
    JSON.stringify(urlsContributions)
  );
};
