const addPrefixCaseSensitiveAgreementTitle = (text: string, TextToAdd) => {
  if (!text.startsWith("Convention")) {
    return `${TextToAdd} ${text}`;
  }
  return text;
};
export const addPrefixAgreementTitle = (text: string) => {
  return addPrefixCaseSensitiveAgreementTitle(text, "Convention collective");
};
export const addPrefixLowerCaseAgreementTitle = (text: string) => {
  return addPrefixCaseSensitiveAgreementTitle(text, "convention collective");
};
