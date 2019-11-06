import React from "react";

// // humanize questions
// export const questions = {
//   catégorie: "Quelle est la catégorie professionnelle du salarié ?",
//   ancienneté: "Quelle est l’ancienneté du salarié ?",
//   groupe: "Quel est le groupe du salarié ?",
//   coefficient: "Quel est le coefficient hiérarchique  du salarié ?",
//   echelon: "Quel est léchelon du salarié ?"
// };

// export const labels = {
//   catégorie: "catégorie professionnelle",
//   ancienneté: "ancienneté selon la convention collective",
//   anciennetéCdt: "ancienneté selon le code du travail",
//   groupe: "groupe",
//   coefficient: "coefficient hiérarchique",
//   echelon: "échelon"
// };

// export function getRecapLabel([key, value], idc) {
//   if (key === "ancienneté" && idc === "0000") key = "anciennetéCdt";
//   const displayedKey =
//     labels[key].charAt(0).toUpperCase() + labels[key].slice(1);

//   const displayedValue = `${value}`.replace(/[0-9]+\|/, "").trim();
//   return (
//     <>
//       {displayedKey}: <strong>{displayedValue}</strong>
//     </>
//   );
// }

// export function recapSituation({ criteria, idcc }) {
//   return Object.entries(criteria).map(recap => getRecapLabel(recap, idcc));
// }

export function recapSituation(criteria) {
  const cleanValue = value => `${value}`.replace(/[0-9]+\|/, "").trim();
  return (
    <ul>
      {Object.entries(criteria).map(([criteria, value]) => (
        <li key={criteria}>
          {criteria}: {cleanValue(value)}
        </li>
      ))}
    </ul>
  );
}
