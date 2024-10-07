import { ApiEnterpriseData } from "../types";
import { IDCC_SPLIT, IDCC_MERGE } from "../../../config";
import { Convention, EnterpriseApiResponse } from "./fetchEnterprises";
import { fetchAgreements } from "./fetchAgreements";

function conventionsToIdcc(conventions) {
  return conventions.flatMap(({ idcc }) => {
    if (IDCC_SPLIT[idcc]) {
      return IDCC_SPLIT[idcc];
    }
    const mergedIdcc = Object.entries(IDCC_MERGE).find(([_, values]) =>
      values.some((value) => value === idcc),
    );
    if (mergedIdcc?.[0]) {
      return [parseInt(mergedIdcc[0])];
    }
    return [idcc];
  });
}

export const populateAgreements = async (
  enterpriseApiResponse: EnterpriseApiResponse,
): Promise<ApiEnterpriseData> => {
  const idccs = enterpriseApiResponse.entreprises?.reduce<number[]>(
    (arr, entreprise) => {
      const idccList = conventionsToIdcc(entreprise.conventions);
      const result = arr.concat(idccList);
      return result.filter((item, pos) => result.indexOf(item) === pos);
    },
    [],
  );
  if (!idccs) {
    return { ...enterpriseApiResponse.entreprises, entreprises: [] };
  }
  const body = await fetchAgreements(idccs);
  const entreprisePromises = (enterpriseApiResponse.entreprises ?? [])?.map(
    async (entreprise) => {
      const idccList = conventionsToIdcc(entreprise.conventions);

      const conventionsWithDuplicates = idccList.map((num: number) => {
        const foundHandledIdcc = body.hits.hits.find(
          ({ _source }) => _source?.num === num,
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
          (convention: Convention) => convention.idcc === num,
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
          index,
      );
      return { ...entreprise, conventions };
    },
  );
  const entreprises = entreprisePromises
    ? await Promise.all(entreprisePromises)
    : [];
  return {
    ...enterpriseApiResponse,
    entreprises,
  };
};
