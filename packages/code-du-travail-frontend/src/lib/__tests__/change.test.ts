import { diffObject } from "..";

describe("diffObject", () => {
  it.each`
    object1                                     | object2                                     | expected
    ${{ criteria: { groupe: "A" }, res: "yo" }} | ${{ criteria: { groupe: "B" }, res: "yo" }} | ${{ criteria: { groupe: "B" } }}
    ${{ criteria: { groupe: "B" }, res: "yo" }} | ${{ criteria: { groupe: "A" }, res: "yo" }} | ${{ criteria: { groupe: "A" } }}
    ${{ criteria: { groupe: "B" }, res: "yo" }} | ${undefined}                                | ${{ criteria: { groupe: "B" }, res: "yo" }}
    ${undefined}                                | ${{ criteria: { groupe: "B" }, res: "yo" }} | ${{ criteria: { groupe: "B" }, res: "yo" }}
  `(
    "should return $expected for those object $object1 $object2",
    ({ object1, object2, expected }) => {
      expect(diffObject(object1, object2)).toStrictEqual(expected);
    }
  );
});
