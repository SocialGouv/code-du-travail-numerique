import React, { useState } from "react";
import styled from "styled-components";
import { Accordion, List, ListItem, Modal, Toast } from "@cdt/ui-old";

import { Button, Container, Section, theme } from "@socialgouv/react-ui";

const Hierarchy = () => {
  const [isModal13MatieresOpen, setModal13MatieresOpen] = useState(false);
  const [isModal4MatieresOpen, setModal4MatieresOpen] = useState(false);
  const [isModalGarantiesOpen, setModalGarantiesOpen] = useState(false);
  return (
    <>
      <Section variant="white">
        <Container narrow>
          <h2>Existe-t-il une hiérarchie entre les textes ?</h2>
          <p>
            Le principe général en droit du travail est le suivant&nbsp;:
            lorsqu’il existe plusieurs textes sur un même sujet, c’est le texte
            le plus favorable au salarié qui s’applique. Ce principe continue a
            s’appliquer en droit du travail mais il connaît quelques exceptions.
          </p>
          <p>
            Pour vous aider à comprendre, vous trouverez ci-dessous un schèma
            récapitulant la hiérarchie des textes entre eux.
          </p>
        </Container>
        <Section>
          <Container narrow>
            <List>
              <Li>
                <NumberWrapper>
                  <Number>1</Number>
                </NumberWrapper>
                <HierarchyAccordion
                  items={[
                    {
                      title: <H3>Les textes internationaux et européens</H3>,
                      body: (
                        <>
                          Les textes situés plus bas doivent être conformes aux
                          textes internationaux et européens.
                        </>
                      )
                    }
                  ]}
                />
              </Li>
              <Li>
                <NumberWrapper>
                  <Number>2</Number>
                </NumberWrapper>
                <HierarchyAccordion
                  items={[
                    {
                      title: <H3>La Constitution</H3>,
                      body: (
                        <>
                          Les textes situés plus bas doivent être conformes à la
                          Constitution française ainsi qu’au bloc de
                          constitutionnalité.
                        </>
                      )
                    }
                  ]}
                />
              </Li>
              <Li>
                <NumberWrapper>
                  <Number>3</Number>
                </NumberWrapper>
                <HierarchyAccordion
                  items={[
                    {
                      title: (
                        <H3>Lois, ordonnances et décrets (Code du travail) </H3>
                      ),
                      body: (
                        <>
                          <h4>
                            Hiérarchie entre le Code du travail et les
                            conventions et accords collectifs
                          </h4>
                          <p>
                            Il n’y a pas de règle de hiérarchie unique pour tous
                            les articles du Code du travail. Il existe 3
                            hiérarchies possibles&nbsp;:
                          </p>
                          <Accordion
                            items={[
                              {
                                title: (
                                  <h5>
                                    Les conventions et accords collectifs
                                    doivent respecter le Code du travail
                                  </h5>
                                ),
                                body: (
                                  <>
                                    Il existe des règles dans le Code du travail
                                    que les conventions et accords collectifs
                                    doivent respecter. Les conventions et
                                    accords collectifs peuvent toutefois prévoir
                                    des mesures plus avantageuses pour le
                                    salarié. Dans ce cas, c’est le texte le plus
                                    avantageux pour le salarié qui s’applique.
                                  </>
                                )
                              },
                              {
                                title: (
                                  <h5>
                                    Les conventions et accords collectifs
                                    peuvent prévoir des mesures différentes que
                                    celles posées par le Code du travail.
                                  </h5>
                                ),
                                body: (
                                  <>
                                    <p>
                                      Il existe d’autres règles dans le Code du
                                      travail qui permettent aux conventions et
                                      accords collectifs, sous certaines
                                      conditions, de prévoir des règles
                                      différentes de celles de la loi. Dans ce
                                      cas, c’est l’accord collectif ou la
                                      convention collective qui s’applique même
                                      s’il est plus défavorable pour le salarié
                                      que la loi.
                                    </p>
                                    <i>
                                      Exemples&nbsp;:
                                      <ul>
                                        <li>
                                          Le taux de majoration des heures
                                          supplémentaires&nbsp;: un accord
                                          collectif peut prévoir dans une
                                          certaine limite un taux inférieur à
                                          25% (règle prévue par le Code du
                                          travail).
                                        </li>
                                        <li>
                                          Le congé sabbatique&nbsp;: un accord
                                          collectif peut prévoir une durée
                                          minimale et une durée maximale du
                                          congé sabbatique différente de ce que
                                          prévoit le code du travail.
                                        </li>
                                        <li>
                                          Les négociations obligatoires en
                                          entreprise&nbsp;: un accord
                                          d’entreprise peut prévoir une
                                          périodicité des négociations plus
                                          longue que ce que prévoit le Code du
                                          travail qui est principalement d’un
                                          an.
                                        </li>
                                      </ul>
                                    </i>
                                  </>
                                )
                              },
                              {
                                title: (
                                  <h5>
                                    En l’absence de convention ou d’accord
                                    collectif sur le sujet, le Code du travail
                                    s’applique
                                  </h5>
                                ),
                                body: (
                                  <>
                                    <p>
                                      Il existe également des règles dans le
                                      Code du travail qui s’appliquent par
                                      défaut, c’est-à-dire uniquement lorsqu’il
                                      n’y a pas de convention ou d’accord
                                      collectif sur le sujet. S’il existe une
                                      convention ou un accord collectif sur le
                                      sujet alors la loi ne s’applique pas.
                                    </p>
                                    <i>
                                      Exemples&nbsp;:
                                      <ul>
                                        <li>
                                          Congés exceptionnels&nbsp;: en
                                          l’absence d’accord collectif sur les
                                          congés exceptionnels, ce que prévoit
                                          le code du travail s’applique (4 jours
                                          pour mariage, 1 jour pour mariage d’un
                                          enfant, 5 jours pour le décès d’un
                                          enfant...)
                                        </li>
                                        <li>
                                          Taux de majoration des heures
                                          supplémentaires&nbsp;: en l’absence
                                          d’accord collectif sur le taux de
                                          majoration des heures supplémentaires
                                          s’applique le code du travail (25% de
                                          majoration pour les 8 premières heures
                                          et 50% pour les suivantes).
                                        </li>
                                        <li>
                                          Aménagement du temps de travail sur
                                          une période supérieure à la semaine
                                          &nbsp;: en l’absence d’accord
                                          collectif sur l’aménagement du temps
                                          de travail, le code du travail
                                          s’applique. L’employeur peut aménager
                                          le temps de travail sur une période de
                                          9 semaines pour les entreprises de
                                          moins de 50 salariés.
                                        </li>
                                      </ul>
                                    </i>
                                  </>
                                )
                              }
                            ]}
                          />
                          <h4>
                            Attention à certaines règles du Code du travail !
                          </h4>
                          <p>
                            Il existe des règles du Code du travail auxquelles
                            tous les textes situés en bas ne peuvent pas déroger
                            même si les textes sont plus avantageux pour le
                            salarié. La loi interdit toute dérogation possible.
                            Les textes situés en bas doivent purement et
                            simplement respecter ces règles.
                          </p>
                          <p>
                            <i>
                              Exemple&nbsp;: la règle selon laquelle le Conseil
                              des prud’hommes est le seul compétent pour les
                              contentieux liés au travail.
                            </i>
                          </p>
                        </>
                      )
                    }
                  ]}
                />
              </Li>
              <Li>
                <NumberWrapper>
                  <Number>4</Number>
                </NumberWrapper>
                <HierarchyAccordion
                  items={[
                    {
                      title: <H3>Les conventions et accords collectifs</H3>,
                      body: (
                        <>
                          <h4>
                            Hiérarchie entre conventions et accords collectifs
                            de niveaux différents
                          </h4>
                          <p>
                            La règle qui détermine quel est le texte applicable
                            est différente en fonction du niveau des textes
                            comparés.
                          </p>
                          <h5>
                            Hiérarchie entre accord de branche et accord
                            d’entreprise
                          </h5>
                          <p>
                            Le principe est que l’accord d’entreprise s’applique
                            en priorité par rapport à l’accord ou la convention
                            de branche même si, l’accord d’entreprise est plus
                            désavantageux pour le salarié que l’accord de
                            branche.
                          </p>
                          <Toast variant="warning">
                            Le principe ne s’applique pas dans{" "}
                            <Button
                              variant="link"
                              onClick={() => setModal13MatieresOpen(true)}
                            >
                              13 matières
                            </Button>{" "}
                            où la loi reconnait la primauté à l’accord de
                            branche et{" "}
                            <Button
                              variant="link"
                              onClick={() => setModal4MatieresOpen(true)}
                            >
                              4 matières
                            </Button>{" "}
                            où la branche elle même peut reconnaitre sa
                            primauté, sauf si l’accord d’entreprise a{" "}
                            <Button
                              variant="link"
                              onClick={() => setModalGarantiesOpen(true)}
                            >
                              des garanties au moins équivalentes
                            </Button>
                            .
                          </Toast>
                          <p>
                            Ces règles sont les mêmes pour la hiérarchie entre
                            accord de branche et accord de groupe et entre
                            accord de branche et accord d’établissement.
                          </p>
                          <h5>
                            Hiérarchie entre accord de groupe et accord
                            d’entreprise
                          </h5>
                          <p>
                            L’accord de groupe s’applique en priorité par
                            rapport à l’accord d’entreprise ou l’accord
                            d’établissement si l’accord de groupe l’indique dans
                            son accord. Si rien n’est indiqué dans l’accord de
                            groupe alors l’accord le plus avantageux pour le
                            salarié s’applique.
                          </p>
                          <h5>
                            Hiérarchie entre accord d’entreprise et accord
                            d’établissement
                          </h5>
                          <p>
                            L’accord d’entreprise s’applique en priorité par
                            rapport à l’accord d’établissement si l’accord
                            d’entreprise l’indique dans son accord. Si rien
                            n’est indiqué dans l’accord d’entreprise alors
                            l’accord le plus avantageux pour le salarié
                            s’applique.
                          </p>
                        </>
                      )
                    }
                  ]}
                />
              </Li>
              <Li>
                <NumberWrapper>
                  <Number>5</Number>
                </NumberWrapper>
                <HierarchyAccordion
                  items={[
                    {
                      title: (
                        <H3>Les usages et les engagements unilatériaux</H3>
                      ),
                      body: (
                        <>
                          Les usages et les engagements unilatéraux doivent
                          respecter les textes situés en haut. Ils peuvent être
                          plus avantageux pour le salarié. Dans ce cas, ce sont
                          les textes les plus avantageux qui s’appliquent.
                        </>
                      )
                    }
                  ]}
                />
              </Li>
              <Li>
                <NumberWrapper>
                  <Number>6</Number>
                </NumberWrapper>
                <HierarchyAccordion
                  items={[
                    {
                      title: <H3>Le réglement intérieur de l’entreprise</H3>,
                      body: (
                        <>
                          Le règlement intérieur doit respecter les textes
                          situés en haut. Il peut être plus avantageux pour le
                          salarié. Dans ce cas, c’est le texte le plus
                          avantageux pour le salarié qui s’applique.
                        </>
                      )
                    }
                  ]}
                />
              </Li>
              <Li>
                <NumberWrapper>
                  <Number>7</Number>
                </NumberWrapper>
                <HierarchyAccordion
                  items={[
                    {
                      title: <H3>Le contrat de travail</H3>,
                      body: (
                        <>
                          Le contrat de travail doit respecter les textes situés
                          en haut. Il peut prévoir des mesures plus avantageuses
                          pour le salarié. Dans ce cas, c’est le contrat de
                          travail qui s’applique.
                        </>
                      )
                    }
                  ]}
                />
              </Li>
            </List>
          </Container>
        </Section>
      </Section>
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
            <li>Egalité professionnelle </li>
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
      <Modal
        isOpen={isModalGarantiesOpen}
        onDismiss={() => setModalGarantiesOpen(false)}
      >
        <NoMarginContainer>
          <p>
            Si l’accord d’entreprise assure des garanties au moins équivalentes,
            c’est-à-dire qu’il “fait aussi bien”, que la branche dans une des 17
            matières alors il s’applique en priorité par rapport à la convention
            ou l’accord de branche.
            <br />
            Pour cela, il faut comparer par matière (exemple, égalité
            professionnelle) les mesures prévues par l’accord d’entreprise et
            les mesures prévues par l’accord de branche.
          </p>
          <p>
            Dans la matière en question, les mesures prévues par l’accord
            d’entreprise doivent avoir au global la même valeur pour la
            collectivité des salariés que les mesures prévues par l’accord de
            branche. La collectivités des salariés ne doit pas y perdre.
          </p>
        </NoMarginContainer>
      </Modal>
    </>
  );
};

