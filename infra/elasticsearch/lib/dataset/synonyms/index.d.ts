export interface Thesaurus {
    term: string;
    generic: string;
    specific: string[];
    related: string;
    notes: string;
    equivalent: string;
}
export declare const cdtnSynonyms: string[];
export declare const thesaurus: Thesaurus[];
export declare const synonyms: string[];
