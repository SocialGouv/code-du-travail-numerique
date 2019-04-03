import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Accordion, Button, Modal, theme } from "@cdt/ui";
import { ConventionForm } from "../../common/ConventionForm";
import { searchIdcc } from "../../common/convention.service";
import TYPE_REFERENCE from "../typeReference";
import ReferenceList from "./ReferenceList";

import { blocs } from "../mapping";

const { box, colors, spacing } = theme;

class HierarchieBloc extends React.PureComponent {
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
    const { id, references } = this.props;
    const { title, text, hasCCSearch } = blocs[id];

    const items = [
      {
        title: (
          <StyledSpan>
            Voir les articles du code du travail concernés
          </StyledSpan>
        ),
        body: <ReferenceList references={references} />
      }
    ];
    return (
      <BlocWrapper>
        <h3>{title}</h3>
        <p>{text}</p>
        {hasCCSearch && (
          <>
            <CCButtonWrapper>
              <Button onClick={this.openModal}>
                Trouvez votre convention collective
              </Button>
            </CCButtonWrapper>
            <Modal isOpen={this.state.modalIsOpen} onDismiss={this.closeModal}>
              <ConventionForm onSearch={searchIdcc} />
            </Modal>
          </>
        )}
        <Accordion items={items} />
      </BlocWrapper>
    );
  }
}

HierarchieBloc.propTypes = {
  id: PropTypes.string.isRequired,
  references: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      type: PropTypes.oneOf(Object.values(TYPE_REFERENCE)).isRequired,
      id: PropTypes.string.isRequired
    })
  )
};

export default HierarchieBloc;

const BlocWrapper = styled.div`
  margin: ${spacing.large} 0;
  padding: ${spacing.base};
  background-color: ${colors.darkBackground};
  border: 1px solid ${colors.elementBorder};
  border-radius: ${box.borderRadius};
`;

const CCButtonWrapper = styled.div`
  margin-bottom: ${spacing.medium};
  text-align: center;
`;

const StyledSpan = styled.span`
  display: inline-block;
  padding: ${spacing.base};
`;
