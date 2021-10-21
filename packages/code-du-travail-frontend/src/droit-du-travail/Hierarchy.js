import {
  Accordion,
  Button,
  Container,
  Heading,
  icons,
  IconStripe,
  InsertTitle,
  Modal,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import React, { useState } from "react";
import styled from "styled-components";

const Hierarchy = ({ hash }) => {
  const [isModal13MatieresOpen, setModal13MatieresOpen] = useState(false);
  const [isModal4MatieresOpen, setModal4MatieresOpen] = useState(false);
  return (
    <Container narrow>
      <Title>Existe-t-il une hiérarchie entre les textes ?</Title>
      <p>
        Le principe général en droit du travail est le suivant&nbsp;: lorsqu’il
        existe plusieurs textes sur un même sujet, c’est le texte le plus
        favorable au salarié qui s’applique. Ce principe continue a s’appliquer
        en droit du travail mais il connaît quelques exceptions.
      </p>
      <p>
        Pour vous aider à comprendre, vous trouverez ci-dessous un schèma
        récapitulant <strong>la hiérarchie des textes entre eux</strong>.
      </p>
      <Accordion
        preExpanded={[hash]}
        titleLevel={3}
        variant="hierarchy"
        items={[
          {
            body: (
              <>
                Les textes nationaux doivent être conformes aux textes
                internationaux et européens.
              </>
            ),
            icon: icons.International,
            title: "Les textes internationaux et européens",
          },
          {
            body: (
              <>
                Tous les textes nationaux doivent être conformes à la
                Constitution française ainsi qu’au bloc de constitutionnalité.
              </>
            ),
            icon: icons.Constitution,
            title: "La Constitution",
          },
          {
            body: (
              <>
                <Heading as="h4">
                  Hiérarchie entre le Code du travail et les conventions et
                  accords collectifs
                </Heading>
                <p>
                  Il n’y a pas de règle de hiérarchie unique pour tous les
                  articles du Code du travail. Il existe 3 hiérarchies
                  possibles&nbsp;:
                </p>
                <StyledAccordion
                  titleLevel={5}
                  items={[
                    {
                      body: (
                        <>
                          Il existe des règles dans le Code du travail que les
                          conventions et accords collectifs doivent respecter.
                          Les conventions et accords collectifs peuvent
                          toutefois prévoir des mesures plus avantageuses pour
                          le salarié. Dans ce cas, c’est le texte le plus
                          avantageux pour le salarié qui s’applique.
                        </>
                      ),
                      title:
                        "Les conventions et accords collectifs doivent respecter le Code du travail",
                    },
                    {
                      body: (
                        <>
                          <p>
                            Il existe d’autres règles dans le Code du travail
                            qui permettent aux conventions et accords
                            collectifs, sous certaines conditions, de prévoir
                            des règles différentes de celles de la loi. Dans ce
                            cas, c’est l’accord collectif ou la convention
                            collective qui s’applique même s’il est plus
                            défavorable pour le salarié que la loi.
                          </p>
                          <i>
                            Exemple&nbsp;:
                            <ul>
                              <li>
                                le taux de majoration des heures
                                supplémentaires. Un accord collectif peut
                                prévoir dans une certaine limite un taux
                                inférieur à 25% (règle prévue par le Code du
                                travail).
                              </li>
                            </ul>
                          </i>
                        </>
                      ),
                      title:
                        "Les conventions et accords collectifs peuvent prévoir des mesures différentes que celles posées par le Code du travail",
                    },
                    {
                      body: (
                        <>
                          <p>
                            Il existe également des règles dans le Code du
                            travail qui s’appliquent par défaut, c’est-à-dire
                            uniquement lorsqu’il n’y a pas de convention ou
                            d’accord collectif sur le sujet. S’il existe une
                            convention ou un accord collectif sur le sujet alors
                            la loi ne s’applique pas.
                          </p>
                          <i>
                            Exemple&nbsp;:
                            <ul>
                              <li>
                                le taux de majoration des heures
                                supplémentaires. En l’absence d’accord collectif
                                sur le taux de majoration des heures
                                supplémentaires s’applique le code du travail
                                (25% de majoration pour les 8 premières heures
                                et 50% pour les suivantes).
                              </li>
                            </ul>
                          </i>
                        </>
                      ),
                      title:
                        "En l’absence de convention ou d’accord collectif sur le sujet, le Code du travail s’applique",
                    },
                  ]}
                />
                <Wrapper variant="light">
                  <IconStripe icon={icons.Warning}>
                    <InsertTitle as="h4">
                      Attention à certaines règles du Code du travail
                    </InsertTitle>
                    <StyledP>
                      Il existe des règles du Code du travail auxquelles tous
                      les textes situés en bas ne peuvent pas déroger même si
                      les textes sont plus avantageux pour le salarié. La loi
                      interdit toute dérogation possible. Les textes situés en
                      bas doivent purement et simplement respecter ces règles.
                    </StyledP>
                    <StyledP>
                      <i>
                        Exemple&nbsp;: la règle selon laquelle le Conseil des
                        prud’hommes est le seul compétent pour les contentieux
                        liés au travail.
                      </i>
                    </StyledP>
                  </IconStripe>
                </Wrapper>
              </>
            ),
            icon: icons.Laws,
            title: "Lois, ordonnances et décrets (Code du travail)",
          },
          {
            body: (
              <>
                <p>
                  La règle qui détermine quel est le texte applicable est
                  différente en fonction du niveau des textes comparés.
                </p>
                <Heading as="h4">
                  Hiérarchie entre convention collective de branche et accord
                  d’entreprise
                </Heading>
                <p>
                  Le principe est que l’accord d’entreprise s’applique en
                  priorité par rapport à l’accord ou la convention collective de
                  branche. Cela signifie que même si l’accord d’entreprise
                  prévoit des règles différentes, voire plus désavantageuses,
                  que la convention collective de branche, ce sera lui qui
                  s’appliqura au salarié et non la convention collective de
                  branche.
                </p>
                <Wrapper variant="light">
                  <IconStripe icon={icons.Warning}>
                    Ce principe ne s’applique pas dans{" "}
                    <Button
                      variant="link"
                      onClick={() => setModal13MatieresOpen(true)}
                    >
                      13 matières
                    </Button>{" "}
                    où la loi reconnaît la primauté à la convention collective
                    de branche et{" "}
                    <Button
                      variant="link"
                      onClick={() => setModal4MatieresOpen(true)}
                    >
                      4 matières
                    </Button>{" "}
                    où la branche elle-même peut reconnaître sa primauté, sauf
                    si l’accord d’entreprise a des garanties au moins
                    équivalentes.
                  </IconStripe>
                </Wrapper>
                <p>
                  Ces règles sont les mêmes pour la hiérarchie entre convention
                  collective de branche et accord de groupe ou accord
                  d’établissement.
                </p>
                <Heading as="h4">
                  Hiérarchie entre accord de groupe et accord d’entreprise
                </Heading>
                <p>
                  L’accord de groupe s’applique en priorité par rapport à
                  l’accord d’entreprise ou l’accord d’établissement si l’accord
                  de groupe l’indique dans son accord. Si rien n’est indiqué
                  dans l’accord de groupe alors l’accord le plus avantageux pour
                  le salarié s’applique.
                </p>
                <Heading as="h4">
                  Hiérarchie entre accord d’entreprise et accord d’établissement
                </Heading>
                <p>
                  L’accord d’entreprise s’applique en priorité par rapport à
                  l’accord d’établissement si l’accord d’entreprise l’indique
                  dans son accord. Si rien n’est indiqué dans l’accord
                  d’entreprise alors l’accord le plus avantageux pour le salarié
                  s’applique.
                </p>
              </>
            ),
            icon: icons.Agreement,
            id: "hierarchie",
            title: "Les conventions et accords collectifs",
          },
          {
            body: (
              <>
                Les usages et les engagements unilatéraux doivent respecter les
                textes situés en haut. Ils peuvent être plus avantageux pour le
                salarié. Dans ce cas, ce sont les textes les plus avantageux qui
                s’appliquent.
              </>
            ),
            icon: icons.Uses,
            title: "Les usages et les engagements unilatéraux",
          },
          {
            body: (
              <>
                Le règlement intérieur doit respecter les textes situés en haut.
                Il peut être plus avantageux pour le salarié. Dans ce cas, c’est
                le texte le plus avantageux pour le salarié qui s’applique.
              </>
            ),
            icon: icons.Rules,
            title: "Le règlement intérieur de l’entreprise",
          },
          {
            body: (
              <>
                Le contrat de travail doit respecter les textes situés en haut.
                Il peut prévoir des mesures plus avantageuses pour le salarié.
                Dans ce cas, c’est le contrat de travail qui s’applique.
              </>
            ),
            icon: icons.Contract,
            title: "Le contrat de travail",
          },
        ]}
      />
      <Modal
        isOpen={isModal13MatieresOpen}
        onDismiss={() => setModal13MatieresOpen(false)}
      >
        <ListContainer>
          <Ul>
            <li>
              Salaires <strong>minima</strong>
            </li>
            <li>Classifications</li>
            <li>Mutualisation des fonds de financement du paritarisme</li>
            <li>Mutualisation des fonds de la formation professionnelle</li>
            <li>Protection sociale complémentaire</li>
            <li>Durée du travail (certaines mesures seulement)</li>
            <li>
              CDD et contrats de travail temporaire (durée totale,
              renouvellement, délai de carence et délai de transmission des
              contrats)
            </li>
          </Ul>
          <Ul>
            <li> CDI de chantier</li>
            <li>Egalité professionnelle</li>
            <li>
              Conditions et durées de renouvellement de la période d’essai
            </li>
            <li>
              Transfert des contrats de travail en cas de changement de
              prestataire
            </li>
            <li>
              2 cas de mise à disposition d’un salarié temporaire auprès d’une
              entreprise utilisatrice
            </li>
            <li>
              Rémunération minimale du salarié porté et montant de l’indemnité
              d’apport d’affaire
            </li>
          </Ul>
        </ListContainer>
      </Modal>
      <Modal
        isOpen={isModal4MatieresOpen}
        onDismiss={() => setModal4MatieresOpen(false)}
      >
        <ListContainer>
          <Ul>
            <li>
              La prévention des effets de l’exposition aux facteurs de risques
              professionnels
            </li>
            <li>
              L’insertion professionnelle et le maintien dans l’emploi des
              travailleurs handicapés
            </li>
          </Ul>
          <Ul>
            <li>
              Seuil de désignation, nombre et valorisation des parcours
              syndicaux des délégués syndicaux
            </li>
            <li>Les primes pour travaux dangereux ou insalubres</li>
          </Ul>
        </ListContainer>
      </Modal>
    </Container>
  );
};

export default Hierarchy;

const { breakpoints, spacings } = theme;

const StyledP = styled.p`
  margin: ${spacings.small} 0 0 0;
`;

const StyledAccordion = styled(Accordion)`
  margin-bottom: ${spacings.xmedium};
`;

const ListContainer = styled.div`
  display: flex;
  @media (max-width: ${breakpoints.mobile}) {
    display: block;
  }
`;

const Ul = styled.ul`
  flex: 1 1 50%;
  margin: 0;

  & + & {
    margin-left: ${spacings.medium};
    @media (max-width: ${breakpoints.mobile}) {
      margin-left: 0;
    }
  }
`;
