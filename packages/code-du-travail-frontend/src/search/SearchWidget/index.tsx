import React from "react";
import styled from "styled-components";
import { icons, theme, Button } from "@socialgouv/cdtn-ui";

export const SearchWidget = () => {
  return (
    <>
      <StyledRoot>
        <a
          href="/?source=widget"
          target="_blank"
          title="Le Code du travail numérique - Obtenez les réponses à vos questions sur le droit du travail."
        >
          <Logo />
        </a>
        <StyledForm target="_blank" action="/recherche">
          <StyledLabel>
            Trouvez les réponses à vos questions en droit du travail
          </StyledLabel>
          <SearchBar>
            <SearchLogo
              alt="Recherche"
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAG0AAAAoCAMAAADDs4S7AAAAw1BMVEX///////9wcMFAQKxgYLrv7/j0oKXpQEvwgIcAAJFAQK373+HlIC3hAA/sYGkQEJivr9z2sLS/v+P0n6X4wMPjEB4gIJ/f3/LucHifn9blHy3ykJb97/D5+fnm5ubg4ODz8/Ovr93a2dmcm5vBwcGQkM/t7e2ura27u7vnMDzT09P3v8MwMKWgoNbqUFpvb8F/f8ggIJ4fH55QULSAgMi/v+SPj8/f3/HPz+tQULNfX7rrUFr4v8PPz+r5z9Lzn6X2r7SE0oVPAAAAAnRSTlP/n4UHvp8AAAHaSURBVHgBvdZVgqswGIbhbyCpt6EGp+7u7rL/VZ3AuPwjTeh7gVw9aBLcswfAMP8Y43hXIPjLQlIzw38rwvGhaCz+qxJ/1oSFzyX90lL4orRPGsPnMomsP5rtQHan9yYcfFk0+M8HLQcqH7QIqJI+PEkHVFH9WgR0+btqBe2aDbqi/vfGCapUrlTz2rUaoZXrjWZWu9YitHanW9L/JBnxILuNMnraNRNE/SoGOrRhamSTn8m7xurahLO3pyPQRbOq2hQz+VMzxuYRIU8X33IhRW2Kpdys1jWLA6mZMHJL0CXUtPWmFranw8WytYIbh9qD/E6ztyvhDvubqdwJ5kC2cUCmpk2XciNqHECKzcJi5NR2goMqrfQH2Mt3g1VuRv/eXkUlbeZtd3jK/RNEDnRB9b97x3nNgVMzhk9r5A2o1Eeu/dZwv5Cd3ITFGsBqDaqYqiZ2j7vHuwT4ciI3hvX+nw4eCsdoUe+aa5drsV1KgrMJMTpq1Gy2tjiwnYWn9HJEVRPMcp+me1PbXC5nykP6balqE74a7kV4yremCHsNOb2MVNVOS+8b2bbE80f6HsNAo2YPvV2EPZ1HUvjQWUGjUMqSXbR/k7TlFr3E/qQZkR9bSIvuEvpl14f/nSicEPXggsEAAAAASUVORK5CYII="
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
              <svg fill="none" viewBox="0 0 32 32">
                <title>Rechercher (nouvelle fenêtre)</title>
                <path
                  d="M27.319 25.368a.935.935 0 01-1.304 1.341l-6.256-6.012a9.797 9.797 0 01-6.092 2.1C8.327 22.798 4 18.59 4 13.4S8.328 4 13.667 4c5.338 0 9.666 4.208 9.666 9.399 0 2.245-.81 4.307-2.16 5.923l6.146 6.046zm-13.652-4.515c4.234 0 7.666-3.337 7.666-7.454 0-4.117-3.432-7.454-7.666-7.454C9.432 5.945 6 9.282 6 13.399c0 4.117 3.432 7.454 7.667 7.454z"
                  fill="currentColor"
                ></path>
              </svg>
            </StyledButton>
          </SearchBar>
        </StyledForm>
      </StyledRoot>
    </>
  );
};

const { breakpoints } = theme;

const Logo = styled(icons.Logo)`
  flex-shrink: 0;
  width: 160px;
  height: 65px;
  color: ${({ theme }) => theme.primary};
  @media (max-width: ${breakpoints.mobile}) {
    height: 5rem;
    width: auto;
    margin-left: 1rem;
  }
`;

const StyledLabel = styled.label`
  font-family: Merriweather, sans-serif;
  font-size: 18px;
  margin: 8px 0 16px;
  display: block;
`;

const StyledForm = styled.form`
  width: 500px;
`;

const StyledInput = styled.input`
  position: relative;
  z-index: 1;
  margin: 0;
  padding: 32px 64px 32px 84px;
  height: 4rem;
  width: 100%;
  color: #3e486e;
  font-weight: normal;
  font-size: 16px;
  font-style: normal;
  line-height: 1;
  -webkit-appearance: none;
  background-color: transparent;
  border: none;
  border-radius: 0.6rem;
`;

const StyledRoot = styled.div`
  max-width: 500px;
  color: #3e486e;
  line-height: 1.5;
  text-align: center;
  background: white;
  margin: auto;
  min-height: 200px;
`;

const SearchLogo = styled.img`
  position: absolute;
  z-index: 0;
  height: 20px;
  left: 1rem;
  top: calc(50% - 10px);
`;

const StyledButton = styled.button`
  position: absolute;
  z-index: 2;
  top: 0;
  right: 0;
  padding: 0 0.8rem;
  height: 100%;
  display: flex;
  align-items: center;
  color: rgb(121, 148, 212);
  cursor: pointer;
  background: transparent;
  border: none;
  box-shadow: none;
  opacity: 1;
  transition: all 100ms ease-out;
  -webkit-appearance: none;
  &:hover {
    opacity: 0.5;
    transform: translateY(-2px);
  }
  svg {
    width: 32px;
    height: 32px;
  }
`;

const SearchBar = styled.div`
  position: relative;
  width: 100%;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  background: white;
  border-radius: 0.6rem;
  box-shadow: rgba(121, 148, 212, 0.4) 0 0.8rem 1.4rem;
`;
