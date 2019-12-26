// Extract external content url from Content tag markdown
const extractMdxContentUrl = markdown => {
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
};

export default extractMdxContentUrl;
