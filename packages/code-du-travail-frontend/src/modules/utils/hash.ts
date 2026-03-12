export const cleanHash = (hash: string): string => {
  if (!hash) return "";

  let cleaned = hash.startsWith("#") ? hash.slice(1) : hash;

  try {
    cleaned = decodeURIComponent(cleaned);
  } catch {
    console.warn("Failed to decode hash:", hash);
  }

  cleaned = cleaned
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return cleaned;
};
