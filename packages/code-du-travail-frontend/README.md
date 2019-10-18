# Code-du-travail - Frontend (@cdt/frontend)

Ce dépôt de code contient le frontend du site web du Code du Travail Numérique.

- Prototype dispo sur : http://master.code-du-travail-numerique.dev.factory.social.gouv.fr/

## Lancer l'environnement de développement

**Important** : pour tourner en local, ce projet nécessite les services api et elasticsearch  

```sh
# for local dev
$ yarn workspace @cdt/frontend dev
```
Par default, en developpement l'api nlp est remplacée par un endpoint du service api
Toutefois, vous pouvez lancer l'application front sans le le mock de l'api nlp.

```sh
# for local dev
$ yarn workspace @cdt/frontend dev-with-nlp
```

## Utiliser une couleur du thème

Lorsque vous souhaitez définir une couleur, merci de ne pas utiliser directement la variable `colors` du thème l'UI mais de passer par le thème fourni par styled-component. e.g. en css: 
Not OK: ~~`color: ${theme.colors.blueDark};`~~
OK: `color: ${({theme }) => theme.blueDark};`
Sinon la couleur ne sera pas impactée en cas de changement de thème.

## Lancer la version build du frontend

```sh
$ yarn workspace @cdt/frontend build && yarn workspace @cdt/frontend start
```
