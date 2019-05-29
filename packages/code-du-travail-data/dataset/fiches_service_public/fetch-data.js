const ora = require("ora");
const axios = require("axios");
const fs = require("fs");
const Zip = require("adm-zip");

const dataPath = "./data/";

// if urls change too often, we might need to parse the dom of the pages
// which contain the button links and get their url from here

const urls = {
  particuliers:
    "https://www.data.gouv.fr/fr/datasets/r/0ed10f28-d197-4324-97b3-037f625095ac",
  professionnels:
    "https://www.data.gouv.fr/fr/datasets/r/93c81767-6ae6-4b31-8dd7-2158e560d181",
  associations:
    "https://www.data.gouv.fr/fr/datasets/r/405bb3f6-ee61-4b85-92c9-3bdd2685e7cc"
};

if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath);
}

Object.entries(urls).forEach(async ([type, url]) => {
  const downloadSpinner = ora(
    `Downloading "${type}" fiches from ${url}`
  ).start();
  const zipPath = `${dataPath}${type}.zip`;
  try {
    const response = await axios.get(url, { responseType: "stream" });
    const writer = fs.createWriteStream(zipPath);
    response.data.pipe(writer);
    await new Promise((resolve, reject) => {
      writer.on("finish", resolve);
      writer.on("error", reject);
    });
    downloadSpinner.succeed(`Download of "${type}" fiches succeeded`);
  } catch (error) {
    downloadSpinner.fail(
      `Something wrong happened while fetching "${type}" fiches from ${url}`
    );
    console.log(error);
  }
  const extractSpinner = ora(`Extracting zip file into folder`).start();
  try {
    const zip = new Zip(zipPath);
    zip.extractAllTo(`${dataPath}${type}`, true);
    fs.unlinkSync(zipPath);
    extractSpinner.succeed(
      `Zip file correctly extracted into folder ${zipPath}`
    );
  } catch (error) {
    extractSpinner.fail(`Something wrong happened while extracting the zip`);
  }
});
