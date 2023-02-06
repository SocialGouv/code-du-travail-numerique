import { informationToSituation } from "../informationToSituation";
import { PublicodesInformation } from "../../store";

describe("Transforme les informations dans le state en un object pour une situation publicodes", () => {
  test("avec des informations saisies", () => {
    const data: Array<PublicodesInformation> = [
      {
        id: "1",
        info: "data",
        question: {
          name: "règle . namespace . publicodes",
          rule: {
            nom: "règle . namespace . publicodes",
          },
        },
        order: 1,
      },
    ];
    const result = informationToSituation(data);
    expect(result).toStrictEqual({
      "règle . namespace . publicodes": "data",
    });
  });

  test("avec des informations non saisies", () => {
    const data: Array<PublicodesInformation> = [
      {
        id: "1",
        info: "data",
        question: {
          name: "règle . namespace . publicodes",
          rule: {
            nom: "règle . namespace . publicodes",
          },
        },
        order: 1,
      },
      {
        id: "2",
        info: undefined,
        question: {
          name: "règle . namespace . publicodes . deux",
          rule: {
            nom: "règle . namespace . publicodes . deux",
          },
        },
        order: 2,
      },
    ];
    const result = informationToSituation(data);
    expect(result).toStrictEqual({
      "règle . namespace . publicodes": "data",
      "règle . namespace . publicodes . deux": undefined,
    });
  });

  test("sans informations", () => {
    const data: Array<PublicodesInformation> = [];
    const result = informationToSituation(data);
    expect(result).toStrictEqual({});
  });
});
