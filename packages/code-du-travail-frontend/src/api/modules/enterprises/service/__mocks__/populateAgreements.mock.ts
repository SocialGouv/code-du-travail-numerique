import { EnterpriseApiResponse } from "../fetchEnterprises";

export const populateAgreementsEnterpriseResponse: EnterpriseApiResponse = {
  entreprises: [
    {
      activitePrincipale: "Administration publique générale",
      address: "HOTEL DU DEPARTEMENT QUAI JEAN MOULIN 76100 ROUEN",
      conventions: [
        {
          id: "5021",
          idcc: 5021,
          shortTitle: "Convention collective 5021",
          title: "Convention collective 5021",
        },
        {
          id: "3228",
          idcc: 3228,
          shortTitle: "Convention collective 3228",
          title: "Convention collective 3228",
        },
        {
          id: "3239",
          idcc: 3239,
          shortTitle: "Convention collective 3239",
          title: "Convention collective 3239",
        },
      ],
      etablissements: 169,
      firstMatchingEtablissement: {
        address: "HOTEL DU DEPARTEMENT QUAI JEAN MOULIN 76100 ROUEN",
        siret: "22760540900019",
      },
      highlightLabel: "DEPARTEMENT DE LA SEINE MARITIME",
      label: "DEPARTEMENT DE LA SEINE MARITIME",
      matching: 169,
      simpleLabel: "DEPARTEMENT DE LA SEINE MARITIME",
      siren: "227605409",
    },
  ],
};

export const populateAgreementsResponse = {
  hits: {
    hits: [
      {
        _source: {
          id: "1",
          contributions: true,
          num: 5021,
          shortTitle: "Agreement 1",
          title: "Agreement 1 Title",
          url: "https://example.com/agreement1",
          slug: "agreement-1",
        },
      },
      {
        _source: {
          id: "2",
          contributions: false,
          num: 3228,
          shortTitle: "Agreement 2",
          title: "Agreement 2 Title",
          url: "https://example.com/agreement2",
          slug: "agreement-2",
        },
      },
      {
        _source: {
          id: "3",
          contributions: true,
          num: 3239,
          shortTitle: "Agreement 3",
          title: "Agreement 3 Title",
          url: "https://example.com/agreement3",
          slug: "agreement-3",
        },
      },
    ],
  },
};

export const populateAgreementsResponseWithNothing = {
  hits: {
    hits: [],
  },
};
