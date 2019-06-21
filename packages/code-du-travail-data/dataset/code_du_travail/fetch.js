const fs = require("fs");
const path = require("path");
const DilaApiClient = require("dila-api-client");

const dilaApi = new DilaApiClient();

const JSONLog = data => console.log(JSON.stringify(data, null, 2));

// get structure + content
const getFullCode = params =>
  dilaApi.fetchCodeTableMatieres({ params, embedArticles: true });

// get full code from DILA, then slimify the file. from 229Mb to 19Mb
const getCodeDuTravail = () =>
  getFullCode({
    date: new Date().getTime(),
    sctId: "",
    textId: "LEGITEXT000006072050"
  }).then(code => ({
    type: "code",
    data: {
      cid: "LEGITEXT000006072050",
      titre: "Code du travail",
      titrefull: "Code du travail"
    },
    children: dilaApi.expandChildren(code)
  }));

if (require.main === module) {
  getCodeDuTravail()
    .then(code => {
      JSONLog(code);
      if (process.argv.length === 3) {
        const targetPath = path.join(__dirname, process.argv[2]);
        fs.writeFile(targetPath, JSON.stringify(code, null, 2), e => {
          if (e) {
            throw e;
          }
          console.log(`Wrote ${targetPath}`);
        });
      }
    })
    .catch(console.log);
}
