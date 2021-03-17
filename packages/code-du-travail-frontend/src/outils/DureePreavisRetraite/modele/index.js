const value = `
contrat salarié . ancienneté:
  somme:
    - contrat salarié . durée
  abattement: contrat salarié . absences . total

contrat salarié:
contrat salarié . date embauche:
  par défaut: "01/01/2020"
contrat salarié . date rupture:
  par défaut: "01/01/2020"

contrat salarié . durée:
  unité: mois
  durée:
    depuis: contrat salarié . date embauche
    jusqu'à: contrat salarié . date rupture


contrat salarié . absences:
# (C. trav., art. L. 1226-7)
contrat salarié . absences . interruptions de travail pour maladie professionnelle ou accident du travail:
  unité: mois
  par défaut: 0
  description: Période d'absence d'interruptions de travail pour maladie professionnelle ou accident du travail.
  reference:
    Code du travail: Art. L. 1226-7
# (C. trav., art. L. 1225-54)
contrat salarié . absences . congé parental d'éducation à temps plein:
  par défaut: 0
  unité: mois
  description: Période d'absence parental d'éducation à temps plein.
  reference:
    Code du travail: Art. L. 1225-54
# Manque la référence
contrat salarié . absences . maladie non professionnelle:
  par défaut: 0
  unité: mois
  description: Période d'absence pour maladie non professionnelle.

contrat salarié . absences . total:
  somme:
    - contrat salarié . absences . congé parental d'éducation à temps plein / 2
    - contrat salarié . absences . maladie non professionnelle

# Convention collective Boulangerie-pâtisserie (entreprises artisanales)
contrat salarié . convention collective:
  par défaut: "''"

contrat salarié . convention collective . IDCC843:
  description: Convention collective Boulangerie-pâtisserie (entreprises artisanales)
  formule: convention collective = 'IDCC843'

contrat salarié . convention collective . IDCC843 . total:
  titre: Absences conventionnelles Boulangerie-pâtisserie (entreprises artisanales)
  remplace:
    - règle: contrat salarié . absences . total
  formule:
    somme:
      - absences . interruptions de travail pour maladie professionnelle ou accident du travail
      - contrat salarié . absences . congé parental d'éducation à temps plein / 2

# Convention collective nationale de l'industrie pharmaceutique (accord du 11 avril 2019)
contrat salarié . convention collective . IDCC176:
  description: Convention collective nationale de l'industrie pharmaceutique (accord du 11 avril 2019)
  formule: convention collective = 'IDCC176'

contrat salarié . convention collective . IDCC176 . absences:
contrat salarié . convention collective . IDCC176 . absences . maladie supérieur à six mois:
  par défaut: 0
  unité: mois
  description: |
    Ne sont pas considérées comme temps de présence dans l'entreprise pour le calcul de l'ancienneté les périodes
    de maladies d'une durée totale, continue ou non, supérieure à 6 mois par année civile.


contrat salarié . convention collective . IDCC176 . total:
  titre: absences conventionnelles industrie pharmaceutique
  remplace:
    - règle: absences . total
  formule:
    somme:
      - absences . interruptions de travail pour maladie professionnelle ou accident du travail
      - absences . congé parental d'éducation à temps plein / 2
      - absences . maladie non professionnelle
      - contrat salarié . convention collective . IDCC176 . absences . maladie supérieur à six mois
`;

export default value;
