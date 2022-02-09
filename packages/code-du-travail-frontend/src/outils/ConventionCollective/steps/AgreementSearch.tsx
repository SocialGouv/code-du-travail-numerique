import { SOURCES } from "@socialgouv/cdtn-sources";
import {
  AlertWithIcon,
  Button,
  Heading,
  ScreenReaderOnly,
  Section as SectionUi,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React, { MutableRefObject, useRef } from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";

import { InlineError } from "../../common/ErrorField";
import { AgreementLink } from "../agreement/AgreementLink";
import { SearchAgreement } from "../agreement/SearchAgreement";
import { HelpModal } from "../common/Modal";
import { ListItem, ResultList } from "../common/ResultList";
import { useTrackingContext } from "../common/TrackingContext";

type AgreementSearchStepProps = {
  embeddedForm: boolean;
  onSelectAgreement: (agreement) => void;
  onBackClick?: () => void;
};

const AgreementSearchStep = ({
  embeddedForm,
  onBackClick,
  onSelectAgreement,
}: AgreementSearchStepProps): JSX.Element => {
  const refInput = useRef<HTMLFormElement>();
  const { trackEvent, title, uuid } = useTrackingContext();

  function openModalHandler(openModal: () => void) {
    trackEvent("cc_search_help", "click_cc_search_help_p1", title, uuid);
    openModal();
  }

  return (
    <>
      <SearchAgreement
        embeddedForm={embeddedForm}
        inputRef={refInput as MutableRefObject<HTMLFormElement>}
        renderResults={(state, query) => {
          if (state.isLoading) {
            return (
              <Section>
                <Spinner aria-hidden="true" />{" "}
                <span role="status">recherche en cours</span>
              </Section>
            );
          }
          if (state.isError) {
            if (typeof state.error === "string") {
              return (
                <Section role="status">
                  <InlineError>{state.error}</InlineError>
                </Section>
              );
            }
            return <Section role="status"> {state.error}</Section>;
          }
          if (refInput.current && state.data) {
            refInput.current.scrollIntoView({ behavior: "smooth" });
          }
          return state.data ? (
            state.data.length > 0 ? (
              <Section>
                <ResultList query={query}>
                  {state.data.map((item, index) => {
                    return (
                      <ListItem key={item.id}>
                        <AgreementLink
                          isFirst={index === 0}
                          agreement={item}
                          onClick={onSelectAgreement}
                        />
                      </ListItem>
                    );
                  })}
                </ResultList>
              </Section>
            ) : (
              <Section>
                <ScreenReaderOnly role="status">
                  {state.data.length} résultats
                </ScreenReaderOnly>
                <Wrapper variant="light">
                  <p>
                    <strong role="status">
                      Aucune convention collective n’a été trouvée
                    </strong>
                    .
                  </p>
                  Suggestions&nbsp;:
                  <ul>
                    <li>Vérifiez l’orthographe des termes de recherche</li>
                    <li>
                      Utilisez la rubrique ci-dessous “Vous ne trouvez pas votre
                      convention collective&nbsp;?”
                    </li>
                  </ul>
                </Wrapper>
                <Wrapper>
                  Vous ne trouvez pas votre convention collective&nbsp;?
                  <br />
                  <HelpModal
                    title="Vous ne trouvez pas votre convention collective"
                    renderButton={(openModal) => (
                      <Button
                        variant="link"
                        onClick={() => openModalHandler(openModal)}
                      >
                        Consulter notre aide
                      </Button>
                    )}
                  >
                    <Title stripe="none" as="h3">
                      Vous ne trouvez pas convention collective&nbsp;?
                    </Title>
                    <p>Il peut y avoir plusieurs explications à cela&nbsp;:</p>
                    <ul>
                      <li>
                        Votre convention collective a un autre code : si vous le
                        pouvez, utilisez le numéro Siret de votre entreprise. Ce
                        dernier doit être présent sur votre bulletin de paie.
                      </li>
                      <li>
                        Votre convention collective a un statut particulier :
                        administration ou établissements publics, associations,
                        secteur agricole, La Poste, La Croix Rouge etc.
                      </li>
                      <li>
                        Votre entreprise n’est rattachée à aucune convention
                        collective.
                      </li>
                    </ul>
                    <Heading>
                      Essayez avec la recherche par entreprise&nbsp;
                    </Heading>
                    <AlertWithIcon variant="secondary">
                      Avec le nom de l’entreprise, il est possible de retrouver
                      la convention collective associée
                      <br />
                      <Link
                        passHref
                        href={`/${SOURCES.TOOLS}/convention-collective#entreprise`}
                      >
                        <Button as="a" variant="link" narrow small>
                          Je recherche avec le nom de l’entreprise
                        </Button>
                      </Link>{" "}
                    </AlertWithIcon>
                  </HelpModal>
                </Wrapper>
              </Section>
            )
          ) : (
            <></>
          );
        }}
      />
      {onBackClick && (
        <Link href={`/${SOURCES.TOOLS}/convention-collective`} passHref>
          <Button
            as="a"
            small
            type="button"
            onClick={onBackClick}
            variant="flat"
          >
            Précédent
          </Button>
        </Link>
      )}
    </>
  );
};

export { AgreementSearchStep };

const Section = styled(SectionUi)`
  padding-top: 1rem;
`;
