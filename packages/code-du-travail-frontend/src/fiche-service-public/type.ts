export type FicheSPDataText = { type: "text"; text: string };

export type FicheSPDataElementWithElementChildren =
  | FicheSPDataImage
  | OuSAdresserType
  | FicheSPDataWithElementChildren
  | FicheSPDataLienExterneCommente
  | FicheSPDataCas
  | FicheSPDataBlocCas
  | FicheSPDataChapitre
  | FicheSPDataListeSituations
  | FicheSPDataSituation
  | FicheSPDataAvertissement;

export type FicheSPDataElement = {
  type: "element";
  children: FicheSPDataElement[] | FicheSPDataParagraphe[] | FicheSPDataText[];
  name:
    | "Introduction"
    | "Tableau"
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
  | RessourceWebType
  | OuSAdresserType
  | FicheSPDataWithElementChildren
  | FicheSPDataTexteChapitre
  | FicheSPDataSituation
  | FicheSPDataListeSituations
  | FicheSPDataImage
  | FicheSPDataAvertissement
  | FicheSPDataList
  | FicheSPDataServiceEnLigne
  | FicheSPDataCas
  | FicheSPDataChapitre;

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

export type RessourceWebType = {
  type: "element";
  attributes: {
    URL: string;
  };
  children: FicheSPDataElement[];
  name: "RessourceWeb";
};

export type OuSAdresserType = {
  type: "element";
  children: (RessourceWebType | FicheSPDataElement)[];
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
