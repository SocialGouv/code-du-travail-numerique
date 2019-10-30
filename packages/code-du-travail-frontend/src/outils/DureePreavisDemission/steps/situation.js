import React from "react";

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
