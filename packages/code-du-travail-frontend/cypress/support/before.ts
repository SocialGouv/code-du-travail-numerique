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
  console.log(
    "Urls à valider sauvegardées dans le fichier ./cypress/support/urls-to-validate.json"
  );

  const urlsContributions: string[] = [];
  data.contributions.forEach((contrib) => {
    urlsContributions.push("/contribution/" + contrib.generic.slug);
    contrib.agreements.forEach((doc) => {
      urlsContributions.push("/contribution/" + doc.slug);
    });
  });

  let count = 1;
  const FILE_SIZE = 600;

  for (let i = 0; i < urlsContributions.length; i += FILE_SIZE) {
    const part = urlsContributions.slice(i, i + FILE_SIZE);
    fs.writeFileSync(
      `./cypress/support/urls-contributions-to-validate-${count}.json`,
      JSON.stringify(part)
    );
    count++;
  }

  console.log(
    `Urls des contributions à valider sauvegardées dans les fichier "./cypress/support/urls-contributions-to-validate-[1...${
      count - 1
    }].json"`
  );
};
