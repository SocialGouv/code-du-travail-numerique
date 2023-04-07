export enum QueryType {
  IDCC = "idcc",
  TEXT = "text",
}

// detect query type (IA level+++)
const getQueryType = (str: string): QueryType | undefined => {
  // search for "digit" queries : search by number
  if (str.match(/^[\d .-]+$/) && str.length >= 2) {
    const strClean = str.replace(/[\s .-]/g, "");
    if (strClean.length <= 4) {
      return QueryType.IDCC;
    }
  }
  if (str.length >= 2) {
    // search nom CC + APi entreprise
    return QueryType.TEXT;
  }
};

export default getQueryType;
