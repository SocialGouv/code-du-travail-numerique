// node index.js > ../nomenclatures-`date +%Y%m%d`.json

const select = require("xpath.js");
const dom = require("xmldom").DOMParser;
const fs = require("fs");

const read = path => fs.readFileSync(path, 'latin1').toString();

const clean = str => str.replace(/en _uvre/g, "en oeuvre");

const getAttributes = node =>
  Array.from(node.attributes).reduce((a, c) => ({ ...a, [c.name]: clean(c.value) }), {});

const getChildValue = (node, childName) => {
  const child = select(node, `*[local-name()='${childName}']`)[0];
  if (child && child.firstChild) {
    return child.firstChild.data;
  }
};

// liste a plat du XML pour Reference|Penalite
const flattenXML = () => {
  const INPUT_XML = "./nomenclatures_20180413_060419.xml";
  const doc = new dom().parseFromString(read(INPUT_XML));
  const nodes = select(doc, "//*[local-name()='Reference' or local-name()='Penalite']");

  return nodes.map(node => {
    const nodeData = {
      type: node.nodeName,
      attrs: getAttributes(node),
      Texte: getChildValue(node, "Texte"),
      Commentaire: getChildValue(node, "Commentaire")
    };
    // remonte les parents jusque Nomenclature
    while ((node = node.parentNode) && node.nodeName !== "Nomenclature") {
      nodeData[node.nodeName] = getAttributes(node);
    }
    return nodeData;
  });
};

// groupe les references par article
const groupByArticle = refs =>
  refs.reduce((articles, ref) => {
    const refArticle = ref.attrs.article;
    if (!articles[refArticle]) {
      articles[refArticle] = [];
    }
    articles[refArticle].push(ref);
    return articles;
  }, {});

const JSONLog = data => console.log(JSON.stringify(data, null, 2));

JSONLog(groupByArticle(flattenXML()));
