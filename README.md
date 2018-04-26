# Code-du-travail Explorer [![CircleCI](https://circleci.com/gh/SocialGouv/code-du-travail-explorer.svg?style=svg)](https://circleci.com/gh/SocialGouv/code-du-travail-explorer)

Demo : https://socialgouv.github.io/code-du-travail-explorer/

💡 La mise à jour de la branche `master` déclenche une mise à jour sur la démo

 - Actuellement les datas sont en dur dans `/src/data` et ce sera sûrement remplacé par Elastic Search à un moment
    - Les IDs poseidon servent de lien
    - eposeidon-articles : extrait des articles eposeidon.json
    - faq.json : FAQ avec en plus un lien vers IDs poseidon
    - idcc.json : extrait de legifrance ?
    - themes.js : table qui definit les IDs eposeidon, arborescence, articles associés
    - fiches.js : fiches pratiques

Les résultats sont affichés par `src/Result.js` qui contient tous les "blocs".

## Todo

 - articles CDT
   - eposeidon-articles.js : remplacer par une API qui permet de requeter par ID de code/article car +10k articles. sur la base ePoseidon ?
   - remplir à la main pour l'instant (html)
 - Textes applicables :
   - associer id eposeidon aux 17 themes
   - Reprendre algo précédent et l'intégrer https://codesandbox.io/s/13r00163qq
   - Reprendre les modifs de JR
 - FAQ :
   - associer id eposeidon dans faq.json
   - enrichir avec les ODR --> discourse ?
 - Fiches pratiques :
   - associer id eposeidon dans fiches.js
 - textes conventionnels :
   - IDCCs:
      - verifier/corriger ce fichier
      - mapping idcc <-> url legifrance pour accès à la CCN: https://www.legifrance.gouv.fr/affichIDCC.do;jsessionid=28272FD8BF2FC02C4F3D212AEBF0D9A1.tpdjo14v_3?idSectionTA=KALISCTA000027751210&cidTexte=KALITEXT000027751199&idConvention=KALICONT000027961162
      - enrichir idcc.json pour inclure des tags et autres pour faciliter la recherche
      - établir mapping NAF<->IDCC
   - QUID recherche accord entreprise ?
 - contacts:
   - établir listing contacts par id eposeidon + region (+geoloc ?)
 - Liens, outils
   - établir listing de sites + mapping des themes + region (+geoloc ?)
 - form feedback : formspree ?
 - améliorer hierarchie des normes

## Intégration Elastic :

A priori Elastic devrait à terme remplacer toutes les sources de données statiques.

### Tags

 - la navigation de tags devrait être "intelligente"
    - proposer en plus des tags/sujets connexes
    - améliorer les suggestions avec ML Invenis + activité sur le site (questions fréquentes, actu...)

### Contenu

 - API code/numero article
 - FAQ : a terme, discourse ou autre outil de federation des questions réponses dans les UD

###