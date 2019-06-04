import React from "react";
import styled from "styled-components";
import { Cell, Category, Modal, theme } from "@cdt/ui";
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
    const { modalIsOpen } = this.state;
    return (
      <>
        <Button onClick={this.openModal}>
          <Category
            title="Votre convention collective"
            text="Trouvez simplement la convention collective dont vous dépendez"
            icon="/static/assets/icons/book_web.svg"
          />
        </Button>
        <Modal isOpen={modalIsOpen} onDismiss={this.closeModal}>
          <ConventionForm onSearch={searchIdcc} />
          <CompanyForm onSearch={searchCompanies} getCompany={getCompany} />
        </Modal>
      </>
    );
  }
}

export default ConventionModal;

const { box, colors } = theme;

const Button = styled.button`
  appearance: none;
  border: none;
  background: transparent;
  padding: 0%;
  text-decoration: none;
  cursor: pointer;
  display: block;
  height: 100%;
  border-radius: ${box.borderRadius};
  & > * {
    transition: all 0.2s ease;
  }
  :focus > *,
  :active > *,
  :hover > * {
    transform: scale(1.1);
    border: 1px solid ${colors.focus};
    box-shadow: 0 0 2px 2px ${colors.focusShadow};
  }
`;
