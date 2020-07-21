import { createHashingSet, hashingSet } from "../cdtnIds";

describe("generate cdtn ids", () => {
  test("should generate ids as expected", () => {
    // return a parameterized hasing function function
    const idSet = new Map();
    const hashId = hashingSet(idSet, 10);

    // reference
    const hash1A = hashId({ id: "AAAA", source: "source1" }).cdtnId;

    // test different when different original ids
    const hash1B = hashId({ id: "BBBB", source: "source1" }).cdtnId;
    expect(hash1B).not.toBe(hash1A);

    // test different when different sources
    const hash2A = hashId({ id: "AAAA", source: "source2" }).cdtnId;
    expect(hash2A).not.toBe(hash1A);

    // test same when same source + id
    // empty the set to avoid collision issue
    idSet.clear();
    const hash1Abis = hashId({
      id: "AAAA",
      source: "source1",
    }).cdtnId;

    expect(hash1Abis).toBe(hash1A);
  });

  test("id length is respected", () => {
    const sample = { id: "xxx", source: "s1" };
    const hashId10 = createHashingSet();
    expect(hashId10(sample).cdtnId.length).toBe(10);

    const hashId12 = hashingSet(new Map(), 12);
    expect(hashId12(sample).cdtnId.length).toBe(12);
  });

  test("collisions are detected", () => {
    const sample = { id: "xxx", source: "s1" };
    const hashId = createHashingSet();

    // try to hash the same value twice
    hashId(sample);
    expect(() => hashId(sample)).toThrowError("collision");
  });
});
