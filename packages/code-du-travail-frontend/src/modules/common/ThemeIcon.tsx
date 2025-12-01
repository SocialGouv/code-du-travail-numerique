import { ThemeIcons } from "@socialgouv/cdtn-utils";

export function ThemeIcon({ name }: { name: string }) {
  const IconComponent = ThemeIcons[name];

  if (!IconComponent) return undefined;

  return <IconComponent />;
}
