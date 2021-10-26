import {
  Accordion,
  Container,
  icons,
  Section,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React from "react";
import styled from "styled-components";

import { A11yLink } from "../common/A11yLink";

const Origins = () => (
  <Section
    variant="light"
    decorated
    innerTopContent={
      <>
        <Title isFirst>
          Quels sont les textes à l’origine du droit du travail&nbsp;?
        </Title>
        <StyledP>
          Le droit du travail est construit par de nombreux textes juridiques
          dont les sources sont diverses&nbsp;: sources internationales, sources
          européennes et sources nationales. Vous trouverez les textes
          participant à la construction du droit du travail en France
          ci-dessous.
        </StyledP>
      </>
    }
  >
    <Container>
      <FlexWrapper>
        <Accordion
          titleLevel={3}
          variant="tile"
          items={[
            {
              body: (
                <>
                  <p>
                    Le droit du travail en France est influencé par les textes
                    de{" "}
                    <A11yLink
                      href="https://www.ilo.org/global/lang--fr/index.htm"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      l’Organisation internationale du travail
                    </A11yLink>{" "}
                    (OIT), agence des Nations Unies pour le monde du travail.
                    L’OIT rédige des recommandations et des conventions.
                  </p>
                  <p>
                    Les conventions de l’OIT sont les principaux textes qui ont
                    un effet sur le droit du travail français. Ces conventions
                    traitent de nombreux sujets comme le travail des enfants,
                    les activités syndicales, le travail forcé, l’emploi, le
                    chômage, la rémunération, le rôle de l’inspection du
                    travail.
                  </p>
                  <p>
                    <i>
                      Exemple de convention&nbsp;:{" "}
                      <A11yLink
                        href="https://www.ilo.org/dyn/normlex/fr/f?p=NORMLEXPUB:12100:0::NO::P12100_ILO_CODE:C158"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        la Convention n°158 de l’OIT sur le licenciement
                      </A11yLink>
                      .
                    </i>
                  </p>
                  <p>
                    Il existe également d’autres traités internationaux qui ont
                    une influence sur le droit du travail français.
                  </p>
                  <p>
                    <i>
                      Exemples&nbsp;:{" "}
                      <A11yLink
                        href="https://www.ohchr.org/fr/professionalinterest/pages/ccpr.aspx"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        Le Pacte international relatif aux droits civils et
                        politiques de 1966
                      </A11yLink>{" "}
                      et{" "}
                      <A11yLink
                        href="https://www.ohchr.org/FR/ProfessionalInterest/Pages/CESCR.aspx"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        le Pacte international relatif aux droits économiques,
                        sociaux et culturels de 1966
                      </A11yLink>
                      .
                    </i>
                  </p>
                </>
              ),
              icon: icons.International,
              title: "Les textes internationaux",
            },
            {
              body: (
                <>
                  <p>
                    Le droit du travail français est influencé par{" "}
                    <A11yLink
                      href="https://europa.eu/european-union/index_fr"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      l’Union Européenne
                    </A11yLink>{" "}
                    et par{" "}
                    <A11yLink
                      href="https://www.coe.int/fr/"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      le Conseil de l’Europe
                    </A11yLink>
                    .
                  </p>
                  <p>
                    L’Union Européenne élabore différents types de textes&nbsp;:
                  </p>
                  <ul>
                    <li>des traités</li>
                    <li>des règlements</li>
                    <li>des directives</li>
                    <li>
                      des accords collectifs européens négociés par{" "}
                      <A11yLink
                        href="https://www.etuc.org/fr"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        la Confédération européenne des syndicats (CES)
                      </A11yLink>
                      ,{" "}
                      <A11yLink
                        href="https://www.businesseurope.eu/"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        Business Europe
                      </A11yLink>{" "}
                      et{" "}
                      <A11yLink
                        href="https://www.ceep.eu/"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        le Centre européen des entreprises à participation
                        publique
                      </A11yLink>{" "}
                      (CEEP)
                    </li>
                  </ul>
                  <p>
                    Le Conseil de l’Europe, organisation intergouvernementale
                    distincte de l’Union Européenne, a adopté 2 textes
                    importants en droit du travail&nbsp;:
                  </p>
                  <ul>
                    <li>
                      <A11yLink
                        href="https://www.echr.coe.int/Pages/home.aspx?p=basictexts&c=fre"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        La Convention européenne de sauvegarde des droits de
                        l’Homme et des libertés fondamentales
                      </A11yLink>{" "}
                      qui évoque des droits civils et politiques comme par
                      exemple la liberté syndicale, l’interdiction du travail
                      forcé, des discriminations, le respect de la vie privée et
                      familiale.
                    </li>
                    <li>
                      <A11yLink
                        href="https://www.coe.int/en/web/european-social-charter"
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                      >
                        La Charte sociale européenne
                      </A11yLink>{" "}
                      qui concerne les droits sociaux et économiques dans les
                      domaines notamment de l’emploi et des conditions de
                      travail.
                    </li>
                  </ul>
                </>
              ),
              icon: icons.Eurotext,
              title: "Les textes européens",
            },
            {
              body: (
                <>
                  <p>
                    Texte le plus important du système juridique français,{" "}
                    <A11yLink
                      href="https://www.conseil-constitutionnel.fr/le-bloc-de-constitutionnalite/texte-integral-de-la-constitution-du-4-octobre-1958-en-vigueur"
                      target="_blank"
                      rel="noopener noreferrer nofollow"
                    >
                      la Constitution du 4 octobre 1958
                    </A11yLink>{" "}
                    est le texte fondateur de la Vème République. La
                    Constitution a pour objectif d’organiser les pouvoirs
                    publics, de définir leur rôle et leurs relations entre eux.
                  </p>
                  <p>
                    Dans son préambule la Constitution de 1958 renvoie
                    explicitement à 3 autres textes fondamentaux&nbsp;:{" "}
                    <A11yLink
                      href="https://www.conseil-constitutionnel.fr/le-bloc-de-constitutionnalite/declaration-des-droits-de-l-homme-et-du-citoyen-de-1789"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      la Déclaration des Droits de l’Homme et du Citoyen de 1789
                    </A11yLink>
                    ,{" "}
                    <A11yLink
                      href="https://www.conseil-constitutionnel.fr/le-bloc-de-constitutionnalite/preambule-de-la-constitution-du-27-octobre-1946"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      le Préambule de la Constitution du 27 octobre 1946
                    </A11yLink>{" "}
                    et{" "}
                    <A11yLink
                      href="https://www.conseil-constitutionnel.fr/le-bloc-de-constitutionnalite/charte-de-l-environnement-de-2004"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      la Charte de l’environnement de 2004
                    </A11yLink>
                    .
                  </p>
                  <p>
                    Ces textes, qui forment le bloc de constitutionnalité,
                    énoncent des principes fondamentaux en droit du travail
                    comme par exemple l’égalité entre les femmes et les hommes,
                    le droit à la protection de la santé, le droit à être
                    représenté par des délégués, la liberté syndicale, le droit
                    de grève, le droit à une formation professionnelle, le droit
                    d’obtenir un emploi et l’absence de discrimination.
                  </p>
                </>
              ),
              icon: icons.Constitution,
              title: "La Constitution française",
            },
            {
              body: (
                <>
                  <p>
                    La loi est votée par le Parlement et fixe les principes
                    fondamentaux du droit du travail et de la sécurité sociale.
                  </p>
                  <p>
                    L’ordonnance est un texte écrit par le Gouvernement après
                    que le Parlement l’y ait autorisé. L’ordonnance a valeur de
                    loi lorsque le Parlement l’approuve en votant une loi de
                    ratification. Si le Parlement n’approuve pas l’ordonnance
                    alors l’ordonnance n’est plus applicable.
                  </p>
                  <p>
                    Le décret est un texte adopté par le Président de la
                    République ou le Premier ministre. Généralement en droit du
                    travail, les décrets viennent préciser une loi.
                  </p>
                  <p>
                    L’essentiel des lois, des ordonnances et des décrets en
                    droit du travail se trouve dans le Code du travail. Il
                    existe des règles applicables en droit du travail qui se
                    trouvent dans d’autres codes que le Code du travail comme
                    par exemple le Code civil, le Code de l’action sociale ou le
                    Code de la sécurité sociale, le code des transports ou le
                    code rural et de la pêche maritime.
                  </p>
                  <p>
                    L’arrêté est un texte pris par une autorité administrative
                    autre que le Président de la République et le Premier
                    Ministre : il peut ainsi être pris par les ministres, les
                    préfets, les maires…
                  </p>
                  <p>
                    <i>
                      Exemple&nbsp;: arrêté préfectoral déterminant la zone
                      touristique permettant l’ouverture le dimanche ou arrêté
                      ministériel fixant le modèle de l’avis d’inaptitude.
                    </i>
                  </p>
                </>
              ),
              icon: icons.Laws,
              title: "Lois, ordonnances, décrets et arrêtés",
            },
            {
              body: (
                <>
                  <p>
                    Les conventions et accords collectifs de travail sont des
                    textes négociés entre un ou plusieurs employeurs et un ou
                    plusieurs syndicats de salariés.
                  </p>
                  <p>
                    La différence entre les deux textes vient de leur contenu.
                    La convention collective porte sur l’ensemble des conditions
                    d’emploi, de travail et des garanties sociales des salariés.
                    L’accord collectif concerne un seul ou quelques thèmes des
                    conditions d’emploi, de travail et des garanties sociales
                    des salariés.
                  </p>
                  <p>
                    Ces textes peuvent être conclus à différents niveaux&nbsp;:
                    au niveau interprofessionnel, au niveau d’une branche
                    professionnelle, au niveau d’un groupe, au niveau d’une
                    entreprise ou au niveau d’un établissement.
                  </p>
                </>
              ),
              icon: icons.Agreement,
              title: "Les conventions et accords collectifs",
            },
            {
              body: (
                <>
                  <p>
                    L’usage d’entreprise est une pratique répétée de l’employeur
                    attribuant un avantage aux salariés ou à un groupe de
                    salariés de l’entreprise sans que la loi, la convention
                    collective ou le contrat de travail ne le lui impose.
                  </p>
                  <p>
                    Il existe également des usages au niveau de certaines
                    professions ou de certaines localités.
                  </p>
                  <p>
                    L’engagement unilatéral de l’employeur est un engagement
                    écrit de l’employeur d’accorder un avantage aux salariés.
                  </p>
                  <p>
                    <i>
                      Exemples&nbsp;: on peut trouver de tels engagements dans
                      une note de service, un procès-verbal de désaccord…
                    </i>
                  </p>
                </>
              ),
              icon: icons.Uses,
              title: "Les usages et les engagements unilatéraux",
            },
            {
              body: (
                <>
                  Le règlement intérieur de l’entreprise est un acte écrit par
                  l’employeur qui fixe les règles concernant la discipline, la
                  santé et la sécurité dans l’entreprise.
                </>
              ),
              icon: icons.Rules,
              title: "Le règlement intérieur de l’entreprise",
            },
            {
              body: (
                <>
                  <p>
                    Le contrat de travail existe dès l’instant où une personne
                    (le salarié) s’engage à travailler, moyennant rémunération,
                    pour le compte et sous la direction d’une autre personne
                    (l’employeur).
                  </p>
                  <p>
                    Le contrat de travail doit en général être écrit. Il précise
                    la rémunération, la qualification, la durée du travail et,
                    plus généralement, les attributions du salarié.
                  </p>
                  <p>
                    Il entraîne un certain nombre d’obligations, tant pour le
                    salarié que pour l’employeur.
                  </p>
                  <p>
                    Il existe différents types de contrat de travail selon leur
                    durée, l’activité de l’employeur ou la nature du travail
                    confié au salarié.
                  </p>
                </>
              ),
              icon: icons.Contract,
              title: "Le contrat de travail",
            },
          ]}
        />
      </FlexWrapper>
      <Container narrow noPadding>
        <StyledWrapper variant="light">
          La jurisprudence de la Cour Européenne des droits de l’Homme, de la
          Cour de justice de l’Union européenne, du Conseil Constitutionnel, du
          Conseil d’Etat et de la Cour de cassation influence également le droit
          du travail en France.
        </StyledWrapper>
      </Container>
    </Container>
  </Section>
);

export default Origins;

const { breakpoints, spacings } = theme;

const StyledP = styled.p`
  max-width: 76rem;
`;

const FlexWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  margin-top: ${spacings.larger};
  margin-bottom: ${spacings.larger};
  @media (max-width: ${breakpoints.tablet}) {
    flex-wrap: wrap;
  }
`;

const StyledWrapper = styled(Wrapper)`
  max-width: 66rem;
`;
