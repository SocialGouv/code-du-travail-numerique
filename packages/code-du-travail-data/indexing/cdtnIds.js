import * as XXH from "xxhashjs";

// import { logger } from "./logger";

// never change this seed, as ids are regenerated
// each time but must remain stable
const H = XXH.h64(0x1e7f);

// default id length, can be longer (up to 16)
const maxIdLength = 10;

// use xxhash to hash source+id
const hashId = (source, id, idLength) =>
  // save 64bits hash as Hexa string up to maxIdLength chars (can be changed later in case of collision)
  // as the xxhash function ensure distribution property
  H.update(source + id)
    .digest()
    .toString(16)
    .slice(0, idLength);

const hashingSet = (hashMap, idLength) => (obj) => {
  const { id, source } = obj;

  if (id && source) {
    const cdtnId = hashId(source, id, idLength);

    // alert if already seen (collision)
    // FIXME : process exit in case of collision once we've sorted ids issues
    if (hashMap.has(cdtnId)) {
      const adding = JSON.stringify({
        id,
        source,
      });
      const alreadyIn = JSON.stringify(hashMap.get(cdtnId));
      throw new Error(
        `ID collision detected : two contents have the same id ${cdtnId}: ${adding} AND ${alreadyIn}`
      );
      // console.error(
      //   `ID collision detected : two contents have the same id ${cdtnId}: ${adding} AND ${alreadyIn}`
      // );
    } else {
      obj.cdtnId = cdtnId;
      hashMap.set(cdtnId, { id, source });
    }
  }

  return obj;
};

const createHashingSet = () => hashingSet(new Map(), maxIdLength);

export { createHashingSet, hashingSet };
