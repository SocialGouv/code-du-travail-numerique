const mammoth = require("mammoth");
const data = require("./courriers.json");
const { SOURCES } = require("@cdt/sources");
const slugify = require("../../slugify");
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

const convertFile2Html = ({ filename, title, questions, ...rest }) => {
  return mammoth
    .convertToHtml(
      {
        path: `${__dirname}/${DOC_DIR}/${filename}`
      },
      options
    )
    .then(result => ({
      filename,
      source: SOURCES.LETTERS,
      slug: slugify(title),
      title,
      text: questions.join("\n"),
      ...rest,
      html:
        basic_styles +
        result.value
          .replace(/\t/g, " ")
          .replace(/(«[^»]+»)/g, "<span class='editable'>$1</span>")
    }));
};

const getCourriers = () => Promise.all(data.map(convertFile2Html));

module.exports = { getCourriers };
