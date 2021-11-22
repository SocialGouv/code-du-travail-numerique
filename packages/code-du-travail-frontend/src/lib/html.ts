import cheerio from "cheerio";

export const htmlParser = (html: string): string => {
  const $ = cheerio.load(html, null, false);

  $("dl").replaceWith(function () {
    const src = $(this).find("source").attr("srcset");
    return src
      ? `<img src="${src}" style="width:100%;height:auto;"/>`
      : $(this).html();
  });

  $("webcomponent-tooltip").replaceWith(function () {
    const content = decodeURIComponent($(this).attr("content"));
    return content;
  });

  $("a").replaceWith(function () {
    const content = decodeURIComponent($(this).text());
    return $(this).text(content);
  });

  return $.html();
};
