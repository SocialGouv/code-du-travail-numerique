import type { MissingArgs } from "../../types";
import { mergeMissingArgs } from "../merge-missing-args";

describe("Fusionne les missingArgs provenant de plusieurs situations", () => {
  test("une seule situation retourne des missing args", () => {
    const missingArgs1 = [] as MissingArgs[];
    const missingArgs2 = [
      { indice: 1, name: "arg1" },
      { indice: 2, name: "arg2" },
    ] as MissingArgs[];

    const missingArgsResult = mergeMissingArgs([missingArgs1, missingArgs2]);
    expect(missingArgsResult).toHaveLength(2);
    expect(missingArgsResult[0].name).toBe("arg1");
    expect(missingArgsResult[0].indice).toBe(1);
    expect(missingArgsResult[1].name).toBe("arg2");
    expect(missingArgsResult[1].indice).toBe(2);
  });

  test("les deux situations retournent des missings args sans conflit", () => {
    const missingArgs1 = [
      { indice: 1, name: "arg1" },
      { indice: 2, name: "arg2" },
    ] as MissingArgs[];
    const missingArgs2 = [
      { indice: 3, name: "arg3" },
      { indice: 4, name: "arg4" },
    ] as MissingArgs[];

    const missingArgsResult = mergeMissingArgs([missingArgs1, missingArgs2]);
    expect(missingArgsResult).toHaveLength(4);
    expect(missingArgsResult[0].name).toBe("arg1");
    expect(missingArgsResult[0].indice).toBe(1);
    expect(missingArgsResult[1].name).toBe("arg2");
    expect(missingArgsResult[1].indice).toBe(2);
    expect(missingArgsResult[2].name).toBe("arg3");
    expect(missingArgsResult[2].indice).toBe(3);
    expect(missingArgsResult[3].name).toBe("arg4");
    expect(missingArgsResult[3].indice).toBe(4);
  });

  test("les deux situations retournent des missings args avec un conflit sur le nom", () => {
    const missingArgs1 = [
      { indice: 1, name: "arg1" },
      { indice: 2, name: "arg2" },
    ] as MissingArgs[];
    const missingArgs2 = [
      { indice: 3, name: "arg1" },
      { indice: 4, name: "arg4" },
    ] as MissingArgs[];

    const missingArgsResult = mergeMissingArgs([missingArgs1, missingArgs2]);
    expect(missingArgsResult).toHaveLength(3);
    expect(missingArgsResult[0].name).toBe("arg1");
    expect(missingArgsResult[0].indice).toBe(1);
    expect(missingArgsResult[1].name).toBe("arg2");
    expect(missingArgsResult[1].indice).toBe(2);
    expect(missingArgsResult[2].name).toBe("arg4");
    expect(missingArgsResult[2].indice).toBe(4);
  });

  test("les deux situations retournent des missings args avec un conflit sur le nom (indice plus favorable dans la deuxième situation)", () => {
    const missingArgs1 = [
      { indice: 2, name: "arg1" },
      { indice: 3, name: "arg2" },
    ] as MissingArgs[];
    const missingArgs2 = [
      { indice: 1, name: "arg1" },
      { indice: 4, name: "arg4" },
    ] as MissingArgs[];

    const missingArgsResult = mergeMissingArgs([missingArgs1, missingArgs2]);
    expect(missingArgsResult).toHaveLength(3);
    expect(missingArgsResult[0].name).toBe("arg1");
    expect(missingArgsResult[0].indice).toBe(1);
    expect(missingArgsResult[1].name).toBe("arg2");
    expect(missingArgsResult[1].indice).toBe(3);
    expect(missingArgsResult[2].name).toBe("arg4");
    expect(missingArgsResult[2].indice).toBe(4);
  });
});
