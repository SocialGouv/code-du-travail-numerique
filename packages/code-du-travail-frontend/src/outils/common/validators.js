import { parse } from "./date";

export function required(value) {
  return value ? undefined : "Ce champs est requis";
}

export function requiredBoolean(value) {
  return value === false || value === true ? undefined : "Ce champ est requis";
}

export function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value)
    ? undefined
    : "Un nombre est attendu";
}

export function isDate(value) {
  return isNaN(parse(value).getTime()) ? "La date est invalide" : undefined;
}
