function required(value) {
  return value ? undefined : "Ce champs est requis";
}
function requiredBoolean(value) {
  return value === false || value === true ? undefined : "Ce champ est requis";
}

function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
    ? undefined
    : "Un nombre est attendu";
}

export { required, requiredBoolean, isNumber };
