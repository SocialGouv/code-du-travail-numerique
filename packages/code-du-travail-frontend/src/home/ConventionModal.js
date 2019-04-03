import React from "react";
import styled from "styled-components";
import { Modal } from "@cdt/ui";
import { Outil, OutilCard } from "./Outils";
import { ConventionForm } from "../common/ConventionForm";
import { CompanyForm } from "../common/CompanyForm";
import {
  searchIdcc,
  searchCompanies,
  getCompany
} from "../common/convention.service";

class ConventionModal extends React.Component {
  render() {
    return (
      <OutilCard>
        <Button onClick={this.openModal}>
          <Outil
            title="Votre convention collective"
            text="Trouvez simplement la convention collective dont vous dépendez"
            icon="/static/assets/icons/book_web.svg"
          />
        </Button>
        <Modal>
          <ConventionForm onSearch={searchIdcc} />
          <CompanyForm onSearch={searchCompanies} getCompany={getCompany} />
        </Modal>
      </OutilCard>
    );
  }
}

export default ConventionModal;

const Button = styled.button`
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: inherit;
  color: inherit;
`;
