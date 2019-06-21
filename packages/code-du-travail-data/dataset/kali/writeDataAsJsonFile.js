const fs = require("fs");
const path = require("path");
const { promisify } = require("util");

const writeFile = promisify(fs.writeFile);

const writeDataAsJsonFile = (data, fileName) => {
  const targetPath = path.join(__dirname, fileName);
  const promise = writeFile(targetPath, JSON.stringify(data, null, 2));
  promise.then(() => console.log(`Wrote ${targetPath}`));
  return promise;
};

module.exports = writeDataAsJsonFile;
