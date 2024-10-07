import { populateAgreements } from "../populateAgreements";
import { fetchAgreements } from "../fetchAgreements";
import {
  populateAgreementsEnterpriseResponse,
  populateAgreementsResponse,
  populateAgreementsResponseWithNothing,
} from "../__mocks__/populateAgreements.mock";

jest.mock("../fetchAgreements");

describe("populateAgreements", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should populate agreements for each enterprise", async () => {
    (fetchAgreements as jest.Mock).mockResolvedValue(
      populateAgreementsResponse
    );

    const result = await populateAgreements(
      populateAgreementsEnterpriseResponse
    );

    expect(result).toEqual({
      entreprises: [
        {
          activitePrincipale: "Administration publique générale",
          address: "HOTEL DU DEPARTEMENT QUAI JEAN MOULIN 76100 ROUEN",
          conventions: [
            {
              contributions: true,
              id: "1",
              num: 5021,
              shortTitle: "Agreement 1",
              slug: "agreement-1",
              title: "Agreement 1 Title",
              url: "https://example.com/agreement1",
            },
            {
              contributions: false,
              id: "2",
              num: 3228,
              shortTitle: "Agreement 2",
              slug: "agreement-2",
              title: "Agreement 2 Title",
              url: "https://example.com/agreement2",
            },
            {
              contributions: true,
              id: "3",
              num: 3239,
              shortTitle: "Agreement 3",
              slug: "agreement-3",
              title: "Agreement 3 Title",
              url: "https://example.com/agreement3",
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
    });
    expect(fetchAgreements).toHaveBeenCalledWith([5021, 3228, 3239]);
  });

  it("should return the default name if no hits have been founds", async () => {
    (fetchAgreements as jest.Mock).mockResolvedValue(
      populateAgreementsResponseWithNothing
    );

    const result = await populateAgreements(
      populateAgreementsEnterpriseResponse
    );

    expect(result).toEqual({
      entreprises: [
        {
          activitePrincipale: "Administration publique générale",
          address: "HOTEL DU DEPARTEMENT QUAI JEAN MOULIN 76100 ROUEN",
          conventions: [
            {
              contributions: false,
              id: "5021",
              num: 5021,
              shortTitle: "Convention collective 5021",
              title: "Convention collective 5021",
            },
            {
              contributions: false,
              id: "3228",
              num: 3228,
              shortTitle: "Convention collective 3228",
              title: "Convention collective 3228",
            },
            {
              contributions: false,
              id: "3239",
              num: 3239,
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
    });
  });
});
