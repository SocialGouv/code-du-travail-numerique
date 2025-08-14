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
        address:
          "ZAE SAINT GUENAULT 1 RUE JEAN MERMOZ 91000 EVRY-COURCOURONNES",
        firstMatchingEtablissement: {
          siret: "45132133500023",
          address:
            "ZAE SAINT GUENAULT 1 RUE JEAN MERMOZ 91000 EVRY-COURCOURONNES",
        },
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
        address: "123 AVENUE DU BRICOLAGE 75000 PARIS",
        firstMatchingEtablissement: {
          siret: "12345678900123",
          address: "123 AVENUE DU BRICOLAGE 75000 PARIS",
        },
        complements: {
          liste_idcc: [],
        },
        conventions: [],
      },
    ]);
  }

  return Promise.resolve([]);
};
