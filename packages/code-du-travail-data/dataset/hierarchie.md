# Hierarchie des normes

Ex d'algo pour recherche textes applicables en fonction du thème;

Ex : Contrat de travail / Période d'essai / Durée maximale légale



  - code du travail XXXXX
    -> Afficher article du CDT

  - Si un des 13 themes du L2253-1 (pas le cas)
    - Accord branche prime sur AE
      -> afficher article de l'accord de branche (sur theme en question)
      - ⚠ sauf si accord entreprise dispose de garanties au - équivalentes
        -> afficher article de l'accord de l'entreprise (sur theme en question)

  - Si un des 4 themes du L2253-2 (pas le cas)
    - penibilité, travailleurs handicapés, délégués syndicaux, primes travaux dangeureux et insalubres
    - Si la branche dit qu'elle verouille l'un des 4 themes
      -> afficher article de l'accord de branche (sur theme en question)
      - ⚠ sauf si accord entreprise dispose de garanties au - équivalentes et a été signé posterieurement à la date d'entrée en vigueur de l'AB
        -> afficher article de l'accord de l'entreprise (sur theme en question)
    - Sinon
      l'AE s'applique même si - favorable
      -> afficher article de l'accord d'entreprise (sur theme en question)
    - Si doute : afficher AE+AB et rappeler la regle

  - Sinon: L2253-3
    - Si l'AE aborde le thème :
      -> affiche l'article de l'AE
    - Si pas d'AE ou n'abord pas le theme et si l'AB l'aborde :
      -> affiche l'article de l'AB


