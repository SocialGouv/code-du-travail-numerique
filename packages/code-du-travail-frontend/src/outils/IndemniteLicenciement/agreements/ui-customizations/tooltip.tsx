import { Tooltip } from "../../../common/Question";
import { TooltipSalary } from "../../steps/Salaires/components";

export const getTooltipSalairesMensuel = (
  agreementNumber?: number
): Tooltip | undefined => {
  if (agreementNumber === 3239) return undefined;

  return { content: <TooltipSalary /> };
};
