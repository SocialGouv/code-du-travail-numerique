import * as fs from "fs";
import * as path from "path";
import { FicheSPData } from "../src/fiche-service-public/type";
import { ficheSPDataSchema } from "./data/zod-types";

const { z } = require("zod");
const readline = require("readline");

const ficheSPDataArraySchema = z.array(ficheSPDataSchema);
const FICHES_SP_FILE = path.join(__dirname, "./data/fiches-sp.csv");
const main = async () => {
  const fileStream = fs.createReadStream(FICHES_SP_FILE);

  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });
  for await (const line of rl) {
    try {
      const documentJSON: FicheSPData[] = JSON.parse(
        JSON.parse(line.slice(1, -1)).raw
      ).children;
      // Valider le contenu JSON avec le schéma Zod
      console.log("HELLO", documentJSON.length);
      documentJSON.map((doc: FicheSPData) => {
        const parsedDocument = ficheSPDataSchema.parse(doc);

        // Afficher le contenu JSON validé
        console.log("parsedDocument");
        // console.log(parsedDocument);
      });
    } catch (error) {
      console.error(error);
      fs.writeFileSync("./zod-error.json", error.message, { flag: "a" });
      process.exit(1);
    }
  }
};

main();
