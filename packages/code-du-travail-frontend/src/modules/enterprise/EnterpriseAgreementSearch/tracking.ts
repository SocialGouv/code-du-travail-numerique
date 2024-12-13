import { v4 as generateUUID } from "uuid";
import { sendEvent } from "../../utils";
import { ApiGeoResult } from "src/modules/Location/searchCities";

const category = "enterprise_search";
const action = "Trouver sa convention collective";

export const useEnterpriseAgreementSearchTracking = () => {
  const emitEnterpriseAgreementSearchInputEvent = (
    query: string,
    apiGeoResult?: ApiGeoResult
  ) => {
    sendEvent({
      category,
      action,
      name: JSON.stringify({ query, apiGeoResult }),
      value: generateUUID(),
    });
  };

  return {
    emitEnterpriseAgreementSearchInputEvent,
  };
};
