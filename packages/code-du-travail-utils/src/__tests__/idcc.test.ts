import { IDCC_SPLIT, IDCC_MERGE } from "../idcc";

describe("IDCC mappings", () => {
  describe("IDCC_SPLIT", () => {
    it("should contain valid split mapping for IDCC 1740", () => {
      expect(IDCC_SPLIT[1740]).toEqual([1596, 1597]);
    });

    it("should have all values as arrays", () => {
      Object.values(IDCC_SPLIT).forEach((value) => {
        expect(Array.isArray(value)).toBe(true);
        expect(value.length).toBeGreaterThan(0);
      });
    });

    it("should have all values as numbers", () => {
      Object.values(IDCC_SPLIT).forEach((idccs) => {
        idccs.forEach((idcc) => {
          expect(typeof idcc).toBe("number");
        });
      });
    });
  });

  describe("IDCC_MERGE", () => {
    it("should contain valid merge mapping for IDCC 3248", () => {
      expect(IDCC_MERGE[3248]).toBeDefined();
      expect(Array.isArray(IDCC_MERGE[3248])).toBe(true);
      expect(IDCC_MERGE[3248].length).toBeGreaterThan(70);
      expect(IDCC_MERGE[3248]).toContain(54);
      expect(IDCC_MERGE[3248]).toContain(650);
    });

    it("should contain valid merge mapping for IDCC 275", () => {
      expect(IDCC_MERGE[275]).toEqual([1391]);
    });

    it("should contain valid merge mapping for IDCC 1586", () => {
      expect(IDCC_MERGE[1586]).toEqual([1543]);
    });

    it("should contain valid merge mapping for IDCC 3245", () => {
      expect(IDCC_MERGE[3245]).toEqual([1710, 412]);
    });

    it("should have all values as arrays", () => {
      Object.values(IDCC_MERGE).forEach((value) => {
        expect(Array.isArray(value)).toBe(true);
        expect(value.length).toBeGreaterThan(0);
      });
    });

    it("should have all values as numbers", () => {
      Object.values(IDCC_MERGE).forEach((idccs) => {
        idccs.forEach((idcc) => {
          expect(typeof idcc).toBe("number");
        });
      });
    });

    it("should have all keys as numbers", () => {
      Object.keys(IDCC_MERGE).forEach((key) => {
        expect(Number.isNaN(Number(key))).toBe(false);
      });
    });
  });
});
