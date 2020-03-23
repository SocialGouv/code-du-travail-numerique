import fs from "fs";
import path from "path";
import { promisify } from "util";
import { getQuestions, getSituations } from "./lib";

const writeFile = promisify(fs.writeFile);

const SPREADSHEET_KEY = "1zd_hShEui8BHK0349GpDUZRkCcQ9syIZ9gSrkYKRdo0";

const dataTab = {
  "preavis-demission": 2,
  "preavis-licenciement": 3,
  "heures-recherche-emploi": 4,
};

async function main() {
  const questions = await getQuestions({
    spreadsheetKey: SPREADSHEET_KEY,
    worksheet: 1,
  });

  for (const [key, tabId] of Object.entries(dataTab)) {
    const situations = await getSituations({
      spreadsheetKey: SPREADSHEET_KEY,
      worksheet: tabId,
    });
    const jsonData = JSON.stringify({ questions, situations }, 0, 2);
    await writeFile(path.join(__dirname, `${key}.data.json`), jsonData);
    console.error(`writing ${key} data`, jsonData.length);
  }
}

if (module === require.main) {
  main().catch(error => {
    console.error(error);
  });
}
