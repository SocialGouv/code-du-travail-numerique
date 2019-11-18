// Extract external content url from Content tag markdown
const extractMdxContentUrl = markdown => {
  if (!markdown) return;
  // Check Content tag exist on markdown
  const contentRegExp = new RegExp("<s*Content[^](.*?)s*/>", "g");
  const contentTag = markdown.match(contentRegExp);

  if (contentTag && contentTag.length > 0) {
    // Extract URL from Content tag, only one for now
    const contentUrl = contentTag[0].match(/href="(.*?)"/g);
    if (contentUrl.length === 0) return;

    return contentUrl[0].slice(6, -1);
  }
  return;
};

export default extractMdxContentUrl;
