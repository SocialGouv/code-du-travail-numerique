import React from "react";
import styled from "styled-components";
import { icons, theme } from "@socialgouv/cdtn-ui";
import { MatomoBaseEvent } from "../../lib";
import { push as matopush } from "@socialgouv/matomo-next";

const { Search: SearchIcon } = icons;

export const SearchWidget = () => {
  return (
    <StyledRoot>
      <LogoLink
        href="/"
        title="Le Code du travail numérique - Obtenez les réponses à vos questions sur le droit du travail."
        onClick={() => {
          window.parent?.postMessage({ name: "logo-link", kind: "click" }, "*");
          matopush([
            MatomoBaseEvent.TRACK_EVENT,
            MatomoBaseEvent.WIDGET_SEARCH,
            "click_logo",
          ]);
        }}
        target="_blank"
      >
        <Logo />
      </LogoLink>
      <StyledForm
        target="_blank"
        action="/recherche"
        onSubmit={() => {
          matopush([
            MatomoBaseEvent.TRACK_EVENT,
            MatomoBaseEvent.WIDGET_SEARCH,
            "submit_search",
          ]);
          window.parent?.postMessage(
            { name: "button-search", kind: "click" },
            "*"
          );
        }}
      >
        <StyledLabel>
          Trouvez les réponses à vos questions en droit du travail
        </StyledLabel>
        <SearchBar>
          <SearchLogo
            alt="Recherche"
            src="/static/assets/img/logo-marianne.png"
          />
          <StyledInput
            name="q"
            autocomplete="off"
            type="text"
            id="cdtn-search"
            placeholder="période d'essai"
            aria-label="Votre recherche"
          />
          <StyledButton id="button-search">
            <StyledSearchIcon />
          </StyledButton>
        </SearchBar>
      </StyledForm>
    </StyledRoot>
  );
};

const { breakpoints, fonts, spacings, colors } = theme;

const LogoLink = styled.a`
  &:after {
    content: "" !important;
  }
`;

const Logo = styled(icons.Logo)`
  width: auto;
  height: 65px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: ${breakpoints.mobile}) {
    height: ${spacings.larger};
  }
`;

const StyledLabel = styled.label`
  color: ${({ theme }) => theme.paragraph};
  font-weight: bold;
  font-size: ${fonts.sizes.default};
  margin: 8px 0 16px;
  display: block;
`;

const StyledForm = styled.form`
  padding: 0 ${spacings.xsmall};
`;

const StyledInput = styled.input`
  position: relative;
  padding: ${spacings.large} ${spacings.larger} ${spacings.large} 84px;
  height: ${spacings.larger};
  width: 100%;
  font-size: ${fonts.sizes.default};
  -webkit-appearance: none;
  background-color: transparent;
  border: none;
`;

const StyledRoot = styled.div`
  max-width: 500px;
  text-align: center;
  margin: auto;
`;

const SearchLogo = styled.img`
  position: absolute;
  z-index: 0;
  height: ${spacings.medium};
  left: ${spacings.small};
  top: calc(50% - 10px);
`;

const StyledButton = styled.button`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  padding: 0 ${spacings.base};
  height: 100%;
  display: flex;
  align-items: center;
  color: ${colors.secondary};
  cursor: pointer;
  background: transparent;
  border: none;
  transition: all 100ms ease-out;
  -webkit-appearance: none;

  &:hover {
    opacity: 0.5;
    transform: translateY(-2px);
  }
`;

const StyledSearchIcon = styled(SearchIcon)`
  width: ${spacings.large};
  height: ${spacings.large};
`;

const SearchBar = styled.div`
  position: relative;
  width: 100%;
  border-radius: ${spacings.xsmall};
  box-shadow: ${colors.heroGradientStart} 0 ${spacings.xsmall} ${spacings.base};
`;
