export type ApiSearchResponse = {
  results: ApiSearchItemResponse[];
  totalResultNumber: number;
};

export type ApiSearchItemResponse = {
  titles: [ApiSearchItemTitleResponse];
  raisonSociale: string;
  idcc?: string;
  dateSignature: string;
  dateDiffusion: string;
  reference: string;
  themes: string[];
  conforme: boolean;
};

export type ApiSearchItemTitleResponse = {
  id: string;
  cid: string;
  title: string;
};

export type EntrepriseAccordsResponse = {
  accords: AccordResponse[];
  total: number;
};

export type AccordResponse = {
  id: string;
  title: string;
  dateSignature?: string;
  dateDebut?: string;
  dateFin?: string;
  texteIntegral?: boolean;
  signataires?: string[];
  themes?: string[];
};

export interface ApiEntrepriseAccordResponse {
  acco: ApiAccordResponse;
}

export interface ApiAccordResponse {
  id: string;
  titreTexte: string;
  attachementUrl: string;
  fileSize: string;
  data: string;
  numero: string;
  siret: string;
  dateMaj: number;
  dateDepot: number;
  dateTexte: number;
  relevantDate: number;
  dateEffet: number;
  dateFin: number;
  dateDiffusion: number;
  codeApe: string;
  codeIdcc: any;
  raisonSociale: string;
  conformeVersionIntegrale: boolean;
  secteur: string;
  themes: ApiAccordThemeResponse[];
  syndicats: ApiAccordSyndicatResponse[];
  signataires: string[];
  attachment: ApiAccordAttachmentResponse;
}

export interface ApiAccordThemeResponse {
  code: string;
  libelle: string;
  groupe: string;
}

export interface ApiAccordSyndicatResponse {
  code: string;
  libelle: string;
}

export interface ApiAccordAttachmentResponse {
  content: string;
  modified: number;
  date: number;
  content_type: string;
  content_length: number;
  language: string;
}
