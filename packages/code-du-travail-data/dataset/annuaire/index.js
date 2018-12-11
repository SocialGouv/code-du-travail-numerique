const readdir = require("recursive-readdir");
const { parseXml, parseXmlString } = require("libxmljs");

const { basename } = require("path");
const fs = require("fs");
const { promisify } = require("util");
const readFile = promisify(fs.readFile);

function allowedFile(file) {
  const allowedPrefix = [
    "dirrecte",
    "afpa",
    "cci",
    "chambre_agriculture",
    "chambre_metier",
    "cicas",
    "cidf"
  ];
  return allowedPrefix.some(prefix => basename(file).startsWith(prefix));
}
async function getFiles(dir) {
  const files = await readdir(dir);
  return files.filter(allowedFile);
}

async function transformFiles(files) {
  const items = [];
  for (file of files) {
    const xmlData = await readFile(file, "utf8");
    const xmlDoc = parseXmlString(xmlData, { noblanks: true });
    try {
      items.push(getData(xmlDoc));
    } catch (error) {
      console.error(file, error);
    }
  }
  return items;
}

function getData(xmlDoc) {
  const addresses = xmlDoc.find("/Organisme/Adresse");
  let address;
  if (addresses.length > 1) {
    address = addresses.find(node =>
      /postale$/.test(node.attr("type").value())
    );
  } else {
    address = addresses[0];
  }
  const tel = xmlDoc.get("//CoordonnéesNum/Téléphone");
  const email = xmlDoc.get("//CoordonnéesNum/Email");
  return {
    title: xmlDoc.get("//Nom").text(),
    type: xmlDoc
      .get("/Organisme")
      .attr("pivotLocal")
      .value(),
    id: xmlDoc
      .get("/Organisme")
      .attr("id")
      .value(),
    address: {
      lignes: address.find("Ligne").map(node => node.text()),
      code: address.get("CodePostal").text(),
      city: address.get("NomCommune").text()
    },
    coord: {
      lat: address.get("//Latitude").text(),
      lon: address.get("//Longitude").text()
    },
    tel: tel && tel.text(),
    email: email && email.text()
  };
}

function sortByDepartementAndType(ficheA, ficheB) {
  const val = ficheA.address.code.localeCompare(ficheB.address.code);
  if (val === 0) {
    return ficheA.id.localeCompare(ficheB.id);
  }
  return val;
}

async function main() {
  const files = await getFiles("./data");
  const fiches = await transformFiles(files);
  const sortedFiches = fiches.sort(sortByDepartementAndType);
  console.log(JSON.stringify(sortedFiches, null, 2));
}

main();
