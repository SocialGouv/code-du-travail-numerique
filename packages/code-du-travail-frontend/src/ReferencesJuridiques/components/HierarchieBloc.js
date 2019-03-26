import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { Accordion, Button, theme } from "@cdt/ui";
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
  render() {
    const { id, references } = this.props;
    const { title, text, hasCCSearch } = blocs[id];

    const items = [
      {
        title: "Voir les articles du code du travail concernés",
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
              <Button
                onClick={() =>
                  this.setState({
                    modalIsOpen: true
                  })
                }
              >
                Trouvez votre convention collective
              </Button>
            </CCButtonWrapper>
            <DialogOverlay
              isOpen={this.state.modalIsOpen}
              onDismiss={() =>
                this.setState({
                  modalIsOpen: false
                })
              }
            >
              <DialogContent>
                <ConventionForm onSearch={searchIdcc} />
              </DialogContent>
            </DialogOverlay>
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
