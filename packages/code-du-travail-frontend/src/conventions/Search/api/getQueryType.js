// detect query type (IA level+++)
const getQueryType = (str) => {
  if (str.match(/^[\d .-]+$/) && str.length >= 2) {
    const strClean = str.replace(/[\s .-]/g, "");
    if (strClean.length <= 4) {
      return "idcc";
    } else if (strClean.length === 9) {
      return "siren";
    } else if (strClean.length === 14) {
      return "siret";
    }
    return;
  }
  if (str.length > 2) {
    // search nom CC + APi entreprise
    return "text";
  }
};

export default getQueryType;
