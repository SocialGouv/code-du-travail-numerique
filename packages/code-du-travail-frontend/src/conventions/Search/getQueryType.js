// detect query type (IA level++)
const getQueryType = str => {
  if (str.match(/^[\d .-]+$/) && str.length >= 2) {
    if (str.length <= 4) {
      return "idcc";
    } else if (str.length === 9) {
      return "siren";
    } else if (str.length >= 10 && str.length <= 15) {
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
