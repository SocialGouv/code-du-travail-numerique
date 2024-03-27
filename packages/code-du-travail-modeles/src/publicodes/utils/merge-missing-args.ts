import type { MissingArgs } from "../types";

export const mergeMissingArgs = (
  missingArgs: MissingArgs[][]
): MissingArgs[] => {
  return missingArgs.reduce<MissingArgs[]>((previous, current) => {
    const next = previous;
    for (const arg of current) {
      const indexPreviousArg = previous.findIndex(
        (item) => item.name === arg.name
      );
      const previousArg =
        indexPreviousArg >= 0 ? previous[indexPreviousArg] : undefined;
      if (!previousArg) {
        next.push(arg);
      } else if (previousArg.indice > arg.indice) {
        next[indexPreviousArg] = arg;
      }
    }
    return next;
  }, []);
};
