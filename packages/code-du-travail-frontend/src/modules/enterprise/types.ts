import { Enterprise as ApiEnterprise } from "src/api/modules/enterprises/types";

export type Enterprise = ApiEnterprise & {
  complements: {
    liste_idcc: string[];
  };
};
