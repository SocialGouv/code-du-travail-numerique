import cheerio from "cheerio";

export const htmlParser = (html: string): string => {
  const $ = cheerio.load(html, null, false);

  // FIXME: Remove style from docx converter
  $("style").remove();

  // https://travail-emploi.gouv.fr/le-ministere-en-action/coronavirus-covid-19/questions-reponses-par-theme/article/mesures-de-prevention-dans-l-entreprise-contre-la-covid-19
  $("button").remove();
  $(".oembed-source").remove();

  $("dl").replaceWith(function () {
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
