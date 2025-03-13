export const calculateNumberOfElements = (...args): number =>
  args.filter((item) => item !== null && item !== undefined).length;
