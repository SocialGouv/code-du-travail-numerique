---
name: Modal
menu: Component
---

import "@cdt/css";
import styled from "styled-components";
import { Playground, Props } from "docz";
import Button from "../Button";
import { Modal, ModalContentWrapper } from ".";

# Modal

<Playground>
  {
    () => {
      const StyledModalContentWrapper = styled(ModalContentWrapper)({
        width: "50%",
        height: "50%",
        textAlign: "center",
        backgroundColor: "fuchsia"
      });
      class ExampleModal extends React.Component {
        constructor(props) {
          super(props);
          this.state = { areModalOpened: [false, false] };
          this.openModal = this.openModal.bind(this);
          this.closeModal = this.closeModal.bind(this);
        }

        openModal(modalIndex) {
          this.setState((previousState) => {
            previousState.areModalOpened[modalIndex] = true;
            return { areModalOpened: [...previousState.areModalOpened]}
          });
        };

        closeModal(modalIndex) {
          this.setState((previousState) => {
            previousState.areModalOpened[modalIndex] = false;
            return { areModalOpened: [...previousState.areModalOpened]}
          });
        };

        render() {
          const { areModalOpened } = this.state;
          return <>
            <h1> Standard modal </h1>
            <Button onClick={() => this.openModal(0)}>Click me !</Button>
            <Modal isOpen={areModalOpened[0]} onDismiss={() => this.closeModal(0)}>
              <p>It was worth the click right ?</p>
            </Modal>
            <h1> Styled modal </h1>
            <Button onClick={() => this.openModal(1)}>Click me I'm stylish !</Button>
            <Modal isOpen={areModalOpened[1]} onDismiss={() => this.closeModal(1)} ContentWrapper={StyledModalContentWrapper}>
              <p>Are you blind yet ?</p>
            </Modal>
          </>
        }
      }

      return <ExampleModal />
    }
  }
</Playground>

<Props of={Modal} />
