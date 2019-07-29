const fs = require("fs");
const slugify = require("slugify");

const conventions = require("@socialgouv/kali-data/data/index.json");

/*
// todo parse everything into basic text
const convertRecursiveDataIntoText = data => {
  let texte = "";
}
*/

const slugifiedConventions = conventions.map(convention => ({
  ...convention,
  slug: slugify(`${convention.num}-${convention.titre}`.substring(0, 80), {
    lower: true
  }),
  url: `https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${
    convention.id
  }`
}));

fs.writeFileSync(
  "./ccn-list.json",
  JSON.stringify(slugifiedConventions, null, 2)
);

const ccnDocumentFileName = "./ccn-documents.json";

fs.writeFileSync(ccnDocumentFileName, "[");

// Here we split everything inside the convention into 3 parts: container + texte_de_base, textes_attaches and textes_salaires
conventions.forEach((convention, conventionIndex) => {
  const conventionDocuments = [];
  const hydratedConvention = require(`@socialgouv/kali-data/data/${
    convention.id
  }.json`);
  const texteDeBase = hydratedConvention.sections[0];
  const textesAttaches = hydratedConvention.sections.find(
    section => section.title === "Textes Attachés"
  );
  const texteSalaires = hydratedConvention.sections.find(
    section => section.title === "Textes Salaires"
  );
  conventionDocuments.push({
    ...hydratedConvention,
    texteDeBase,
    type: "convention"
  });
  if (textesAttaches && textesAttaches.length) {
    textesAttaches.forEach(texte => {
      conventionDocuments.push({
        ...texte,
        conventionId: convention.id,
        type: "attache"
      });
    });
  }
  if (texteSalaires && texteSalaires.length) {
    texteSalaires.forEach(texte => {
      conventionDocuments.push({
        ...texte,
        conventionId: convention.id,
        type: "salaire"
      });
    });
  }
  conventionDocuments.forEach((document, documentIndex) => {
    fs.appendFileSync(
      ccnDocumentFileName,
      `${
        conventionIndex === 0 && documentIndex === 0 ? "" : ","
      }${JSON.stringify(document)}`
    );
  });
});

fs.appendFileSync(ccnDocumentFileName, "]");
