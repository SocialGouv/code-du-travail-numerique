import { parse } from "./utils/";

export function required(value) {
  return value ? undefined : "Vous devez répondre à cette question";
}

export function requiredBoolean(value) {
  return value === false || value === true
    ? undefined
    : "Vous devez répondre à cette question";
}

export function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
    ? undefined
    : "Un nombre est attendu";
}

export function isPositiveNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value) && value >= 0
    ? undefined
    : "Un nombre positif est attendu";
}

export function isDate(value) {
  return isNaN(parse(value).getTime()) ? "La date est invalide" : undefined;
}
