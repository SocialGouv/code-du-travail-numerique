import { v4 as generateUUID } from "uuid";
import { sendEvent } from "../utils";

const category = "cc_search";
const action = "Trouver sa convention collective";

export const useAgreementSearchTracking = () => {
  const emitAgreementSearchInputEvent = (query: string) => {
    sendEvent({
      category,
      action,
      name: JSON.stringify({ query }),
      value: generateUUID(),
    });
  };

  return {
    emitAgreementSearchInputEvent,
  };
};
