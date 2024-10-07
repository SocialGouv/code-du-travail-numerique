export const getSeniorityMessageQuestion = (
  agreementNumber?: number,
): string => {
  if (agreementNumber === 2264) {
    return "Le salarié a-t-il plus de 5 ans d'ancienneté dans l'entreprise (5 ans + 1 jour) ?";
  }
  return "Le salarié a-t-il plus de 2 ans d'ancienneté dans l'entreprise (2 ans + 1 jour) ?";
};

export const getSenioritySituationMessage = (
  agreementNumber?: number,
): string => {
  if (agreementNumber === 2264) {
    return "Plus de 5 ans";
  }
  return "Plus de 2 ans";
};
