export const sum = (arr) => arr.reduce((sum, c) => sum + parseFloat(c), 0);
export const round = (fl) => parseInt(fl * 100, 10) / 100;
export const isNotNearZero = (toTest) => parseInt(toTest, 10) > 0;
