import React from "react";
import styled from "styled-components";
import { useConfig, useCurrentDoc } from "docz";

import { Logo } from "../Logo";
import { ColorsToggler } from "../ColorsToggler";

export const Header = () => {
  const config = useConfig();
  const { edit = true, ...doc } = useCurrentDoc();

  return (
    <StyledHeader>
      <Logo />
      {config.repository && (
        <a href={config.repository} target="_blank" rel="noopener noreferrer">
          Cliquez ici pour accéder au repo
        </a>
      )}
      {edit && doc.link && (
        <a href={doc.link} target="_blank" rel="noopener noreferrer">
          Editez la page
        </a>
      )}
      <ColorsToggler />
    </StyledHeader>
  );
};

const StyledHeader = styled.div`
  display: flex;
  justify-content: space-between;
  vertical-align: middle;
  padding: 1rem;
  border-bottom: 1px solid #ced4de;
`;
