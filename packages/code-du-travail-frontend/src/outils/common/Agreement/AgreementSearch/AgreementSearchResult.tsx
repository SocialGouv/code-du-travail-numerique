import { SOURCES } from "../../../../../../code-du-travail-utils/build";
import {
  AlertWithIcon,
  Button,
  FlatList,
  Heading,
  ScreenReaderOnly,
  Section as SectionUi,
  theme,
  Title,
  Wrapper,
} from "@socialgouv/cdtn-ui";
import Link from "next/link";
import React, { useState } from "react";
import Spinner from "react-svg-spinner";
import styled from "styled-components";

import { Agreement } from "../../../../conventions/Search/api/type";
import { FetchReducerState } from "../components/Suggester";
import { TrackingProps, UserAction } from "../../../ConventionCollective/types";
import { InlineError } from "../../ErrorField";
import { ListItem } from "../components/ResultList";
import { AgreementLink } from "./AgreementInput/AgreementLink";
import { HelpModal } from "../components/Modal";

type Props = {
  onSelectAgreement: (agreement) => void;
} & TrackingProps;

const renderResults = ({
  onSelectAgreement,
  onUserAction,
}: Props): ((state: FetchReducerState<Agreement[]>) => JSX.Element) => {
  function openModalHandler(openModal: () => void) {
    onUserAction(UserAction.OpenAgreementHelp);
    openModal();
  }

  return function renderResults(
    state: FetchReducerState<Agreement[]>
  ): JSX.Element {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selectedIndex, setSelectedIndex] = useState(0);

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
    if (!state.data) {
      return <></>;
    }

    if (!state.data.length) {
      return (
        <Section>
          <ScreenReaderOnly role="status">0 résultat</ScreenReaderOnly>
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
              <Heading>Essayez avec la recherche par entreprise&nbsp;</Heading>
              <AlertWithIcon variant="secondary">
                Avec le nom de l’entreprise, il est possible de retrouver la
                convention collective associée
                <br />
                <Link
                  passHref
                  href={`/${SOURCES.TOOLS}/convention-collective#entreprise`}
                  legacyBehavior
                >
                  <Button as="a" variant="link" narrow small>
                    Je recherche avec le nom de l’entreprise
                  </Button>
                </Link>{" "}
              </AlertWithIcon>
            </HelpModal>
          </Wrapper>
        </Section>
      );
    }

    const options = state.data || [];
    const inputRefs = options.map((_) => React.createRef<HTMLButtonElement>());

    const selectItem = (index) => {
      setSelectedIndex(index);
      // @ts-ignore
      inputRefs[index].current.focus();
    };

    const handleKeyDown = (event) => {
      if (event.key === "ArrowDown" || event.key === "ArrowRight") {
        const nextIndex =
          selectedIndex + 1 === options.length ? 0 : selectedIndex + 1;
        selectItem(nextIndex);
      } else if (event.key === "ArrowUp" || event.key === "ArrowLeft") {
        const nextIndex =
          selectedIndex - 1 < 0 ? options.length - 1 : selectedIndex - 1;
        selectItem(nextIndex);
      }
    };

    return (
      <WrapperNoPadding variant="light">
        <FlatList
          role="listbox"
          tabIndex={-1}
          id="search-results"
          aria-labelledby="agreement-search-label"
          onKeyDown={handleKeyDown}
          autoFocus
        >
          {options.map((item, index) => {
            return (
              <ListItem key={item.id} id={item.id}>
                <AgreementLink
                  ref={inputRefs[index]}
                  isFirst={index === 0}
                  isSelected={index === selectedIndex}
                  agreement={item}
                  onClick={onSelectAgreement}
                />
              </ListItem>
            );
          })}
        </FlatList>
      </WrapperNoPadding>
    );
  };
};

export { renderResults };
const WrapperNoPadding = styled(Wrapper)`
  padding: 0;
  margin-top: ${theme.spacings.base};
`;
const Section = styled(SectionUi)`
  padding-top: 1rem;
`;
