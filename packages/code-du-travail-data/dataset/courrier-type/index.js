const mammoth = require("mammoth");
const fs = require("fs");
const data = require("./courriers.json");
const { SOURCES, getRouteBySource } = require("@cdt/sources");
const slugify = require("../../slugify");
const allThemes = require("../datafiller/themes.data.json");

const themes = allThemes.filter(theme =>
  theme.refs.some(ref =>
    ref.url.startsWith(`/${getRouteBySource(SOURCES.LETTERS)}`)
  )
);

const DOC_DIR = "docx";

const basic_styles = `<style>
.courrier-expediteur {display: flex; align-items: flex-start; flex-direction:column;}
.courrier-destinataire {display: flex; align-items: flex-end; flex-direction:column;}
.courrier-signature {display: flex; flex-direction:column; align-items: flex-end;}
.editable {color: #4d73b8}
</style>`;

const options = {
  styleMap: [
    "p[style-name='signature'] => div.courrier-signature > p:fresh",
    "p[style-name='expediteur'] => div.courrier-expediteur > p:fresh",
    "p[style-name='destinataire'] => div.courrier-destinataire > p:fresh",
    "p[style-name='Titre'] => h3.courrier-titre:fresh"
  ]
};

const convertFile2Html = ({ filename, title, description, ...rest }) => {
  return mammoth
    .convertToHtml(
      {
        path: `${__dirname}/${DOC_DIR}/${filename}`
      },
      options
    )
    .then(result => {
      const slug = slugify(title);
      const theme = themes.find(theme =>
        theme.refs.some(ref => ref.url.match(new RegExp(slug)))
      );
      let breadcrumbs = [];
      if (theme) {
        breadcrumbs = (theme.breadcrumbs || []).concat([
          {
            label: theme.title,
            slug: `/${getRouteBySource(SOURCES.THEMES)}/${theme.slug}`
          }
        ]);
      }

      return {
        filename,
        breadcrumbs,
        source: SOURCES.LETTERS,
        slug,
        filesize: fs.statSync(`${__dirname}/${DOC_DIR}/${filename}`).size,
        title,
        text: description,
        description,
        ...rest,
        excludeFromSearch: false,
        html:
          basic_styles +
          result.value
            .replace(/\t/g, " ")
            .replace(/(«[^»]+»)/g, "<span class='editable'>$1</span>")
      };
    })
    .catch(err => {
      console.error(`Error while converting ${filename}`, err);
    });
};

const getCourriers = () => Promise.all(data.map(convertFile2Html));

module.exports = { getCourriers };
