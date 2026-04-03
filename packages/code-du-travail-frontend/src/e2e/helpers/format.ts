export const formatToEuro = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
}).format;
