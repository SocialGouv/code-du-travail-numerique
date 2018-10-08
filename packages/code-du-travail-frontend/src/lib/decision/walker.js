//@flow

/*


*/

//type Filters = Object;

const sum = array => array.reduce((a, c) => a + c, 0);

const mean = array => sum(array) / array.length;

const getVariance = array =>
  mean(array.map(num => Math.pow(num - mean(array), 2)));

/*
type TagValueCount = Number;
type TagValues = {
  [key: string]: TagValueCount
};

type TagValue = String | String[];
type FilterValue = String;

type TagsCount = { [key: string]: TagValues };

type Doc = {
  id: String,
  tags: {
    [key: string]: TagValue
  }
};

type Docs = Doc[];
*/

// compute number of docs for each tag+value pair
export const getDocsCountByTag = ({ docs, tags }) => {
  const tagsCount = {} /*: TagsCount*/;
  docs.filter(doc => doc.tags).forEach(doc => {
    Object.keys(doc.tags)
      .filter(tag => (tags && tags.length ? tags.indexOf(tag) > -1 : tag))
      .forEach(docTag => {
        const increment = docTagValue => {
          if (tagsCount[docTag] === undefined) {
            tagsCount[docTag] = {};
          }
          if (!docTagValue) {
            return;
          }
          if (tagsCount[docTag][docTagValue] === undefined) {
            tagsCount[docTag][docTagValue] = 0;
          }
          tagsCount[docTag][docTagValue]++;
        };
        if (Array.isArray(doc.tags[docTag])) {
          doc.tags[docTag].forEach(value => {
            increment(value);
          });
        } else {
          increment(doc.tags[docTag]);
        }
      });
  });
  return tagsCount;
};

// add tag details so we can make the best match later on
export const getTagData = (tag, values) => {
  const allValues = Object.values(values),
    documents = sum(allValues),
    variance = getVariance(allValues),
    count = Object.keys(values).length;

  // TODO this is where we should compute something better, ex: popularity
  // favorize good distribution (variance) up to 5 categories and impacted docs volume.
  // penalize when no distribution (count===1)
  const score =
    (documents / ((count > 1 && Math.min(5, count)) || documents)) ** 2 /
      (1 + 1 / variance) +
    documents;

  if (process.env.NODE_ENV !== "production") {
    console.log({ values, allValues, variance, count, score });
  }

  return {
    tag,
    values,
    count,
    documents,
    variance,
    score
  };
};
/**
type DocByTag = {
  [key]: any
};

type DocsByTag = DocByTag[];
*/
// build list of tags and their metadata for a given dataset
export const getDocsByTag = ({ docs, tags }) => {
  const tagsCount = getDocsCountByTag({ docs, tags });
  return Object.keys(tagsCount).reduce(
    (t, k) => [...t, getTagData(k, tagsCount[k])],
    []
  );
};

const sortBy = key => (a, b) => {
  if (a[key] < b[key]) return -1;
  if (a[key] > b[key]) return 1;
  return 0;
};

// this filter checks for equal strings or array.includes
const tagMatch = (tagValue, filterValue) =>
  tagValue === filterValue ||
  (Array.isArray(tagValue) && tagValue.indexOf(filterValue) > -1) ||
  (!tagValue && filterValue === null);

// filter array of docs based on filters (hash of properties)
export const filterDocs = ({ docs, filters }) =>
  (filters &&
    Object.keys(filters).reduce(
      (curDocs, tag) =>
        curDocs.filter(
          doc => doc.tags && tagMatch(doc.tags[tag], filters[tag])
        ),
      docs
    )) ||
  docs;

// guess the next question to ask, based on current filters
export const getNextQuestion = ({ docs, filters, tags }) => {
  // guess next tag in the dataset
  // remove current filters
  const docsTags = getDocsByTag({ docs, tags }).filter(
    entry => (filters ? Object.keys(filters).indexOf(entry.tag) === -1 : true)
  );
  //.filter(entry => entry.count > 1);
  const sortedByScore = docsTags.sort(sortBy("score"));
  sortedByScore.reverse();
  if (process.env.NODE_ENV !== "production") {
    console.log({ sortedByScore });
  }
  if (sortedByScore.length) {
    return sortedByScore[0];
  }
  return null;
};
