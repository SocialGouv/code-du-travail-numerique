import React from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import styled from "styled-components";

import { Outil, OutilCard } from "./Outils";
import { ConventionForm } from "../common/ConventionForm";
import { CompanyForm } from "../common/CompanyForm";
import {
  searchIdcc,
  searchCompanies,
  getCompany
} from "../common/convention.service";

class ConventionModal extends React.Component {
  state = {
    modalIsOpen: false
  };
  openModal = e => {
    e.preventDefault();
    this.setState({
      modalIsOpen: true
    });
  };

  closeModal = () => {
    this.setState({
      modalIsOpen: false
    });
  };

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
        <DialogOverlay
          isOpen={this.state.modalIsOpen}
          style={{ background: "rgba(0, 0, 0, .5)" }}
          onDismiss={this.closeModal}
        >
          <DialogContent style={{ borderRadius: "3px", margin: "5vh auto" }}>
            <ConventionForm onSearch={searchIdcc} />
            <CompanyForm onSearch={searchCompanies} getCompany={getCompany} />
          </DialogContent>
        </DialogOverlay>
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
