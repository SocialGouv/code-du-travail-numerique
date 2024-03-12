// @ts-ignore
import fs from "fs";

export const downloadAllUrlsToValidate = async () => {
  const urls: string[] = ["/convention-collective", "/contribution"];

  const response = await fetch("/api/plan-du-site");
  const data = await response.json();

  data.agreements.forEach((doc) => {
    urls.push("/convention-collective/" + doc.slug);
  });

  data.contributions.forEach((contrib) => {
    urls.push("/contribution/" + contrib.generic.slug);
    contrib.agreements.forEach((doc) => {
      urls.push("/contribution/" + doc.slug);
    });
  });

  fs.writeFile("./cypress/support/urls-to-validate.json", JSON.stringify(urls));
  console.log(
    "Urls to validate saved to file ./cypress/support/urls-to-validate.json"
  );
};
