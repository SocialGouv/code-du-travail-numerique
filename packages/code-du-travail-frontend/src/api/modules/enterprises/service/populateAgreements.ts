import { ApiEnterpriseData } from "../types";
import { IDCC_SPLIT, IDCC_MERGE } from "../../../config";
import { Convention, EnterpriseApiResponse } from "./fetchEnterprises";
import { fetchAgreements } from "./fetchAgreements";

export const populateAgreements = async (
  enterpriseApiResponse: EnterpriseApiResponse
): Promise<ApiEnterpriseData> => {
  const entreprisePromises = enterpriseApiResponse.entreprises?.map(
    async (entreprise) => {
      const idccList = entreprise.conventions.flatMap(({ idcc }) => {
        if (IDCC_SPLIT[idcc]) {
          return IDCC_SPLIT[idcc];
        }
        const mergedIdcc = Object.entries(IDCC_MERGE).find(([_, values]) =>
          values.some((value) => value === idcc)
        );
        if (mergedIdcc?.[0]) {
          return [parseInt(mergedIdcc[0])];
        }
        return [idcc];
      });
      const body = await fetchAgreements(idccList);

      const conventionsWithDuplicates = idccList.map((num: number) => {
        const foundHandledIdcc = body.hits.hits.find(
          ({ _source }) => _source?.num === num
        );
        if (foundHandledIdcc && foundHandledIdcc._source) {
          const agreement = foundHandledIdcc._source;
          return {
            id: agreement.id,
            contributions: agreement.contributions,
            num: agreement.num,
            shortTitle: agreement.shortTitle,
            title: agreement.title,
            url: agreement.url,
            slug: agreement.slug,
          };
        }
        const convention = entreprise.conventions.find(
          (convention: Convention) => convention.idcc === num
        );
        return {
          id: convention?.id ?? convention?.idcc.toString() ?? num.toString(),
          num,
          shortTitle:
            convention?.shortTitle ?? "Convention collective non reconnue",
          title: convention?.title ?? "",
          contributions: false,
          ...(convention?.url ? { url: convention?.url } : {}),
        };
      });
      const conventions = conventionsWithDuplicates.filter(
        ({ num }, index) =>
          conventionsWithDuplicates.findIndex((item) => item.num === num) ===
          index
      );
      return { ...entreprise, conventions };
    }
  );
  const entreprises = entreprisePromises
    ? await Promise.all(entreprisePromises)
    : [];
  return {
    ...enterpriseApiResponse,
    entreprises,
  };
};
