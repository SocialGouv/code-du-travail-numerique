const mammoth = require("mammoth"); 
const data = require("./courriers.json"); 

const DOC_DIR = "docx"; 
const basic_styles = `<style>
.courrier-expediteur {display: flex; align-items: flex-start; flex-direction:column;}  
.courrier-destinataire {display: flex; align-items: flex-end; flex-direction:column;}  
.courrier-signature {display: flex; flex-direction:column; align-items: flex-end;}  
.editable {color: blue}
</style>`
const options = {
  styleMap: [
    "p[style-name='signature'] => div.courrier-signature > p:fresh",
    "p[style-name='expediteur'] => div.courrier-expediteur > p:fresh",
    "p[style-name='destinataire'] => div.courrier-destinataire > p:fresh",
    "p[style-name='Titre'] => h3.courrier-titre:fresh",
  ]
};

const convertFile2Html = ({ filename, ...rest }) => { 
  return mammoth
    .convertToHtml({
      path: `${__dirname}/${DOC_DIR}/${filename}`, 
    }, options)
    .then(result =>  ({ 
        ...rest, 
        html: basic_styles + result.value.replace(/\t/g, ' ').replace(/(«[^»]+»)/g, "<span class='editable'>$1</span>") 
      }));
}

Promise.all(data.map(convertFile2Html)).then(result => console.log(JSON.stringify(result, null, 2)));
