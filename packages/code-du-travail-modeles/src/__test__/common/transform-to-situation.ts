export interface ISituationItem {
  name: string;
  value: number | string;
  rawNode: {
    nom: string;
    valeur?: number | string;
    titre?: string;
    unité?: string;
  };
}

export function generateSituation(
  situation: ISituationItem[]
): Record<string, string | undefined> {
  const output: Record<string, string | undefined> = {};
  situation.forEach((item) => {
    output[item.name] = item.value.toString();
  });
  return output;
}
