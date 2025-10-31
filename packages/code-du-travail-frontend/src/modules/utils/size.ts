export function formatFileSize(bytesValue: string): string {
  const bytes = Number(bytesValue);

  if (!Number.isFinite(bytes) || bytes < 0) {
    return "0";
  }

  const KO = 1000;
  const MO = KO * 1000;

  // Formatage français (virgule décimale)
  const nf = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 });

  if (bytes < MO) {
    const ko = bytes / KO;
    return `${nf.format(ko)} Ko`;
  } else {
    const mo = bytes / MO;
    return `${nf.format(mo)} Mo`;
  }
}
