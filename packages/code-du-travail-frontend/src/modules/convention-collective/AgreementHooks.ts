import { useEffect, useState } from "react";
import { searchAgreement } from "../../conventions/Search/api/agreement.service";
import { Agreement } from "../../outils/types";

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
