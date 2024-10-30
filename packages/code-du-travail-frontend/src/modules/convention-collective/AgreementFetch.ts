import { useEffect, useState } from "react";
import { searchAgreement } from "../../conventions/Search/api/agreement.service";
import { Agreement } from "../../outils/types";
import { ApiGeoResult, searchCities } from "../Location/searchCities";

export const useAgreementFetch = (search?: string) => {
  const [data, setData] =
    useState<Pick<Agreement, "shortTitle" | "slug" | "num">[]>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await searchAgreement(search ?? "");
      setData(
        response.map((d) => ({
          shortTitle: d.shortTitle,
          slug: d.slug ?? "",
          num: d.num,
        }))
      );
    };
    fetchData();
  }, [search]);
  return data;
};

export const useCityFetch = (search?: string) => {
  const [data, setData] = useState<ApiGeoResult[]>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await searchCities(search ?? "");
      setData(response);
    };
    fetchData();
  }, [search]);
  return data;
};