export default Hierarchy;

const { breakpoints, colors, fonts, spacing } = theme;

const Li = styled(ListItem)`
  position: relative;
  display: flex;
  align-items: stretch;
  @media (max-width: ${breakpoints.tablet}) {
    flex-flow: column;
    margin-top: ${spacing.interComponent};
  }
`;

const NumberWrapper = styled.div`
  position: absolute;
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  left: -70px;
  height: 100%;
  @media (max-width: ${breakpoints.tablet}) {
    position: relative;
    left: 0;
  }
  &:before {
    content: "";
    position: absolute;
    left: 50%;
    width: 1px;
    height: 100%;
    background-color: ${colors.lightGrey};
    @media (max-width: ${breakpoints.tablet}) {
      display: none;
    }
  }
`;

const Number = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 3rem;
  height: 3rem;
  color: ${colors.white};
  font-size: ${fonts.sizeH4};
  font-weight: bold;
  background-color: ${colors.blueDark};
  border-radius: 50%;
`;

const HierarchyAccordion = styled(Accordion)`
  flex: 1 1 auto;
  padding: ${spacing.small} 0;
`;

const H3 = styled.h3`
  margin: ${spacing.small} ${spacing.base};
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
    margin-left: ${spacing.interComponent};
    @media (max-width: ${breakpoints.mobile}) {
      margin-left: 0;
    }
  }
`;

const NoMarginContainer = styled.div`
  & > *:first-child {
    margin-top: 0;
  }
  & > *:last-child {
    margin-bottom: 0;
  }
`;
