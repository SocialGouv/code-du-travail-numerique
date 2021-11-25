import cheerio from "cheerio";

export const htmlParser = (html: string): string => {
  const $ = cheerio.load(html, null, false);

  $("dl").replaceWith(() => {
    const src = $(this).find("source").attr("srcset");
    return src
      ? `<img src="${src}" style="width:100%;height:auto;"/>`
      : $(this).html();
  });

  $("a").each(() => {
    const content = decodeURIComponent($(this).text());
    $(this).text(content);
  });

  return $.html();
};
