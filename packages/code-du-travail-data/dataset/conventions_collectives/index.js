const fs = require("fs");
const slugify = require("slugify");

const conventions = require("@socialgouv/kali-data/data/index.json");

const slugifiedConventions = conventions.map(convention => ({
  ...convention,
  slug: slugify(`${convention.num}-${convention.titre}`.substring(0, 80), {
    lower: true
  }),
  url: `https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=${convention.id}`
}));

fs.writeFileSync(
  "./ccn-list.json",
  JSON.stringify(slugifiedConventions, null, 2)
);
