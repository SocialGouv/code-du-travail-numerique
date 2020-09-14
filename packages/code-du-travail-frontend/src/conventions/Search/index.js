import {
  Button,
  Heading,
  Input,
  Label,
  Modal,
  MoreContent,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import debounce from "debounce-promise";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";
import { v4 as generateUUID } from "uuid";

import { ServiceRenseignementModal } from "../../common/ServiceRenseignementModal";
import { matopush } from "../../piwik";
import { CompanyTile } from "./CompanyTile";
import { ConventionLink } from "./ConventionLink";
import { ResultList } from "./ResultList";
import useSearchCC from "./searchHook";

const trackInput = debounce((query, path, trackingUID) => {
  if (query.length > 1) {
    matopush(["trackEvent", "cc_search", path, `${trackingUID} : ${query}`]);
  }
}, 2000);

const Search = ({ onSelectConvention }) => {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [trackingUID, setTrackingUID] = useState("");

  useEffect(() => {
    // we want to connect events that are
    // related so we only generate an uuid on mount
    setTrackingUID(generateUUID());
  }, []);

  const onInputChange = (keyEvent) => {
    const value = keyEvent.target.value;
    trackInput(value, router.asPath, trackingUID);
    setQuery(value);
  };

  const [status, { conventions = [], entreprises = [] } = {}] = useSearchCC(
    query
  );

  return (
    <>
      <Label htmlFor="convention-search">
        Renseignez le nom de votre convention collective, le nom de votre
        entreprise, son SIRET ou son SIREN.
      </Label>
      <BlockInput
        role="search"
        placeholder="Nom de la convention collective, de l’entreprise, son SIRET ou son SIREN"
        value={query}
        type="search"
        name="q"
        id="convention-search"
        onChange={onInputChange}
      />
      {query && (
        <ResultsContainer>
          {status === "loading" && (
            <div>
              <Spinner /> Recherche des convention collectives...
            </div>
          )}
          {status === "error" && (
            <div>Le service de recherche est indisponible.</div>
          )}
          {status === "empty" && <div>Aucun résultat n’a été trouvé.</div>}
          {status === "success" && (
            <>
              {conventions.length !== 0 && (
                <ResultList
                  buttonLabel={"Voir plus de conventions collectives "}
                  title="CONVENTIONS COLLECTIVES"
                  query={query}
                  items={conventions.map((convention, index) => (
                    <ConventionLink
                      convention={convention}
                      isFirst={index === 0}
                      key={convention.slug}
                      onClick={onSelectConvention}
                    />
                  ))}
                />
              )}
              {entreprises.length !== 0 && (
                <ResultList
                  buttonLabel={"Voir plus d’entreprises"}
                  title="ENTREPRISES"
                  query={query}
                  items={entreprises.map((entreprise) => (
                    <CompanyTile
                      {...entreprise}
                      key={entreprise.siret}
                      onClick={onSelectConvention}
                    />
                  ))}
                />
              )}
            </>
          )}
        </ResultsContainer>
      )}
      <P>
        Vous ne connaissez pas ou ne trouvez pas votre convention
        collective&nbsp;?
        <Span>
          Consultez{" "}
          <HelpModal>
            {(openModal) => (
              <HelpButton
                variant="navLink"
                onClick={() => {
                  openModal();
                }}
              >
                notre aide
              </HelpButton>
            )}
          </HelpModal>
          .
        </Span>
      </P>
    </>
  );
};

const { spacings } = theme;
const BlockInput = styled(Input)`
  width: 100%;
`;

const P = styled.p`
  margin-top: ${spacings.xmedium};
`;

const Span = styled.span`
  display: block;
  margin-top: ${spacings.base};
`;

const HelpButton = styled(Button)`
  color: ${theme.colors.secondary};
  text-decoration: underline;
`;

const ResultsContainer = styled.div`
  margin-top: ${spacings.medium};
`;

export default Search;

const HelpModal = ({ children: renderProp }) => {
  const [isHelpModalVisible, setModalVisibility] = useState(false);
  const openHelpModal = useCallback(() => {
    setModalVisibility(true);
  }, []);

  const closeHelpModal = useCallback(() => {
    setModalVisibility(false);
  }, []);
  return (
    <>
      {renderProp(openHelpModal)}
      <Modal
        isOpen={isHelpModalVisible}
        onDismiss={closeHelpModal}
        title="Aide à la recherche d’une convention collective"
      >
        <Title unstriped as="h3">
          Qu’est-ce qu’une convention collective&nbsp;?
        </Title>
        <p>
          Une convention collective est un texte conclu au niveau d’une{" "}
          <strong>branche d’activité</strong> (Ex : la banque, les hôtels,
          cafés, restaurants…) entre les organisations syndicales de salariés et
          d’employeurs.
        </p>
        <p>
          Connaître sa convention collective est <strong>important</strong>.
          Elle adapte les règles du code du travail aux situations particulières
          de la branche s’agissant des conditions d’emploi et de travail des
          salariés et de leurs garanties sociales (
          <strong>
            primes, congés, salaires minima, préavis, prévoyance santé…
          </strong>
          ).
        </p>
        <Title unstriped as="h3">
          Où trouver le nom de sa convention collective&nbsp;?
        </Title>

        <Heading as="h4">Vérifiez dans la fiche de paie</Heading>
        <p>
          La convention collective doit être mentionnée sur la fiche de paie du
          salarié. Elle est généralement écrite en haut à gauche ou en bas à
          gauche de la fiche.
          <MoreContent title="Voir l’exemple" noLeftPadding>
            <Img
              src="/static/assets/img/bulletin-cc.png"
              alt="Exemple type d’un bulletin de paie avec deux loupes rouges indiquant ou se trouve généralement le nom de la convention collective: en haut à gauche ou en bas à gauche."
            />
          </MoreContent>
        </p>
        <Heading as="h4">
          Vérifiez dans le contrat de travail ou la notice remise par
          l’employeur
        </Heading>
        <p>
          L’employeur doit avoir remis au salarié lors de l’embauche une notice
          d’information indiquant la convention collective applicable. Vérifiez
          également dans le contrat de travail, le nom de la convention
          collective y est souvent mentionné.
        </p>
        <Heading as="h4">Vérifiez sur le lieu de travail</Heading>
        <p>
          Sur le lieu de travail (notamment panneaux d’affichage pour le
          personnel), il est souvent affiché sur une note la convention
          collective applicable. Par ailleurs, l’employeur a l’obligation de
          tenir à la disposition des salariés un exemplaire à jour du texte de
          la convention collective sur le lieu de travail (ou sur l’intranet
          s’il existe).
        </p>
        <Wrapper variant="light">
          <Heading stripped shift={spacings.xmedium} as="h4">
            Vous n’avez pas trouvé votre convention collective&nbsp;?
          </Heading>
          <p>
            <strong>
              Il est possible qu’aucune convention collective ne s’applique à
              l’entreprise.
            </strong>
            Contactez l’inspection du travail dont dépend l’entreprise pour plus
            de renseignements.
          </p>
          <ServiceRenseignementModal>
            {(openSRModal) => (
              <HelpButton
                variant="navLink"
                onClick={(e) => {
                  openSRModal(e);
                }}
              >
                Contactez l’inspection du travail
              </HelpButton>
            )}
          </ServiceRenseignementModal>
        </Wrapper>
      </Modal>
    </>
  );
};

const Img = styled.img`
  max-width: 100%;
`;
