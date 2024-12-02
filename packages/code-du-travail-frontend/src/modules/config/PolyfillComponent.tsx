"use client";

if (!("canParse" in URL)) {
  (URL as any).canParse = function canParse(url, base) {
    try {
      if (base !== undefined) {
        new URL(url, base);
      } else {
        new URL(url);
      }
      return true;
    } catch {
      return false;
    }
  };
}

if (!("replaceAll" in String.prototype)) {
  (String.prototype as any).replaceAll = function (
    searchValue: string,
    replaceValue: string
  ) {
    return this.split(searchValue).join(replaceValue);
  };
}

export const PolyfillComponent = () => {
  return null;
};
