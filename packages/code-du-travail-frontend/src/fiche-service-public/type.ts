export type FicheSPDataText = { type: "text"; text: string };

export type FicheSPDataElementWithElementChildren =
  | FicheSPDataImage
  | FicheSPDataOuSAdresser
  | FicheSPDataWithElementChildren
  | FicheSPDataLienExterneCommente
  | FicheSPDataCas
  | FicheSPDataBlocCas
  | FicheSPDataChapitre
  | FicheSPDataListeSituations
  | FicheSPDataSituation
  | FicheSPDataAvertissement
  | FicheSPDataTableau;

export type FicheSPDataElement = {
  type: "element";
  children: FicheSPDataElement[] | FicheSPDataParagraphe[] | FicheSPDataText[];
  name:
    | "Introduction"
    | "Titre"
    | "Description"
    | "FragmentConditionne"
    | "SousChapitre"
    | "Expression"
    | "MiseEnEvidence"
    | "Valeur"
    | "Exposant"
    | "LienIntra"
    | "LienInterne";
};

export type FicheSPData =
  | FicheSPDataElement
  | FicheSPDataText
  | FicheSPDataBlocCas
  | FicheSPDataParagraphe
  | FicheSPDataLienExterneCommente
  | FicheSPDataLienExterne
  | FicheSPDataRessourceWeb
  | FicheSPDataOuSAdresser
  | FicheSPDataWithElementChildren
  | FicheSPDataTexteChapitre
  | FicheSPDataSituation
  | FicheSPDataListeSituations
  | FicheSPDataImage
  | FicheSPDataAvertissement
  | FicheSPDataList
  | FicheSPDataServiceEnLigne
  | FicheSPDataCas
  | FicheSPDataChapitre
  | FicheSPDataTableau
  | FicheSPDataTableauChildren;

export type FicheSPDataBlocCas = {
  type: "element";
  attributes: {
    affichage: string;
  };
  children: FicheSPDataCas[];
  name: "BlocCas";
};

export type FicheSPDataParagraphe = {
  type: "element";
  children: FicheSPDataText[];
  name: "Paragraphe";
};
export type FicheSPDataWithElementChildren = {
  type: "element";
  children: FicheSPDataElement[];
  name: "Texte" | "ANoter" | "ASavoir" | "Attention" | "Rappel";
};
export type FicheSPDataTableau = {
  type: "element";
  children: FicheSPDataTableauChildren[];
  name: "Tableau";
};
export type FicheSPDataTableauChildren = {
  type: "element";
  attributes: {
    type: string;
  };
  children: FicheSPDataElement[];
  name: "Rangée" | "Colonne";
};
export type FicheSPDataCas = {
  type: "element";
  children: FicheSPDataElement[] | FicheSPDataParagraphe[];
  name: "Cas";
};
export type FicheSPDataChapitre = {
  type: "element";
  children: FicheSPDataElement[] | FicheSPDataParagraphe[];
  name: "Chapitre";
};
export type FicheSPDataTexteChapitre = {
  type: "element";
  children: FicheSPDataChapitre[];
  name: "Texte";
};
export type FicheSPDataAvertissement = {
  type: "element";
  attributes?: { date: string };
  children: FicheSPDataElement[];
  name: "Avertissement";
};

export type FicheSPDataImage = {
  type: "element";
  attributes: {
    LienPublication: string;
    langue: string;
    poids: string;
    format: string;
    type: string;
    redimensionnable: string;
  };
  children: FicheSPDataElement[];
  name: "Image";
};

export type FicheSPDataLienExterneCommente = {
  type: "element";
  attributes: {
    URL: string;
  };
  children: FicheSPDataElement[];
  name: "LienExterneCommente";
};

export type FicheSPDataLienExterne = {
  type: "element";
  attributes: {
    URL: string;
  };
  children: FicheSPDataText[];
  name: "LienExterne";
};

export type FicheSPDataList = {
  type: "element";
  attributes: { type: string };
  children: FicheSPDataElement[];
  name: "Liste";
};

export type FicheSPDataRessourceWeb = {
  type: "element";
  attributes: {
    URL: string;
  };
  children: FicheSPDataElement[];
  name: "RessourceWeb";
};

export type FicheSPDataOuSAdresser = {
  type: "element";
  children: (FicheSPDataRessourceWeb | FicheSPDataElement)[];
  name: "OuSAdresser";
};

export type FicheSPDataServiceEnLigne = {
  type: "element";
  attributes: { URL: string };
  children: FicheSPDataElement[];
  name: "ServiceEnLigne" | "PourEnSavoirPlus";
};

export type FicheSPDataSituation = {
  type: "element";
  children: FicheSPDataElement[];
  name: "Situation";
};

export type FicheSPDataListeSituations = {
  type: "element";
  attributes: {
    affichage: string;
  };
  children: FicheSPDataSituation[];
  name: "ListeSituations";
};
