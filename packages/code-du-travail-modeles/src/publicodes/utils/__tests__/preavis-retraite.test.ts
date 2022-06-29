import { PublicodesConvertedUnit } from "../../types";
import { convertDaysIntoBetterUnit } from "..";

describe("Testing the transformation of the unit from publicodes (in days) into a better unit (weeks or months)", () => {
  it.each`
    input      | expectedUnit                     | expectedValue
    ${1}       | ${PublicodesConvertedUnit.DAY}   | ${1}
    ${"1"}     | ${PublicodesConvertedUnit.DAY}   | ${1}
    ${2}       | ${PublicodesConvertedUnit.DAYS}  | ${2}
    ${"2"}     | ${PublicodesConvertedUnit.DAYS}  | ${2}
    ${10}      | ${PublicodesConvertedUnit.DAYS}  | ${10}
    ${"12"}    | ${PublicodesConvertedUnit.DAYS}  | ${12}
    ${7}       | ${PublicodesConvertedUnit.WEEK}  | ${1}
    ${"14"}    | ${PublicodesConvertedUnit.WEEKS} | ${2}
    ${21}      | ${PublicodesConvertedUnit.WEEKS} | ${3}
    ${"30.42"} | ${PublicodesConvertedUnit.MONTH} | ${1}
    ${60.83}   | ${PublicodesConvertedUnit.MONTH} | ${2}
    ${182.5}   | ${PublicodesConvertedUnit.MONTH} | ${6}
    ${365}     | ${PublicodesConvertedUnit.MONTH} | ${12}
    ${"730"}   | ${PublicodesConvertedUnit.MONTH} | ${24}
    ${28}      | ${PublicodesConvertedUnit.WEEKS} | ${4}
    ${30}      | ${PublicodesConvertedUnit.DAYS}  | ${30}
    ${35}      | ${PublicodesConvertedUnit.WEEKS} | ${5}
    ${45}      | ${PublicodesConvertedUnit.DAYS}  | ${45}
  `(
    "should return $expectedValue $expectedUnit for $input day(s)",
    ({ input, expectedUnit, expectedValue }) => {
      expect(convertDaysIntoBetterUnit(input)).toEqual({
        unit: expectedUnit,
        valid: true,
        value: expectedValue,
        valueInDays: parseFloat(input),
      });
    }
  );
});
