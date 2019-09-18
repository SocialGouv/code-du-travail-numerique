import ReponseIcon from "../icons/ReponseIcon";
import ArticleIcon from "../icons/ArticleIcon";
import ModeleCourrierIcon from "../icons/ModeleCourrierIcon";
import DossierIcon from "../icons/DossierIcon";
import OutilIcon from "../icons/OutilsIcon";

// TODO use @sources package here to get labels
export const getSourceIcon = (source = "") => {
  switch (source) {
    case "faq":
      return ReponseIcon;
    case "fiches_service_public":
    case "fiches_ministere_travail":
      return ReponseIcon;

    case "code_du_travail":
      return ArticleIcon;
    case "modeles_de_courriers":
      return ModeleCourrierIcon;
    case "themes":
      return DossierIcon;
    case "outils":
      return OutilIcon;
    case "conventions_collectives":
      return ArticleIcon;
    default:
      return null;
  }
};

export const groupBySource = items =>
  items.reduce((accumulator, item) => {
    const itemSource = item._source.source;
    if (accumulator[itemSource]) {
      accumulator[itemSource].push(item._source);
    } else {
      accumulator[itemSource] = [item._source];
    }
    return accumulator;
  }, {});

const law = ["code_du_travail", "conventions_collectives"];

export const groupByDisplayCategory = items =>
  items.reduce(
    (accumulator, item) => {
      const itemSource = item._source.source;
      if (itemSource === "themes") {
        accumulator.themes.push(item._source);
      } else if (law.includes(itemSource)) {
        accumulator.law.push(item._source);
      } else {
        accumulator.matches.push(item._source);
      }
      return accumulator;
    },
    {
      matches: [],
      law: [],
      themes: []
    }
  );
