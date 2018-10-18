# Code du travail - CSS (@cdt/css)

> Private internal module 

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


## Conseils pour contribuer

- Le résultat doit respecter [les critères RGAA](https://references.modernisation.gouv.fr/rgaa-accessibilite/criteres.html) du référentiel du S.I. de l'État
- Le HTML [doit être valide](https://html5.validator.nu)

## Installation de l'environnement de développement

```sh
# - le watcher qui va générer le fichier `bundle.css`
$ npm run dev
# - un serveur web local pour servir le répertoire `docs/`
$ cd docs/ && python -m SimpleHTTPServer
```

Le serveur web local permet de contourner les limitations CORS des navigateurs pour servir correctement les `@font-face` par exemple.

Autres façons de lancer un serveur web local :

```shell
# JavaScript
npm install http-server
http-server . -p 8000

# Python 3.x
python -m http.server
```

## Pourquoi les sources dans un répertoire `docs/` ?

C'est une petite astuce pour utiliser [GitHub Pages](https://help.github.com/articles/configuring-a-publishing-source-for-github-pages/#publishing-your-github-pages-site-from-a-docs-folder-on-your-master-branch) depuis la branche `master`.

## Organisation du code CSS

```
docs/
    ├── css/
    │   ├── components/         # Style des composants de l'interface
    │   │   ├── _alerts.css
    │   │   ├── ...
    │   │   └── _header.css
    │   ├── elements/           # Style des éléments HTML de base
    │   │   ├── _table.css
    │   │   ├── ...
    │   │   └── _link.css
    │   ├── global/
    │   │   ├── _classes.css    # Classes pouvant être affectées à plusieurs éléments
    │   │   ├── _conf.css       # Configuration : @font-face, @custom-media, variables
    │   │   └── _layout.css     # Système de mise en page
    │   └── styles.css          # Fichier principal utilisé par le watcher pour générer bundle.css
    └── bundle.css              # Fichier généré à la volée utilisable en production
```

## Icônes

Les icônes proviennent de [flaticon.com](https://www.flaticon.com/family/detailed-rounded/lineal) :

- https://www.flaticon.com/packs/interview-5
- https://www.flaticon.com/packs/miscellaneous-elements
- https://www.flaticon.com/packs/startups-16
- https://www.flaticon.com/packs/money-37

Lorsqu'un nouveau pack d'icônes est utilisé, on ajoute son répertoire dans `docs/assets/icons_source/` et on optimise son contenu avec [`svgo`](https://github.com/svg/svgo) :

```shell
./node_modules/.bin/svgo -f docs/assets/icons_source/money-37/
```

On change la couleur principale des icônes à la main dans les fichiers SVG :

```
fill="#4c5467"
<svg xmlns="http://www.w3.org/2000/svg" ... fill="#4c5467">
```

Quand on veut utiliser une icône, on la copie depuis `docs/assets/icons_source/` vers `docs/assets/icons/`.

Ça nous permet de :

- pouvoir facilement retrouver la provenance d'une icône
- pouvoir supprimer les icônes inutilisées par l'interface dans `docs/assets/icons/`
