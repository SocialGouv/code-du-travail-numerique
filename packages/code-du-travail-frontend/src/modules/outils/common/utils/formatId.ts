export const formatRuleName = (ruleName: string): string => {
  return ruleName
    .replace(/\./g, " ")
    .replace(/\s+/g, "-")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};
