import cheerio from "cheerio";

export const htmlParser = (html: string): string => {
  const $ = cheerio.load(html, null, false);

  // FIXME: Remove style from docx converter
  $("style").remove();

  $("dl").replaceWith(function () {
    const src = $(this).find("source").attr("srcset");
    return src
      ? `<img src="${src}" style="width:100%;height:auto;"/>`
      : $(this).html();
  });

  // FIXME: Admin regex
  $("webcomponent-tooltip").each(function (_i, elem) {
    const text = $(elem).text();
    if (text === "1") {
      $(elem).replaceWith(text);
    }
  });

  $("a").each(function (_i, elem) {
    const content = decodeURIComponent($(elem).text());
    $(elem).text(content);
  });

  return $.html();
};
