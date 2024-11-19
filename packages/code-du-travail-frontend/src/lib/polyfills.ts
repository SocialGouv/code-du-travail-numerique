if (!("replaceAll" in String.prototype)) {
  (String.prototype as any).replaceAll = function (
    searchValue: string,
    replaceValue: string
  ) {
    return this.split(searchValue).join(replaceValue);
  };
}
