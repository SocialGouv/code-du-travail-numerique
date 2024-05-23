import { sumSalaryPeriods } from "../sumSalaryPeriods";

describe("sumSalaryPeriods", () => {
  test("should return the sum of salary periods", () => {
    const salaryPeriods: any = [
      { value: 1000 },
      { value: 2000 },
      { value: 3000 },
    ];
    const result = sumSalaryPeriods(salaryPeriods);
    expect(result).toBe(6000);
  });

  test("should handle undefined values", () => {
    const salaryPeriods: any = [
      { value: 1000 },
      { value: undefined },
      { value: 3000 },
    ];
    const result: any = sumSalaryPeriods(salaryPeriods);
    expect(result).toBe(4000);
  });

  test("should return 0 for empty salary periods", () => {
    const salaryPeriods: any[] = [];
    const result = sumSalaryPeriods(salaryPeriods);
    expect(result).toBe(0);
  });
});
