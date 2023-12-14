export const addPrefixAgreementTitle = (text: string) => {
  if (!text.startsWith("Convention")) {
    return `Convention collective ${text}`;
  }
  return text;
};
