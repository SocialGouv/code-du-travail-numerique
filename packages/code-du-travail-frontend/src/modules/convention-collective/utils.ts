import { supportedCcn, SupportedTypes } from "@socialgouv/modeles-social";

export const isCcSupportedByAnySimulator = (idcc: number): boolean => {
  const cc = supportedCcn.find((item) => item.idcc === idcc);
  if (!cc) return false;
  return Object.entries(cc).some(
    ([key, value]) => key !== "idcc" && value === SupportedTypes.FULLY_SUPPORTED
  );
};

export function getIdConvention(url: string): string | null {
  if (!url) return null;

  try {
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    return params.get("idConvention");
  } catch (error) {
    return null;
  }
}
