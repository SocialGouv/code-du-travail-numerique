function parseIdcc(idcc) {
  return parseInt(idcc, 10);
}
function formatIdcc(num) {
  return `0000${num}`.slice(-4);
}
// Extract external content url from Content tag markdown
function extractMdxContentUrl(markdown) {
  if (!markdown) return;
  // Check Content tag exist on markdown
  const contentTag = markdown.match(/<Content.*?href="([^"]+)".*?>/);
  return (
    contentTag &&
    contentTag[1] &&
    contentTag[1].match(
      /\bhttps?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\\+.~#?&//=]*)/gi
    )[0]
  );
}

module.exports = {
  extractMdxContentUrl,
  formatIdcc,
  parseIdcc,
};
