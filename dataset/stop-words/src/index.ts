// This list comes from
// - https://countwordsfree.com/stopwords/french
// - https://github.com/apache/lucene-solr/blob/master/lucene/analysis/common/src/resources/org/apache/lucene/analysis/snowball/french_stop.txt

import stop_words from "./stop_words.json";

export const stopwords: string[] = stop_words;
// export default stopwords;
