import { OuiNon } from "../../../CommonIndemniteDepart/common";
import { Agreement } from "../../../types";

export const getSeniorityInMonths = (
  moreThanXYears?: OuiNon,
  seniorityInMonths?: string,
  agreement?: Agreement,
): string => {
  if (agreement && agreement.num === 2264 && moreThanXYears) {
    return "61";
  } else if (seniorityInMonths) {
    return seniorityInMonths;
  } else {
    return "25";
  }
};
