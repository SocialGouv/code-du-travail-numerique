import React from "react";

// humanize questions
export const questions = {
  catégorie: "Quelle est la catégorie professionnelle du salarié ?",
  ancienneté: "Quelle est l'ancienneté du salarié ?",
  groupe: "Quel est le groupe du salarié ?",
  coefficient: "Quel est le coefficient hiérarchique  du salarié ?",
  echelon: "Quel est l'échelon du salarié ?"
};

export const labels = {
  catégorie: "catégorie professionnelle",
  ancienneté: "ancienneté",
  groupe: "groupe",
  coefficient: "coefficient hiérarchique",
  echelon: "échelon"
};

export function getRecapLabel([key, value]) {
  const displayedValue = `${value}`.replace(/[0-9]+\|/, "").trim();
  switch (key) {
    case "catégorie":
      return (
        <>
          appartenant à la catégorie <strong>{displayedValue}</strong>
        </>
      );
    case "ancienneté":
      return (
        <>
          ayant <strong>{displayedValue}</strong> d’ancienneté
        </>
      );
    case "groupe":
      return (
        <>
          dans le groupe <strong>{displayedValue}</strong>
        </>
      );
    case "coefficient":
      return (
        <>
          avec un coefficient <strong>{displayedValue}</strong>
        </>
      );
    case "echelon":
      return (
        <>
          avec un échelon de <strong>{displayedValue}</strong>
        </>
      );
    default: {
      return displayedValue;
    }
  }
}

export function recapSituation(criteria) {
  return Object.entries(criteria).reduce(
    (state, item) =>
      state ? (
        <>
          {state}, {getRecapLabel(item)}
        </>
      ) : (
        getRecapLabel(item)
      ),
    null
  );
}
