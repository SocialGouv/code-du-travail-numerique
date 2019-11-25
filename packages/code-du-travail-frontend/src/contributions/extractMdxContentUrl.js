// Extract external content url from Content tag markdown
const extractMdxContentUrl = markdown => {
  if (!markdown) return;
  // Check Content tag exist on markdown
  const contentTag = markdown.match(/<Content.*?href="([^"]+)".*?>/);
  return contentTag && contentTag[1];
};

export default extractMdxContentUrl;
