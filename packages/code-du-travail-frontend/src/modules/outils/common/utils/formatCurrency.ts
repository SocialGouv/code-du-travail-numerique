export const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency: "EUR",
    minimumFractionDigits: 2,
  }).format(amount);
};

export const formatToEuro = new Intl.NumberFormat("fr-FR", {
  style: "currency",
  currency: "EUR",
}).format;
