import { useEffect, useState } from "react";
import {
  searchEnterprises,
  Enterprise,
} from "../../conventions/Search/api/enterprises.service";
import { ApiGeoResult, searchCities } from "../Location/searchCities";
import { ApiGeoResultWithSelectedPostCode } from "../Location/Search";

type Props = {
  search?: string;
  location?: ApiGeoResultWithSelectedPostCode;
};

export const useCompanyFetch = ({ search, location }: Props) => {
  const [data, setData] = useState<Enterprise[]>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await searchEnterprises({
        query: search ?? "",
        apiGeoResult: location,
      });
      setData(response);
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
