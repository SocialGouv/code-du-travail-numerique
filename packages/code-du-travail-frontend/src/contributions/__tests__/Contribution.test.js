import React from "react";
import { render } from "@testing-library/react";
import Contribution from "../Contribution";

let mockPreselectedConvention = null;

jest.mock("use-persisted-state", () => () /*key*/ => () => [
  mockPreselectedConvention,
  () => {}
]);

beforeEach(() => {
  mockPreselectedConvention = null;
});

describe("<Contribution />", () => {
  it("should render with no answer", () => {
    const answers = {};
    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
  it("should render with generic answer", () => {
    const answers = { generic: { markdown: "hello **world**" } };
    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
  it("should render with generic answer and content", () => {
    const answers = { generic: { markdown: "hello **world**" } };
    const content = {
      raw:
        '{"type":"element","name":"Publication","attributes":{"xmlns:dc":"http://purl.org/dc/elements/1.1/","xmlns:xsi":"http://www.w3.org/2001/XMLSchema-instance","ID":"F33693","type":"Fiche d\'information","xsi:noNamespaceSchemaLocation":"../Schemas/3.0/Publication.xsd"},"children":[{"type":"element","name":"dc:title","children":[{"type":"text","text":"Embauche en contrat d\'extra (CDD d\'usage)"}]},{"type":"element","name":"dc:creator","children":[{"type":"text","text":"Direction de l\'information légale et administrative"}]},{"type":"element","name":"dc:subject","children":[{"type":"text","text":"Ressources humaines"}]},{"type":"element","name":"dc:description","children":[{"type":"text","text":"Le contrat d\'extra, ou contrat d\'usage, est un contrat à durée déterminée particulier, qui permet à un employeur d\'un secteur d\'activité strictement défini d\'augmenter son effectif en employant rapidement un extra. Ce contrat ne peut être utilisé que pour répondre à des besoins ponctuels et immédiats pour un poste spécifique et limités dans le temps."}]},{"type":"element","name":"dc:publisher","children":[{"type":"text","text":"Direction de l\'information légale et administrative"}]},{"type":"element","name":"dc:contributor","children":[{"type":"text","text":"Direction de l\'information légale et administrative (Premier ministre), Ministère chargé du travail"}]},{"type":"element","name":"dc:date","children":[{"type":"text","text":"modified 2019-04-24"}]},{"type":"element","name":"dc:type","children":[{"type":"text","text":"Fiche pratique"}]},{"type":"element","name":"dc:format","children":[{"type":"text","text":"text/xml"}]},{"type":"element","name":"dc:identifier","children":[{"type":"text","text":"F33693"}]},{"type":"element","name":"dc:source","children":[{"type":"text","text":"http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:1999:175:0043:0048:fr:PDF, https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000022234316&cidTexte=LEGITEXT000006072050, http://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901221&cidTexte=LEGITEXT000006072050, http://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901226&cidTexte=LEGITEXT000006072050, https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000021336319&cidTexte=LEGITEXT000006072050, http://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000019668669&cidTexte=LEGITEXT000006072050, https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000032113284, https://www.legifrance.gouv.fr/affichIDCC.do?cidTexte=KALITEXT000005670044&idSectionTA=KALISCTA000005747382&idConvention=KALICONT000005635534, https://www.legifrance.gouv.fr/affichIDCC.do?cidTexte=KALITEXT000005670044&idSectionTA=KALISCTA000005747389&idConvention=KALICONT000005635534, https://www.legifrance.gouv.fr/affichTexte.do;?cidTexte=JORFTEXT000034599578&dateTexte=&oldAction=rechJO&categorieLien=id"}]},{"type":"element","name":"dc:language","children":[{"type":"text","text":"Fr"}]},{"type":"element","name":"dc:relation","children":[{"type":"text","text":"isPartOf N17109"}]},{"type":"element","name":"dc:coverage","children":[{"type":"text","text":"France entière"}]},{"type":"element","name":"dc:rights","children":[{"type":"text","text":"https://www.service-public.fr/a-propos/mentions-legales"}]},{"type":"element","name":"SurTitre","children":[{"type":"text","text":"Fiche pratique"}]},{"type":"element","name":"Audience","children":[{"type":"text","text":"Professionnels"}]},{"type":"element","name":"Canal","children":[{"type":"text","text":"www.service-public.fr"}]},{"type":"element","name":"FilDAriane","children":[{"type":"element","name":"Niveau","attributes":{"ID":"Professionnels"},"children":[{"type":"text","text":"Accueil professionnels"}]},{"type":"element","name":"Niveau","attributes":{"ID":"N24267"},"children":[{"type":"text","text":"Ressources humaines"}]},{"type":"element","name":"Niveau","attributes":{"ID":"N17109"},"children":[{"type":"text","text":"Contrats de travail"}]},{"type":"element","name":"Niveau","attributes":{"ID":"F33693","type":"Fiche d\'information"},"children":[{"type":"text","text":"Embauche en contrat d\'extra (CDD d\'usage)"}]}]},{"type":"element","name":"Theme","attributes":{"ID":"N24267"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Ressources humaines"}]}]},{"type":"element","name":"SousThemePere","attributes":{"ID":"N10778"},"children":[{"type":"text","text":"Recrutement, aides à l\'emploi"}]},{"type":"element","name":"DossierPere","attributes":{"ID":"N17109"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Contrats de travail"}]},{"type":"element","name":"Fiche","attributes":{"ID":"F22546"},"children":[{"type":"text","text":"Contrat à durée indéterminée (CDI)"}]},{"type":"element","name":"Fiche","attributes":{"ID":"F22549"},"children":[{"type":"text","text":"Contrat à durée déterminée (CDD)"}]},{"type":"element","name":"Fiche","attributes":{"ID":"F33693"},"children":[{"type":"text","text":"Contrat d\'extra (CDD d\'usage)"}]},{"type":"element","name":"Fiche","attributes":{"ID":"F22553"},"children":[{"type":"text","text":"Contrat de travail temporaire (intérimaire)"}]},{"type":"element","name":"Fiche","attributes":{"ID":"F31620"},"children":[{"type":"text","text":"Portage salarial"}]},{"type":"element","name":"Fiche","attributes":{"ID":"F22542"},"children":[{"type":"text","text":"Prêt de main d\'œuvre entre entreprises"}]},{"type":"element","name":"Fiche","attributes":{"ID":"F2918"},"children":[{"type":"text","text":"Contrat d\'apprentissage"}]}]},{"type":"element","name":"Avertissement","attributes":{"ID":"R53412","date":"2019-04-24"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Fin de la majoration de la contribution patronale d\'assurance chômage"}]},{"type":"element","name":"Texte","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"La majoration de la contribution patronale d\'assurance chômage pour les CDD d\'usage ne s\'applique plus depuis le 1"},{"type":"element","name":"Exposant","children":[{"type":"text","text":"er"}]},{"type":"text","text":" avril 2019  (convention du 14 avril 2017 relative à l\'assurance chômage)."}]}]}]},{"type":"element","name":"Introduction","children":[{"type":"element","name":"Texte","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Le contrat d\'extra, ou contrat d\'usage, est un contrat à durée déterminée particulier, qui permet à un employeur d\'un secteur d\'activité strictement défini d\'augmenter son effectif en employant rapidement un extra. Ce contrat ne peut être  utilisé que pour répondre à des besoins ponctuels et immédiats pour un poste spécifique et limités dans le temps."}]}]}]},{"type":"element","name":"Texte","children":[{"type":"element","name":"Chapitre","children":[{"type":"element","name":"Titre","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Conditions de recours"}]}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Un "},{"type":"element","name":"LienInterne","attributes":{"LienPublication":"R2454","type":"Sigle"},"children":[{"type":"text","text":"CDD"}]},{"type":"text","text":" d\'usage peut être conclu s\'il remplit les 3 condition suivantes :"}]},{"type":"element","name":"Liste","attributes":{"type":"puce"},"children":[{"type":"element","name":"Item","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"un secteur d\'activité qui autorise ce type de contrat ;"}]}]},{"type":"element","name":"Item","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"usage constant de ne pas recourir au contrat à durée indéterminée ;"}]}]},{"type":"element","name":"Item","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"la nature temporaire de l\'emploi."}]}]}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"le contrat d\'extra est conclu pour la durée d\'une mission  de quelques heures, d\'une journée ou de plusieurs journées consécutives."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Il ne faut pas confondre le contrat d\'extra et le contrat à temps partiel : un salarié qui revient par exemple chaque semaine pour quelques heures dans l\'entreprise n\'est pas un extra, mais un salarié à temps partiel."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"L\'extra est un salarié présent de manière occasionnelle et irrégulière."}]}]},{"type":"element","name":"Chapitre","children":[{"type":"element","name":"Titre","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Secteurs autorisés"}]}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Dans certains secteurs d\'activité où le "},{"type":"element","name":"LienInterne","attributes":{"LienPublication":"R24389","type":"Sigle"},"children":[{"type":"text","text":"CDI"}]},{"type":"text","text":" n\'est pas un mode de recrutement traditionnellement utilisé, il est d\'usage et légal de recourir au CDD, appelé "},{"type":"element","name":"Expression","children":[{"type":"text","text":"CDD d\'usage constant"}]},{"type":"text","text":" ou "},{"type":"element","name":"Expression","children":[{"type":"text","text":"contrat d\'extra"}]},{"type":"text","text":"."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"En dehors des secteurs d\'activité couverts par décret ou par une convention ou un accord collectif étendu, le recours au CDD d\'usage n\'est pas permis."}]},{"type":"element","name":"Tableau","children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Domaines d\'activité où le CDD ou l\'intérim est l\'usage"}]},{"type":"element","name":"Colonne","attributes":{"largeur":"27","type":"header"}},{"type":"element","name":"Colonne","attributes":{"largeur":"21","type":"normal"}},{"type":"element","name":"Colonne","attributes":{"largeur":"21","type":"normal"}},{"type":"element","name":"Rangée","attributes":{"type":"header"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Secteurs d\'activité"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"CDD d\'usage"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Intérim"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Agences de voyage et tourisme"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Déménagement"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Services à la personne"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Non"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Hôtellerie, restauration"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Centre de loisirs et de vacances"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Activité foraine"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Non"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Sport professionnel"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Enseignement"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Spectacle"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Action culturelle"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Audiovisuel, production cinématographique, édition phonographique"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Exploitation forestière"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Réparation navale"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Information"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Enquêtes, sondages"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Entreposage et stockage de la viande"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Bâtiment et travaux publics pour les chantiers à l\'étranger"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Coopération, assistance technique d\'ingénierie et de recherche à l\'étranger"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Recherche scientifique dans le cadre d\'un accord international (convention, arrangement administratif)"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]},{"type":"element","name":"Rangée","attributes":{"type":"normal"},"children":[{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Assistance technique ou logistique dans les institutions internationales ou dans l\'Union européenne prévu par les traités"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Non"}]}]},{"type":"element","name":"Cellule","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Oui"}]}]}]}]}]},{"type":"element","name":"Chapitre","children":[{"type":"element","name":"Titre","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Conclusion et fin du contrat"}]}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Comme tout autre CDD, le contrat d\'extra ou CDD d\'usage doit être établi par écrit et comporter la définition précise de son motif. À défaut, il est requalifié en CDI. "}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Un contrat doit être établi pour chaque vacation. "}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Le contrat d\'extra peut être conclu pour un terme imprécis (il n\'est pas limité dans sa durée) ; il doit alors comporter une durée minimale et prend fin avec la tâche pour laquelle il a été conclu. "}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Les formalités d\'embauche sont identiques à celles des autres contrats de travail. Voir notre dossier "},{"type":"element","name":"LienInterne","attributes":{"LienPublication":"N22781","type":"Dossier","audience":"Professionnels"},"children":[{"type":"text","text":"Formalités d\'embauche."}]}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"La fin du contrat d\'extra ne donne pas droit à l\'indemnité de précarité prévue pour d\'autres types de CDD, sauf si une convention collective ou un accord collectif le prévoient."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Un délai de carence n\'est pas nécessaire en cas de succession de contrats avec un même salarié ou avec plusieurs salariés sur le même poste de travail. "}]}]},{"type":"element","name":"Chapitre","children":[{"type":"element","name":"Titre","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Rémunération et cotisations sociales"}]}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Le salaire de l\'extra ne peut pas être inférieur ni au minimum conventionnel de la catégorie professionnelle à laquelle il appartient, ni au montant de la rémunération que percevrait dans la même entreprise un salarié en CDI de qualification équivalente et occupant les mêmes fonctions."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"L\'employé doit être payé à chacune de ses interventions.  Si plusieurs vacations sont effectuées au cours d\'un mois civil, il est possible, avec l\'accord écrit du salarié, de le payer à une fréquence différente (semaine, quinzaine), sans aller au-delà d\'1 mois, sans que la nature juridique du contrat s\'en trouve modifiée."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Il est possible d\'établir un seul bulletin de paie récapitulatif qui ventile toutes les vacations lorsque la durée du contrat est inférieur à 1 mois (y compris en cas de chevauchement sur 2 mois)."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Elle ne s\'applique pas si le salarié est embauché en CDI à l\'issue du contrat court."}]}]},{"type":"element","name":"Chapitre","children":[{"type":"element","name":"Titre","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Congés et durée du travail"}]}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Le salarié n\'a pas droit à des jours de congés."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Mais, à la fin du contrat, il perçoit une indemnité de congés payés égale à "},{"type":"element","name":"Valeur","children":[{"type":"text","text":"10 %"}]},{"type":"text","text":" de la rémunération totale brute perçue (quelle que soit la durée du contrat)."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"La durée maximale est fixée par l\'usage."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"L\'employeur doit enregistrer sur un registre  l\'horaire  individuel de chaque salarié et les périodes de travail réellement effectuées."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Ce document doit être émargé par le salarié au moins 1 fois par semaine et tenu à la disposition de l\'inspecteur de travail."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Le salarié est tenu informé de ses droits acquis en matière de repos compensateur sur son bulletin de paie ou sur une fiche annexée qui indique pour le mois considéré :"}]},{"type":"element","name":"Liste","attributes":{"type":"puce"},"children":[{"type":"element","name":"Item","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"le nombre d\'heures supplémentaires effectuées ;"}]}]},{"type":"element","name":"Item","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"le nombre d\'heures de repos compensateur auxquelles elles ouvrent droit ;"}]}]},{"type":"element","name":"Item","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"le nombre d\'heures de repos attribuées."}]}]}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"La durée de présence sur les lieux de travail (y compris les heures supplémentaires) ne peut pas dépasser :"}]},{"type":"element","name":"Liste","attributes":{"type":"puce"},"children":[{"type":"element","name":"Item","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"une durée maximale par jour :"}]},{"type":"element","name":"Liste","attributes":{"type":"puce"},"children":[{"type":"element","name":"Item","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"11 heures pour un cuisinier ;"}]}]},{"type":"element","name":"Item","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"12 heures pour un veilleur de nuit ;"}]}]},{"type":"element","name":"Item","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"11h30 pour un autre salarié."}]}]}]}]},{"type":"element","name":"Item","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"une durée maximale  hebdomadaire de 50 heures (en moyenne sur 12 semaines) ou de 52 heures (en durée absolue)."}]}]}]}]},{"type":"element","name":"Chapitre","children":[{"type":"element","name":"Titre","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Requalification en CDI "}]}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Si la mission de l\'extra dépasse 60 jours dans un trimestre dans le même établissement, son contrat peut être requalifié en CDI."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Le salarié bénéficie d\'une procédure accélérée pour le demander devant le bureau de jugement du conseil de prud\'hommes (sans conciliation préalable). Le bureau  doit statuer au fond dans un délai d\'1 mois suivant sa saisine."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Lorsque le salarié voit sa demande de requalification acceptée, le contrat de travail est considéré comme étant à durée indéterminée dès l\'origine. Le salarié a en outre droit à une indemnité de requalification égale au minimum à 1 mois de salaire."}]},{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"L\'employeur encourt une amende de "},{"type":"element","name":"Valeur","children":[{"type":"text","text":"3 750 €"}]},{"type":"text","text":", et  une amende de"},{"type":"element","name":"Valeur","children":[{"type":"text","text":" 7 500 €"}]},{"type":"text","text":" et 6 mois d\'emprisonnement en cas de récidive. Pour les personnes morales, l\'amende est multipliée par 5 : soit, "},{"type":"element","name":"Valeur","children":[{"type":"text","text":"18 750 €"}]},{"type":"text","text":", "},{"type":"element","name":"Valeur","children":[{"type":"text","text":"37 500 €"}]},{"type":"text","text":" en cas de récidive."}]}]}]},{"type":"element","name":"VoirAussi","attributes":{"important":"non"},"children":[{"type":"element","name":"Fiche","attributes":{"ID":"F22549","audience":"Professionnels"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Contrat à durée déterminée (CDD)"}]},{"type":"element","name":"Theme","attributes":{"ID":"N24267"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Ressources humaines"}]}]}]}]},{"type":"element","name":"Reference","attributes":{"type":"Texte de référence","URL":"http://eur-lex.europa.eu/LexUriServ/LexUriServ.do?uri=OJ:L:1999:175:0043:0048:fr:PDF","ID":"R44077"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Directive 1999/70/CE du Conseil du 28 juin 1999 sur le travail à durée déterminée"}]}]},{"type":"element","name":"Reference","attributes":{"type":"Texte de référence","URL":"https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000022234316&cidTexte=LEGITEXT000006072050","ID":"R44078"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Code du travail : article L1242-2"}]},{"type":"element","name":"Complement","children":[{"type":"text","text":"Conditions de conclusion d\'un CDD"}]}]},{"type":"element","name":"Reference","attributes":{"type":"Texte de référence","URL":"http://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901221&cidTexte=LEGITEXT000006072050","ID":"R37748"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Code du travail : article L1243-10"}]},{"type":"element","name":"Complement","children":[{"type":"text","text":"Exclusion du bénéfice de la prime de précarité"}]}]},{"type":"element","name":"Reference","attributes":{"type":"Texte de référence","URL":"http://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000006901226&cidTexte=LEGITEXT000006072050","ID":"R34761"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Code du travail : article L1244-1"}]},{"type":"element","name":"Complement","children":[{"type":"text","text":"CDD successifs"}]}]},{"type":"element","name":"Reference","attributes":{"type":"Texte de référence","URL":"https://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000021336319&cidTexte=LEGITEXT000006072050","ID":"R37255"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Code du travail : article D1242-1"}]},{"type":"element","name":"Complement","children":[{"type":"text","text":"Conditions de recours au contrat d\'usage"}]}]},{"type":"element","name":"Reference","attributes":{"type":"Texte de référence","URL":"http://www.legifrance.gouv.fr/affichCodeArticle.do?idArticle=LEGIARTI000019668669&cidTexte=LEGITEXT000006072050","ID":"R37634"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Code du travail : article D1251-1"}]},{"type":"element","name":"Complement","children":[{"type":"text","text":"Intérim d\'usage"}]}]},{"type":"element","name":"Reference","attributes":{"type":"Texte de référence","URL":"https://www.legifrance.gouv.fr/affichTexte.do?cidTexte=JORFTEXT000032113284","ID":"R43951"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Arrêté du 19 février 2016 relatif à l\'agrément de l\'avenant du 18 décembre 2015 à la convention du 14 mai 2014 relative à l\'indemnisation du chômage"}]},{"type":"element","name":"Complement","children":[{"type":"text","text":"Article 52 de la Convention du 14 mai 2014 : majoration de la contribution patronale d\'assurance chômage"}]}]},{"type":"element","name":"Reference","attributes":{"type":"Texte de référence","URL":"https://www.legifrance.gouv.fr/affichIDCC.do?cidTexte=KALITEXT000005670044&idSectionTA=KALISCTA000005747382&idConvention=KALICONT000005635534","ID":"R44080"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Convention collective nationale des hôtels, cafés restaurants (HCR) du 30 avril 1997 : article 14"}]},{"type":"element","name":"Complement","children":[{"type":"text","text":"CDD d\'usage"}]}]},{"type":"element","name":"Reference","attributes":{"type":"Texte de référence","URL":"https://www.legifrance.gouv.fr/affichIDCC.do?cidTexte=KALITEXT000005670044&idSectionTA=KALISCTA000005747389&idConvention=KALICONT000005635534","ID":"R44896"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Convention collective nationale des hôtels, cafés restaurants (HCR) du 30 avril 1997 : article 21"}]},{"type":"element","name":"Complement","children":[{"type":"text","text":"Temps de travail dans les HCR"}]}]},{"type":"element","name":"Reference","attributes":{"type":"Texte de référence","URL":"https://www.legifrance.gouv.fr/affichTexte.do;?cidTexte=JORFTEXT000034599578&dateTexte=&oldAction=rechJO&categorieLien=id","ID":"R50472"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"Arrêté du 4 mai 2017 sur l\'extension d\'un accord relatif aux salariés employés sous CDD d\'usage dans le secteur des agences de voyage et de tourisme"}]}]},{"type":"element","name":"Abreviation","attributes":{"ID":"R2454","type":"Sigle"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"CDD"}]},{"type":"element","name":"Texte","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Contrat à durée déterminée"}]}]}]},{"type":"element","name":"Abreviation","attributes":{"ID":"R24389","type":"Sigle"},"children":[{"type":"element","name":"Titre","children":[{"type":"text","text":"CDI"}]},{"type":"element","name":"Texte","children":[{"type":"element","name":"Paragraphe","children":[{"type":"text","text":"Contrat de travail à durée indéterminée"}]}]}]},{"type":"element","name":"QuestionReponse","attributes":{"ID":"F31211","audience":"Professionnels"},"children":[{"type":"text","text":"Quelle peut être la durée maximale d\'un CDD ?"}]}]}'
    };
    const { container } = render(
      <Contribution answers={answers} content={content} />
    );
    expect(container).toMatchSnapshot();
  });
  it("should render with conventions answer", () => {
    const answers = {
      conventions: [
        {
          id: 123,
          idcc: 456,
          markdown: "hello **123**"
        }
      ]
    };
    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
  it("should render with both answers", () => {
    const answers = {
      generic: { markdown: "hello **generic**" },
      conventions: [
        {
          id: 123,
          idcc: 456,
          markdown: "hello **123**"
        }
      ]
    };
    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
  it("should render preselected convention", () => {
    mockPreselectedConvention = {
      title: "preselected convention",
      num: "idcc-preselected",
      id: 123
    };
    const answers = {
      generic: { markdown: "hello **generic**" },
      conventions: [
        {
          id: 123,
          idcc: "idcc-preselected",
          markdown: "hello **123**"
        }
      ]
    };

    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });

  it("should NOT render invalid preselected convention", () => {
    mockPreselectedConvention = {
      title: "unknown convention",
      num: "idcc-unknown",
      id: 456
    };
    const answers = {
      generic: { markdown: "hello **generic**" },
      conventions: [
        {
          id: 123,
          idcc: "idcc-preselected",
          markdown: "hello **123**"
        }
      ]
    };

    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });

  it("should render answer references", () => {
    mockPreselectedConvention = {
      title: "preselected convention",
      num: "idcc-preselected",
      id: 123
    };
    const answers = {
      generic: { markdown: "hello **generic**" },
      conventions: [
        {
          id: 123,
          idcc: "idcc-preselected",
          markdown: "hello **123**",
          references: [
            {
              id: 42,
              value: "reference externe 1",
              url: "http://path/to/ref"
            },
            {
              id: 422,
              value: "reference CC 1",
              agreement: {
                id: 123,
                url: "http://path/to/agreement"
              }
            }
          ]
        }
      ]
    };

    const { container } = render(<Contribution answers={answers} />);
    expect(container).toMatchSnapshot();
  });
});
