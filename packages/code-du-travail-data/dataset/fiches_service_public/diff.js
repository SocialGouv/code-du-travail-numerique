const prevFiches = require("./fiches-sp-travail.old.json");
const nextFiches = require("./fiches-sp-travail.json");

const urlTitle = i => ({
  url: i.url,
  title: i.title,
  id: i.url.match(/\/([A-Z][0-9]+)$/)[1]
});

function diffLog(prevJson, nextJson) {
  const prev = prevJson.map(urlTitle);
  const next = nextJson.map(urlTitle);

  const diff = {
    prev,
    next,
    previous: prev.filter(p => !next.some(n => n.url === p.url)),
    latest: next.filter(n => !prev.some(p => p.url === n.url)),
    doublons: Object.entries(
      next.reduce(
        (state, item) => {
          if (state.ids.indexOf(item.id) > -1) {
            state.doublons[item.id] = item;
          } else {
            state.ids.push(item.id);
          }
          return state;
        },
        { ids: [], doublons: {} }
      ).doublons
    ).map(([, value]) => value)
  };

  return `
    prev: ${diff.prev.length}
    next: ${diff.next.length}
    ## ${diff.previous.length} Fiches supprimées
    ${diff.previous.map(i => ` - [${i.id} - ${i.title}](${i.url})`).join("\n")}
    ## ${diff.latest.length} Fiches ajoutées
    ${diff.latest.map(i => ` - [${i.id} - ${i.title}](${i.url})`).join("\n")}
    ## ${diff.doublons.length} Fiches en doublons
    ${diff.doublons.map(i => ` - [${i.id} - ${i.title}](${i.url})`).join("\n")}
  `;
}

console.log(diffLog(prevFiches, nextFiches));
