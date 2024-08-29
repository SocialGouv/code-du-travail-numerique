export function cleanValue(value: string) {
  const [, newValue] = value.split("|");
  return (newValue ?? value)
    .replace("(", "")
    .replace(")", "")
    .replace("-", "")
    .trim();
}
