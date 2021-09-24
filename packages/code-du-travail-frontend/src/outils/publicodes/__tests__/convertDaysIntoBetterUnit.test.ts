import { PublicodesUnit } from "../index";
import { convertDaysIntoBetterUnit } from "../Utils";

describe("Testing the transformation of the unit from publicodes (in days) into a better unit (weeks or months)", () => {
  it.each`
    input      | expectedUnit            | expectedValue
    ${1}       | ${PublicodesUnit.DAY}   | ${1}
    ${"1"}     | ${PublicodesUnit.DAY}   | ${1}
    ${2}       | ${PublicodesUnit.DAYS}  | ${2}
    ${"2"}     | ${PublicodesUnit.DAYS}  | ${2}
    ${10}      | ${PublicodesUnit.DAYS}  | ${10}
    ${"12"}    | ${PublicodesUnit.DAYS}  | ${12}
    ${7}       | ${PublicodesUnit.WEEK}  | ${1}
    ${"14"}    | ${PublicodesUnit.WEEKS} | ${2}
    ${21}      | ${PublicodesUnit.WEEKS} | ${3}
    ${"30.42"} | ${PublicodesUnit.MONTH} | ${1}
    ${60.83}   | ${PublicodesUnit.MONTH} | ${2}
    ${182.5}   | ${PublicodesUnit.MONTH} | ${6}
    ${365}     | ${PublicodesUnit.MONTH} | ${12}
    ${"730"}   | ${PublicodesUnit.MONTH} | ${24}
  `(
    "should return $expectedValue $expectedUnit for $input day(s)",
    ({ input, expectedUnit, expectedValue }) => {
      expect(convertDaysIntoBetterUnit(input)).toEqual({
        unit: expectedUnit,
        value: expectedValue,
      });
    }
  );
});
