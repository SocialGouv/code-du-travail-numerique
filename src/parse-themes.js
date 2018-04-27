/*
convert a bunch of

 A > B > C
 A > B > D
 A > B > D > E

 to a "syntax-tree"

 {
  title: "root",
  children: [{
    id: 42,
    title: "B",
    articles: ["R4233-1", "R4233-2"],
    children: [{
      id: 43,
      title: "C",
      articles:[]
      children: []
    },{
      id: 45,
      title: "D",
      articles: ["R1433-1"],
      children: [{
        title: "E",
        children:[]
      }]
    }]
  }]
 }

*/
const trimmed = str => str.trim();
const isSomething = thing => trimmed(thing).length;

const PARSE_ROW = /(\d+)\s+(.*?)\s+([L|R|D]\d\d.*)/i;
const PARSE_ARTICLES = /([L|R|D][\d-]+)/gi;

const parseArticles = str => {
  let matches;
  const articlesList = [];
  while ((matches = PARSE_ARTICLES.exec(str))) {
    articlesList.push(matches[1]);
  }
  return articlesList;
};

const parseThemesStr = str =>
  str
    .split(">")
    .map(trimmed)
    .filter(isSomething);

// build the basic tree
const parseThemes = textContent => {
  const rows = textContent.split("\n").filter(isSomething);

  const parsedRows = rows
    .map(row => {
      //console.log(row.match(ROW_PARSE));

      const matches = row.match(PARSE_ROW);
      if (matches) {
        const [id, themes, articlesList] = matches.slice(1);
        return {
          themes: parseThemesStr(themes),
          id: parseInt(id),
          articles: parseArticles(articlesList)
        };
      } else {
        console.log("cannot parse row", row);
        return false;
      }
    })
    .filter(Boolean);

  // 10897 articles !
  // const allArticles = parsedRows.reduce((articles, row) => {
  //   articles = articles.concat(row.articles);
  //   return articles;
  // }, []);

  const tree = parsedRows.reduce(
    (tree, row) => {
      // mutate the empty tree
      row.themes.reduce((node, theme, i) => {
        const exists = node.children.find(c => c.title === theme);
        if (!exists) {
          const child = {
            title: theme,
            children: []
          };
          // add id + articles when leaf
          if (i === row.themes.length - 1 && row.id) {
            child.id = row.id;
            child.articles = row.articles;
          }
          node.children.push(child);
        }
        return node.children[node.children.length - 1];
      }, tree);
      return tree;
    },
    {
      title: "root",
      children: []
    }
  );
  return tree;
};

//const debug = obj => console.log(JSON.stringify(obj, null, 2));

export default parseThemes;
