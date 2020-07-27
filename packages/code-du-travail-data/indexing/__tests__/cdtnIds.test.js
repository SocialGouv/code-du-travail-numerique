import { hashFunctionBuilder } from "../cdtnIds";

describe("generate cdtn ids", () => {
  test("should generate ids as expected", () => {
    // return a parameterized hasing function function
    const idSet = new Map();
    const hashId = hashFunctionBuilder(idSet, 10);

    // reference
    const hash1A = hashId({ id: "AAAA", source: "source1" });

    // test different when different original ids
    const hash1B = hashId({ id: "BBBB", source: "source1" });
    expect(hash1B).not.toBe(hash1A);

    // test different when different sources
    const hash2A = hashId({ id: "AAAA", source: "source2" });
    expect(hash2A).not.toBe(hash1A);

    // test same when same source + id
    // empty the set to avoid collision issue
    idSet.clear();
    const hash1Abis = hashId({
      id: "AAAA",
      source: "source1",
    });

    expect(hash1Abis).toBe(hash1A);
  });

  test("id length is respected", () => {
    const sample = { id: "xxx", source: "s1" };
    const hashId10 = hashFunctionBuilder();
    expect(hashId10(sample).length).toBe(10);

    const hashId12 = hashFunctionBuilder(new Map(), 12);
    expect(hashId12(sample).length).toBe(12);
  });

  test("collisions are detected", () => {
    const sample = { id: "xxx", source: "s1" };
    const hashId = hashFunctionBuilder();

    // try to hash the same value twice
    hashId(sample);
    expect(() => hashId(sample)).toThrowError("collision");
  });

  test("raise issue if source or if missing", () => {
    const hashId = hashFunctionBuilder();
    expect(() => hashId({ id: "xxx" })).toThrowError("hash");
  });
});
