import React from "react";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import styled from "styled-components";
import { X } from "react-feather";
import { theme } from "@cdt/ui";
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
        <StyledDialogOverlay
          isOpen={this.state.modalIsOpen}
          onDismiss={this.closeModal}
        >
          <StyledDialogContent>
            <ConventionForm onSearch={searchIdcc} />
            <CompanyForm onSearch={searchCompanies} getCompany={getCompany} />
            <CloseIcon onClick={this.closeModal}>
              <X title="fermer la modale" />
            </CloseIcon>
          </StyledDialogContent>
        </StyledDialogOverlay>
      </OutilCard>
    );
  }
}
const { box, colors, spacing } = theme;
export default ConventionModal;
const StyledDialogOverlay = styled(DialogOverlay)`
  background: rgba(0, 0, 0, 0.5);
`;
const StyledDialogContent = styled(DialogContent)`
  position: relative;
  border-radius: ${box.borderRadius};
`;

const CloseIcon = styled.button`
  padding: ${spacing.small};
  border: none;
  background: transparent;
  -webkit-appearance: none;
  position: absolute;
  right: 1em;
  top: 1em;
  color: ${colors.darkGrey};
  line-height: 0;
`;

const Button = styled.button`
  background: transparent;
  border: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  font-family: inherit;
  color: inherit;
`;
