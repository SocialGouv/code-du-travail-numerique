import fs from "fs";

export function cleanValue(value: string) {
  const [, newValue] = value.split("|");
  return (newValue ?? value)
    .replace("(", "")
    .replace(")", "")
    .replace("-", "")
    .trim();
}

export function getCCName(folderPath: string): string {
  const fileContent = fs.readFileSync(`${folderPath}/common.yaml`, {
    encoding: "utf8",
  });
  const matched = fileContent.match(
    /(?<=contrat salarié . convention collective . )([a-zA-Z]|[à-ü]|[À-Ü]| |')*(?=:)/
  ) as { [n: number]: string };
  return matched[0] as string;
}

export function cleanRefLabel(refLabel: string) {
  return refLabel.replace(":", "").trim();
}
