import React from "react";
import styled from "styled-components";
import { Button } from "../Button";
import { Modal, ModalContentWrapper } from ".";

export default {
  component: Modal,
  title: "Components|Modal"
};

const StyledModalContentWrapper = styled(ModalContentWrapper)({
  width: "50%",
  height: "50%",
  textAlign: "center",
  backgroundColor: "fuchsia"
});
class ExampleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultModalOpened: false,
      styledModalOpened: false
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(modalName) {
    this.setState(previousState => {
      return { ...previousState, [`${modalName}Opened`]: true };
    });
  }

  closeModal(modalName) {
    this.setState(previousState => {
      return { ...previousState, [`${modalName}Opened`]: false };
    });
  }

  render() {
    const { defaultModalOpened, styledModalOpened } = this.state;
    return (
      <>
        <h1> Standard modal </h1>
        <Button onClick={() => this.openModal("defaultModal")}>
          Click me !
        </Button>
        <Modal
          title="my modal title"
          isOpen={defaultModalOpened}
          onDismiss={() => this.closeModal("defaultModal")}
        >
          <p>It was worth the click right ?</p>
        </Modal>
        <h1> Styled modal </h1>
        <Button onClick={() => this.openModal("styledModal")}>
          {"Click me I'm stylish !"}
        </Button>
        <Modal
          title="my modal with custom wrapper"
          isOpen={styledModalOpened}
          onDismiss={() => this.closeModal("styledModal")}
          ContentWrapper={StyledModalContentWrapper}
        >
          <p>Are you blind yet ?</p>
        </Modal>
      </>
    );
  }
}

export const base = () => <ExampleModal />;
