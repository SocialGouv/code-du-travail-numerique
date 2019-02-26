# Code du travail - CSS (@cdt/css)

> Private internal module 
Ancienne doc [`--> ici <--`](https://socialgouv.github.io/code-du-travail-css/)

## Usage

```js
import "@cdt/css"
```

## Notes sur les outils utilisés pour le développement CSS

PostCSS est utilisé pour le développement CSS.

Il permet de transformer le code CSS à l'aide de plug-ins JavaScript (voir le fichier `postcss.config.js`) :

- [`postcss-preset-env`](https://preset-env.cssdb.org) configuré pour tourner en [stage 0](https://cssdb.org/#staging-process)
- [`postcss-import`](https://github.com/postcss/postcss-import) pour _inliner_ les `@import`s CSS et mettre en place un système d'importation de _partials_ (à la SASS ou Stylus)
- [`cssnano`](https://cssnano.co)

## Icônes

Lorsqu'une icone est ajoutée, la placer dans `src/assets/icons_source/` et on optimise son contenu avec [`svgo`](https://github.com/svg/svgo) :

```shell
./node_modules/.bin/svgo -f src/assets/icons_source/money-37/
```

On change la couleur principale des icônes à la main dans les fichiers SVG :

```
fill="#4c5467"
<svg xmlns="http://www.w3.org/2000/svg" ... fill="#4c5467">
```

Quand on veut utiliser une icône, on la copie depuis `src/assets/icons_source/` vers `src/assets/icons/`.
