export const calculateNumberOfElements = (...args): number => {
  let countArguments = 0;
  for (let i = 0; i < args.length; i++) {
    if (args[i] !== null && args[i] !== undefined) {
      countArguments++;
    }
  }
  return countArguments;
};
