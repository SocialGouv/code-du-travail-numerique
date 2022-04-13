# Simulateur modèles

Ce package contient les modèles [publicodes](https://publi.codes/) pour les simulateurs du code du travail numérique.

## Organisation

Le package contient les modèles publicodes dans le dossier 'src/modeles' dans le format YAML.
Le découpage des modèles n'est pas encore finalisé.
A l'heure actuelle, on place les informations du code du travail dans le fichier `contrat-salarie.yaml`
puis les informations de chaque convention collective dans le dossier `src/modeles/conventions`
où chaque convention possède son fichier.

Une classe `MergeModele` dans le dossier `src/utils` permet de fusionner l'ensemble des fichiers YAML présent dans le dossier `modeles` pour alimenter le moteur de publicodes.

Enfin le dossier `src/__test__` contient les tests permettant de valider les règles dans le modèle YAML.
Le but étant de pouvoir fonctionner en mode TDD pour rédiger nos règles.
