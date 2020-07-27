import * as XXH from "xxhashjs";

// never change this seed, as ids are regenerated
// each time but must remain stable
const H = XXH.h64(0x1e7f);

// default id length, can be longer (up to 16)
const maxIdLength = 10;

// use xxhash to hash source+id
const hashId = (content, idLength) =>
  // save 64bits hash as Hexa string up to maxIdLength chars (can be changed later in case of collision)
  // as the xxhash function ensure distribution property
  H.update(content).digest().toString(16).slice(0, idLength);

// build a hash function that keep track of processed content to manage collisions
const hashFunctionBuilder = (hashMap = new Map(), idLength = maxIdLength) => ({
  id,
  source,
}) => {
  if (id && source) {
    const cdtnId = hashId(source + id, idLength);

    // alert if already seen (collision)
    if (hashMap.has(cdtnId)) {
      const adding = JSON.stringify({
        id,
        source,
      });
      const alreadyIn = JSON.stringify(hashMap.get(cdtnId));
      throw new Error(
        `ID collision detected : two contents have the same id ${cdtnId}: ${adding} AND ${alreadyIn}`
      );
    } else {
      // save the relation to detect collision later on
      hashMap.set(cdtnId, { id, source });
    }

    return cdtnId;
  } else {
    throw new Error(
      `Cannot generate hash if id or source missing : ${JSON.stringify({
        id,
        source,
      })}`
    );
  }
};

export { hashFunctionBuilder };
