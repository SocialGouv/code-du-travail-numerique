// arrange results tags format for the decision tree
// input : ["branche:hotellerie", "branche:restauration"]
// output : {branche:["hotellerie", "restauration"],tag2:[...],tag3:[...]}
const expandTags = hits =>
  hits.map(hit => ({
    ...hit._source,
    tags:
      hit._source.tags &&
      hit._source.tags.reduce(
        (tags, cur) => {
          const [tag, value] = cur.split(":");
          if (!tags[tag]) {
            tags[tag] = [];
          }
          tags[tag].push(value);
          return tags;
        },
        {
          source: hit._source.source
        }
      )
  }));

export default expandTags;
