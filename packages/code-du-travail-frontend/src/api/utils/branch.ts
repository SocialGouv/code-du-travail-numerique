export function removeLinked(str: string): string {
  return str.replace(/^(linked[\/-]+)/, "");
}
