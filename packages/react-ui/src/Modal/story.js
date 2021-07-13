import React from "react";
import styled from "styled-components";

import { Button } from "../Button/index.js";
import { Section } from "../layout/Section/index.js";
import { Title } from "../Titles/Title/index.js";
import { Modal, ModalContentWrapper } from "./index.js";

export default {
  component: Modal,
  title: "Components/Modal",
};

const StyledModalContentWrapper = styled(ModalContentWrapper)({
  backgroundColor: "fuchsia",
  height: "50%",
  textAlign: "center",
  width: "50%",
});
class ExampleModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      defaultModalOpened: false,
      styledModalOpened: false,
    };
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal(modalName) {
    this.setState((previousState) => {
      return { ...previousState, [`${modalName}Opened`]: true };
    });
  }

  closeModal(modalName) {
    this.setState((previousState) => {
      return { ...previousState, [`${modalName}Opened`]: false };
    });
  }

  render() {
    const { defaultModalOpened, styledModalOpened } = this.state;
    return (
      <>
        <Section>
          <Title> Standard modal </Title>
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
        </Section>
        <Section>
          <Title> Styled modal </Title>
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
        </Section>
      </>
    );
  }
}

export const base = () => <ExampleModal />;
