import React, { useState } from "react";

import { SearchParams } from "../../ConventionCollective/common/NavContext";
import { EnterpriseSearchStep } from "../../ConventionCollective/steps/EnterpriseSearch";

const EnterpriseSearch = (): JSX.Element => {
  const [searchParams, setSearchParams] = useState<SearchParams>({
    address: "",
    query: "",
  });

  return (
    <EnterpriseSearchStep
      handleEnterpriseSelection={(enterprise) => {
        /*user selected the enterprise*/
      }}
      searchParams={searchParams}
      onSearchParamsChange={(params) => {
        setSearchParams(params);
      }}
    />
  );
};

export default EnterpriseSearch;
