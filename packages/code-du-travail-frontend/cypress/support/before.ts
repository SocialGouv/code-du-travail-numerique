import fs from "fs";

export const downloadAllUrlsToValidate = async () => {
  const urls: string[] = ["/convention-collective", "/contribution"];

  const response = await fetch(
    "https://code-du-travail-numerique-preprod.dev.fabrique.social.gouv.fr/api/plan-du-site"
  );
  const data = await response.json();
  const agreements = data.agreements;
  const contributions = data.contributions;
  contributions.forEach((contrib) => {
    urls.push("/contribution/" + contrib.generic.slug);
    contrib.agreements.forEach((doc) => {
      urls.push("/contribution/" + doc.slug);
    });
  });
  agreements.forEach((doc) => {
    urls.push("/convention-collective/" + doc.slug);
  });

  fs.writeFile(
    "./cypress/support/urls-to-validate.json",
    JSON.stringify(urls)
  );
  console.log(
    "Urls to validate saved to file ./cypress/integration/light/urls-to-validate.json"
  );
};
