export const formatUnit = (unit: any): string => {
  if (typeof unit === "string") {
    return unit;
  }
  if (typeof unit === "object" && unit !== null) {
    // Handle unit objects like {numerators: ["jour"], denominators: []}
    if (unit.numerators && Array.isArray(unit.numerators)) {
      return unit.numerators.join(" ");
    }
  }
  return "";
};
