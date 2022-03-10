export const sum = (arr) => arr.reduce((sum, c) => sum + parseFloat(c), 0);
export const round = (fl: number) => parseInt((fl * 100).toString(), 10) / 100;
export const isNotNearZero = (toTest: string | number) =>
  parseInt(toTest.toString(), 10) > 0;
