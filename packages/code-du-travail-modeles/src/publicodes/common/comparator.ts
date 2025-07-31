export interface DurationInfo {
  value: number;
  unit: "jours" | "semaines" | "mois";
  originalText: string;
  totalDays: number;
}

/**
 * Parse une chaîne de durée en français et extrait les informations
 * Formats supportés :
 * - "8 jours", "8 jours calendaires"
 * - "3 semaines", "2 semaines et demi"
 * - "4 mois", "1 mois et demi", "4 mois de date à date", "1 mois ouvré"
 */
export function parseDuration(durationText: string): DurationInfo | null {
  const text = durationText.toLowerCase().trim();

  // Vérifier si "et demi" est présent
  const hasHalf = text.includes("et demi");

  // Regex pour différents patterns
  const patterns = [
    // Jours avec ou sans "calendaires"
    /(\d+)\s*jours?\s*(calendaires?)?/,
    // Semaines avec possibilité "et demi" - gérer "un", "une" ou chiffres
    /(un|une|\d+)\s*semaines?(?:\s+et\s+demi)?/,
    // Mois - gérer "un", "une" ou chiffres, suivi de n'importe quoi contenant "mois"
    /(un|une|\d+)\s*(?=.*mois)/,
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) {
      // Convertir "un" ou "une" en 1
      let value: number;
      if (match[1] === "un" || match[1] === "une") {
        value = 1;
      } else {
        value = parseInt(match[1], 10);
      }
      let unit: "jours" | "semaines" | "mois";
      let totalDays: number;

      if (text.includes("jour")) {
        unit = "jours";
        totalDays = value;
        // "et demi" n'est pas logique pour les jours, on l'ignore
      } else if (text.includes("semaine")) {
        unit = "semaines";
        totalDays = value * 7;
        // Ajouter 15 jours si "et demi"
        if (hasHalf) {
          totalDays += 15;
        }
      } else if (text.includes("mois")) {
        unit = "mois";
        totalDays = value * 30; // Approximation : 1 mois = 30 jours
        // Ajouter 15 jours si "et demi"
        if (hasHalf) {
          totalDays += 15;
        }
      } else {
        continue;
      }

      return {
        value,
        unit,
        originalText: durationText,
        totalDays,
      };
    }
  }

  return null;
}

/**
 * Compare plusieurs durées et retourne la plus importante (la plus longue)
 * @param durations - Tableau de chaînes de durée en français
 * @returns La durée la plus longue ou null si aucune durée valide n'est trouvée
 */
export function findLongestDuration(durations: string[]): DurationInfo | null {
  const parsedDurations = durations
    .map(parseDuration)
    .filter((duration): duration is DurationInfo => duration !== null);

  if (parsedDurations.length === 0) {
    return null;
  }

  return parsedDurations.reduce((longest, current) =>
    current.totalDays > longest.totalDays ? current : longest
  );
}

/**
 * Compare deux durées et retourne la plus importante
 * @param duration1 - Première durée
 * @param duration2 - Deuxième durée
 * @returns La durée la plus longue ou null si aucune n'est valide
 */
export function compareDurations(
  duration1: string,
  duration2: string
): DurationInfo | null {
  return findLongestDuration([duration1, duration2]);
}

/**
 * Détecte si une valeur est une période de temps (durée)
 * @param value - La valeur à tester
 * @returns true si c'est une période, false sinon
 */
export function isPeriod(value: any): value is string {
  if (typeof value !== "string") {
    return false;
  }

  const text = value.toLowerCase().trim();

  // Chercher des mots-clés indiquant une période
  const periodKeywords = ["jour", "semaine", "mois"];

  return periodKeywords.some((keyword) => text.includes(keyword));
}

/**
 * Compare deux valeurs qui peuvent être des périodes ou des nombres
 * Retourne la valeur la plus avantageuse (plus grande)
 * @param value1 - Première valeur
 * @param value2 - Deuxième valeur
 * @returns La valeur la plus avantageuse et son type
 */
export function compareValues(
  value1: any,
  value2: any
): {
  chosenValue: any;
  chosenType: "FIRST" | "SECOND" | "SAME";
  isPeriodComparison: boolean;
} {
  const isPeriod1 = isPeriod(value1);
  const isPeriod2 = isPeriod(value2);

  // Si les deux sont des périodes, utiliser la comparaison de durées
  if (isPeriod1 && isPeriod2) {
    const longestDuration = findLongestDuration([value1, value2]);

    if (!longestDuration) {
      return {
        chosenValue: value1,
        chosenType: "FIRST",
        isPeriodComparison: true,
      };
    }

    if (longestDuration.originalText === value1) {
      return {
        chosenValue: value1,
        chosenType:
          longestDuration.totalDays === parseDuration(value2)?.totalDays
            ? "SAME"
            : "FIRST",
        isPeriodComparison: true,
      };
    } else {
      return {
        chosenValue: value2,
        chosenType:
          longestDuration.totalDays === parseDuration(value1)?.totalDays
            ? "SAME"
            : "SECOND",
        isPeriodComparison: true,
      };
    }
  }

  // Si seulement une est une période, on ne peut pas comparer facilement
  // Dans ce cas, on retourne la première valeur par défaut
  if (isPeriod1 || isPeriod2) {
    return {
      chosenValue: value1,
      chosenType: "FIRST",
      isPeriodComparison: true,
    };
  }

  // Si ce sont des nombres, utiliser la comparaison numérique classique
  const num1 = typeof value1 === "number" ? value1 : parseFloat(value1) || 0;
  const num2 = typeof value2 === "number" ? value2 : parseFloat(value2) || 0;

  if (num1 === num2) {
    return {
      chosenValue: value1,
      chosenType: "SAME",
      isPeriodComparison: false,
    };
  }

  if (num1 > num2) {
    return {
      chosenValue: value1,
      chosenType: "FIRST",
      isPeriodComparison: false,
    };
  }

  return {
    chosenValue: value2,
    chosenType: "SECOND",
    isPeriodComparison: false,
  };
}
