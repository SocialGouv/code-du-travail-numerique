let isProduction: boolean;

export const setIsProduction = (): void => {
  isProduction = true;
};
export const getIsProduction = (): boolean => isProduction;
