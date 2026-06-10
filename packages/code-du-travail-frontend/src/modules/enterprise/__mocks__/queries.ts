import { SearchParams } from "../queries";
import { Enterprise } from "../types";

export const messageFetchSearchCcOrEnterprise =
  "Ce service est momentanément indisponible. Si vous utilisez un simulateur, vous pouvez tout de même poursuivre la simulation pour obtenir le résultat prévu par le Code du travail en sélectionnant l'option \"Je ne souhaite pas renseigner ma convention collective (je passe l'étape).\"";

export const searchEnterprises = (
  searchParams: SearchParams
): Promise<Enterprise[]> => {
  const query = searchParams.query.toLowerCase();

  if (query.includes("carrefour")) {
    return Promise.resolve([
      {
        activitePrincipale: "47.11F - Hypermarchés",
        etablissements: 208,
        highlightLabel: "CARREFOUR HYPERMARCHES",
        label: "CARREFOUR HYPERMARCHES",
        simpleLabel: "CARREFOUR HYPERMARCHES",
        matching: 208,
        siren: "451321335",
        siret: "45132133500023",
        address:
          "ZAE SAINT GUENAULT 1 RUE JEAN MERMOZ 91000 EVRY-COURCOURONNES",
        firstMatchingEtablissement: {
          siret: "45132133500023",
          address:
            "ZAE SAINT GUENAULT 1 RUE JEAN MERMOZ 91000 EVRY-COURCOURONNES",
        },
        matchingEtablissementCount: 5,
        complements: {
          liste_idcc: ["2216", "1486"],
        },
        conventions: [
          {
            id: "2216",
            contributions: true,
            num: 2216,
            shortTitle:
              "Commerce de détail et de gros à prédominance alimentaire",
            title:
              "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.  Etendue par arrêté du 26 juillet 2002 JORF 6 août 2002.",
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
            slug: "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
          },
          {
            id: "1486",
            contributions: true,
            num: 1486,
            shortTitle:
              "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils",
            title:
              "Bureaux d'études techniques, cabinets d'ingénieurs-conseils et sociétés de conseils",
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635173",
            slug: "1486-bureaux-detudes-techniques-cabinets-dingenieurs-conseils-et-societes-de",
          },
        ],
      },
      {
        activitePrincipale:
          "Location-bail de propriété intellectuelle et de produits similaires, à l’exception des œuvres soumises à copyright",
        etablissements: 1294,
        highlightLabel: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
        label: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
        simpleLabel: "CARREFOUR PROXIMITE FRANCE (SHOPI-8 A HUIT)",
        matching: 1294,
        siren: "345130488",
        siret: "34513048800013",
        address: "ZI ROUTE DE PARIS 14120 MONDEVILLE",
        firstMatchingEtablissement: {
          siret: "34513048800017",
          address: "ZI ROUTE DE PARIS 14120 MONDEVILLE",
        },
        matchingEtablissementCount: 5,
        complements: {
          liste_idcc: ["2216"],
        },
        conventions: [
          {
            id: "2216",
            contributions: true,
            num: 2216,
            shortTitle:
              "Commerce de détail et de gros à prédominance alimentaire",
            title:
              "Convention collective nationale du commerce de détail et de gros à prédominance alimentaire du 12 juillet 2001.  Etendue par arrêté du 26 juillet 2002 JORF 6 août 2002.",
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635085",
            slug: "2216-commerce-de-detail-et-de-gros-a-predominance-alimentaire",
          },
        ],
      },
    ]);
  }

  if (query.includes("bnp")) {
    return Promise.resolve([
      {
        activitePrincipale: "Autres intermédiations monétaires",
        etablissements: 2032,
        highlightLabel: "BNP PARIBAS (HELLO BANK!)",
        label: "BNP PARIBAS (HELLO BANK!)",
        simpleLabel: "BNP PARIBAS (HELLO BANK!)",
        matching: 2032,
        siren: "662042449",
        siret: "66204244908280",
        address: "16 BOULEVARD DES ITALIENS 75009 PARIS",
        firstMatchingEtablissement: {
          siret: "66204244908280",
          address:
            "ANGLE DE RUE 19 RUE DES LAVANDIERES 55 RUE DE RIVOLI 75001 PARIS",
        },
        matchingEtablissementCount: 5,
        complements: {
          liste_idcc: [],
        },
        conventions: [
          {
            id: "2120",
            contributions: true,
            num: 2120,
            shortTitle: "Banque",
            title:
              "Convention collective nationale de la banque du 10 janvier 2000.  Etendue par arrêté du 17 novembre 2004 JORF 11 décembre 2004.",
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000005635780",
            slug: "2120-banque",
          },
          {
            id: "9999",
            num: 9999,
            shortTitle: "___Sans convention collective___",
            title: "___Sans convention collective___",
            contributions: false,
          },
          {
            id: "2931",
            contributions: false,
            num: 2931,
            shortTitle: "Activités de marchés financiers",
            title:
              "Convention collective nationale des activités de marchés financiers du 11 juin 2010",
            url: "https://www.legifrance.gouv.fr/affichIDCC.do?idConvention=KALICONT000025496787",
            slug: "2931-activites-de-marches-financiers",
          },
        ],
      },
    ]);
  }

  if (query.includes("bricomanie")) {
    return Promise.resolve([
      {
        activitePrincipale:
          "47.52Z - Commerce de détail de quincaillerie, peintures et verres en magasins spécialisés",
        etablissements: 85,
        highlightLabel: "BRICOMANIE",
        label: "BRICOMANIE",
        simpleLabel: "BRICOMANIE",
        matching: 85,
        siren: "123456789",
        siret: "12345678900123",
        address: "123 AVENUE DU BRICOLAGE 75000 PARIS",
        firstMatchingEtablissement: {
          siret: "12345678900123",
          address: "123 AVENUE DU BRICOLAGE 75000 PARIS",
        },
        matchingEtablissementCount: 5,
        complements: {
          liste_idcc: [],
        },
        conventions: [],
      },
    ]);
  }

  return Promise.resolve([]);
};
