/** @jest-environment node */

import { fetchFicheMT } from "../queries";

describe("Fiches MT", () => {
  it("fetchFicheMT", async () => {
    const result = await fetchFicheMT("la-demission");
    expect(result).toEqual({
      _id: "8",
      breadcrumbs: [
        {
          label: "Départ de l’entreprise",
          position: 8,
          slug: "/themes/depart-de-lentreprise",
        },
        {
          label: "Démission",
          position: 1,
          slug: "/themes/demission",
        },
      ],
      cdtnId: "5d4a0ee541",
      date: "09/11/2020",
      description:
        "La démission permet au salarié de rompre son CDI de sa propre initiative. Si un délai de préavis est prévu, il doit être respecté.",
      intro:
        '<p>La démission permet au salarié de rompre son contrat de travail à durée indéterminée de sa propre initiative, à condition de manifester clairement sa volonté de démissionner et de respecter le délai de préavis éventuellement prévu, sauf dispense accordée par l’employeur ou prévue par la convention collective (celle-ci peut, par exemple, prévoir que le salarié est libéré de son préavis lorsqu’il a trouvé un autre emploi). La démission n’est subordonnée à aucune autorisation préalable de l’employeur.<br class="manualbr">Des facilités de recherche d’emploi peuvent être prévues par la convention collective.</p>',
      sections: [
        {
          anchor: "Comment-presenter-une-demission",
          html: '<p>Le Code du travail ne prévoit aucune forme particulière pour présenter sa démission&nbsp;: elle peut être verbale, écrite ou résulter d’un comportement sans ambiguïté du salarié (ce qui n’est pas le cas, par exemple, de la seule absence du salarié à son poste de travail ou de l’absence de reprise du travail à l’issue des congés payés).</p><p>Toutefois, pour éviter les contestations sur l’intention même de démissionner ou sur la date de la fin du contrat de travail, le salarié a intérêt à remettre sa démission par écrit (si possible par lettre recommandée avec avis de réception). L’écrit permet également de définir le début du préavis.</p><blockquote class="spip"><p><strong>Stipulations des conventions collectives</strong><br class="autobr">Certaines conventions collectives prévoient que la démission doit être écrite et adressée par lettre recommandée avec avis de réception&nbsp;; toutefois, selon la <a href="http://www.legifrance.gouv.fr/affichJuriJudi.do?idTexte=JURITEXT000007471860" class="spip_out" rel="external">Cour de cassation</a>, l’absence de notification écrite de la démission ne remet pas en cause la validité de cette dernière, dès lors que le salarié manifeste sans ambigüité sa volonté de démissionner. <br class="autobr">La démission ne peut être exigée par avance, par exemple, lors de la signature du contrat de travail ou au cours de son exécution.</p></blockquote>',
          references: [],
          title: "Comment présenter une démission ?",
        },
        {
          anchor: "L-absence-prolongee-du-salarie-est-elle-une-demission",
          html: "<p>En cas d’absence prolongée de l’entreprise sans justification valable (par exemple, un arrêt de travail), ou d’absence de reprise du travail après un arrêt de travail, il n’est pas possible pour l’employeur de considérer le salarié comme démissionnaire. Dans ces hypothèses (souvent qualifiées d’abandon de poste), l’employeur doit demander à l’intéressé les raisons de son absence. Si le salarié ne répond pas dans un délai raisonnable, l’employeur peut engager une procédure de licenciement pour absence injustifiée Ainsi, une salariée qui, après une observation, avait quitté son travail et n’avait pas réintégré l’entreprise les jours suivants, n’a pas été considérée par la Cour de cassation comme démissionnaire.</p>",
          references: [],
          title: "L’absence prolongée du salarié est-elle une démission ?",
        },
        {
          anchor:
            "Le-refus-par-le-salarie-d-accepter-un-changement-des-conditions-de-nbsp",
          html: '<p>Le refus du salarié d’accepter un changement des conditions de travail ne constitue pas une démission. Il s’agit d’un manquement aux obligations du contrat que l’employeur peut sanctionner, au besoin, par un licenciement pour faute. Pour plus de précisions, on se reportera à la fiche consacrée à la <a href="https://travail-emploi.gouv.fr/droit-du-travail/la-vie-du-contrat-de-travail/article/la-modification-du-contrat-de-travail">modification du contrat de travail</a>.</p>',
          references: [],
          title:
            "Le refus, par le salarié, d’accepter un changement des conditions de travail est-il une démission ?",
        },
        {
          anchor: "Faut-il-respecter-un-preavis",
          html: '<p>Sauf dans certaines circonstances (par exemple, démission à la suite d’une grossesse, la salariée devant toutefois alerter son employeur quinze jours avant la date effective de sa démission,), le préavis, lorsqu’il est prévu, doit toujours être effectué. Si le salarié ne l’exécute pas, son employeur peut lui en réclamer le paiement devant le conseil de prud’hommes.</p><p>Toutefois le salarié peut être dispensé de préavis&nbsp;:</p><ul class="spip"><li> à sa demande et après acceptation de l’employeur (un écrit est conseillé). Dans ce cas, l’indemnité de préavis n’est pas due&nbsp;;</li><li> à la seule initiative de l’employeur. Celui-ci doit néanmoins verser l’indemnité de préavis.</li></ul><p>Sauf cas particuliers (assistant(e)s maternel(le)s, VRP, journalistes professionnels), la loi ne fixe pas la durée du préavis et prévoit simplement qu’elle est déterminée par la convention ou l’accord collectif de travail applicable, ou par les usages pratiqués dans la localité ou la profession. Dans la majorité des situations, cette durée est effectivement fixée par les conventions (conventions de branche, d’entreprise, d’établissement), par les usages ou par le contrat de travail.</p><blockquote class="spip"><p>En cas de démission, l’existence et la durée du préavis sont fixées par la loi, ou par convention ou accord collectif de travail. En l’absence de dispositions légales, de convention ou accord collectif de travail relatifs au préavis, son existence et sa durée résultent des usages pratiqués dans la localité et dans la profession. Le contrat de travail peut prévoir un préavis plus court que le préavis conventionnel, mais pas plus long.<br class="autobr">Certaines conventions prévoient que le salarié est libéré de son préavis lorsqu’il a trouvé un autre emploi.</p></blockquote>',
          references: [],
          title: "Faut-il respecter un préavis ?",
        },
        {
          anchor: "Et-les-heures-pour-recherche-d-emploi",
          html: "<p>La loi n’en prévoit pas. En revanche, certaines conventions collectives organisent en faveur des salariés licenciés (rarement pour ceux qui donnent leur démission) des temps d’absence - rémunérés ou non - pour rechercher un emploi pendant le préavis. Il convient donc, sur ce point, de se reporter aux conventions ou aux accords collectifs applicables dans l’entreprise.</p>",
          references: [],
          title: "Et les heures pour recherche d’emploi ?",
        },
        {
          anchor: "Quelle-est-la-situation-du-salarie-a-la-fin-du-contrat",
          html: '<p>À l’issue du contrat de travail, lorsque le préavis est achevé, le salarié est libre de tout engagement vis-à-vis de son employeur. Toutefois, certaines obligations particulières peuvent encore s’appliquer&nbsp;: tel est le cas lorsque le contrat contient une clause de non-concurrence ou une clause de dédit-formation. Si elles ne sont pas abusives, ces clauses sont applicables.</p><p>L’employeur doit remettre au salarié les mêmes documents qu’à l’occasion d’un licenciement&nbsp;: certificat de travail, solde de tout compte, attestation destinée à permettre au salarié de faire valoir ses droits éventuels aux allocations d’assurance chômage (attestation «&nbsp;Pôle emploi&nbsp;»), état récapitulatif d’épargne salariale. Il doit également lui remettre, avec le dernier salaire, les diverses sommes qui lui sont, le cas échéant, encore dues&nbsp;: indemnité compensatrice de congés payés, indemnité compensatrice de préavis (en cas de dispense à l’initiative de l’employeur)…</p><blockquote class="spip"><p><strong>Démission et droit aux allocations de chômage</strong><br class="autobr">La démission n’ouvre pas droit à une indemnisation au titre de l’assurance chômage sauf si elle est considérée comme légitime&nbsp;: démission pour suivre son conjoint qui occupe un nouvel emploi, en cas de non-paiement des salaires…Toutefois, en cas de démission pour un motif autre que ceux considérés par le régime d’assurance chômage comme légitime, il est possible d’obtenir une indemnisation 4 mois après la fin du contrat de travail. Il faut pour cela être en mesure de prouver une recherche active d’emploi pendant ce délai et saisir l’instance paritaire régionale qui siège auprès de chaque direction régionale de Pôle emploi. Au vu des efforts fournis pour retrouver un emploi, cette instance décidera d’attribuer ou non les allocations, toutes les autres conditions étant par ailleurs remplies. <br class="autobr">En outre, pour les démissions intervenues à compter du 1er novembre 2019, un salarié démissionnaire peut également prétendre aux allocations d’assurance chômage dès lors qu’il justifie d’une certaine durée d’activité salariée antérieure et qu’il poursuit un projet de reconversion professionnelle, de création ou de reprise d’entreprise. <br class="autobr">Les dispositions qui précédent font l’objet d’une fiche spécifique, à laquelle <a href="https://travail-emploi.gouv.fr/droit-du-travail/la-rupture-du-contrat-de-travail/article/le-droit-aux-allocations-chomage-du-salarie-demissionnaire">on se reportera</a>.</p></blockquote>',
          references: [],
          title: "Quelle est la situation du salarié à la fin du contrat ?",
        },
        {
          anchor:
            "Le-salarie-peut-il-lt-lt-demissionner-dans-le-cadre-d-un-contrat-a-nbsp",
          html: '<p>Oui, mais à condition de justifier d’une embauche en contrat à durée indéterminée (CDI) et de respecter <a href="https://travail-emploi.gouv.fr/droit-du-travail/les-contrats-de-travail/article/le-contrat-de-travail-a-duree-indeterminee-cdi" class="spip_in" target="_blank" rel="nofollow, noopener">un préavis</a>. Il ne s’agit d’ailleurs pas d’une démission (ce terme étant réservé à la rupture par le salarié de son contrat à durée indéterminée), mais d’une rupture anticipée autorisée d’un CDD.</p><p>En dehors de ce cas, à la demande du salarié, l’employeur peut donner son accord à l’interruption du contrat avant le terme prévu. Les deux parties signent alors une rupture anticipée d’un commun accord. Mais si elle résulte d’une faute grave de l’employeur (non-versement des salaires…), la rupture du contrat par le salarié peut être requalifiée par le conseil de prud’hommes en rupture de contrat à la charge de l’employeur.<br class="autobr">Les titulaires de certains contrats à durée déterminée de type particulier (contrat d’accompagnement dans l’emploi, contrat initiative emploi) ont la faculté de mettre un terme à leur contrat de travail pour occuper un autre emploi, suivre une formation. Des possibilités de rupture anticipée du contrat d’apprentissage sont également prévues à l<a href="https://travail-emploi.gouv.fr/formation-professionnelle/formation-en-alternance-10751/apprentissage/contrat-apprentissage">’initiative de l’apprenti</a>.</p>',
          references: [],
          title:
            "Le salarié peut-il « démissionner » dans le cadre d’un contrat à durée déterminée ?",
        },
      ],
      slug: "la-demission",
      title: "La démission",
      url: "https://travail-emploi.gouv.fr/droit-du-travail/la-rupture-du-contrat-de-travail/article/la-demission",
    });
  });
});
