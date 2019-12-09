CDTN :

# Composants
- Elastic : stockage des docs
- Data : image node qui est chargée de pousser les données dans Elastic + nettoyer les data (=job) : TODO. A terme :
  pouvoir déclencher la MAJ des données depuis la CI. Actuellement les data sont dans le repo (sous forme de JSON)
    avantages : versionné
    inconvénients : nécessité de faire une release pour MAJ les données

- API python : fait tourner toute la partie NLP (Natural Langage Processing) : ML (tensorflow, modèle pytorch Bert) : gère la partie sémantique
- front en nodejs
- api nodejs publique


# Focus sur composant Data

Node :
- 2 commandes :
    - (1) dump : génère tous les documents avec les contenus dans 1 gros  (job = Register SocialGouv)
    - (3) populate : ingestion des data dans elastic
  
  (2) entre les 2 : container NLP qui prend le dump de fichier et ajoute des infos sémantiques et génère un nouveau fichier JSON agrégé
  C'est le fichier source pour le populate (job = register nlp image : copie les fichiers pour l'api et génére le nouveau dump)
    
  Tout çà est fait dans la CI
  Les infos sémantiques correspondent "juste" à un champ qui se nomme `title-vector`. 
  c'est sur ce champ qu'on fait la recherche dans elastic

# Déroulé d'une requête

- On saisi quelque chose dans le champ de recherche
- le front transmet la requête sur l'api nodejs
- le nodejs requête l'api NLP et récupère les vecteurs associés à la recherche
- l'api nodejs va faire des requêtes dans elastic en mode full text (texte saisie) + en mode
  sémantique avec le vecteur récup de NLP
  (ce qui est fait dans la CI permet d'associer un vecteur à chaque document)
  
  du coup ca permet de comparer le vecteur de la recherche en cours avec le vecteur de chaque doc
  

# process "le plus gourmand"

C'est le calcul des vecteurs de chaque doc dans la CI
L'api NLP charge "juste" le modèle


# TODO

- augmenter la request sur le deploy api-nodejs
- faire pareil sur le front ???
- présentation sur JMeter
- chercher dans #tech le lien du projet Jmeter/Kibana : lire le readme
