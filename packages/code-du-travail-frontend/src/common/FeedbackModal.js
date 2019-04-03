import React from "react";
import PropTypes from "prop-types";
import ReactPiwik from "react-piwik";
import styled from "styled-components";
import { Modal, ModalContentWrapper } from "@cdt/ui";

import { FeedbackForm } from "./FeedbackForm";
import { postFeedback } from "./feedback.service";

class FeedbackModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    query: PropTypes.string,
    source: PropTypes.string,
    url: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object)
  };
  static defaultProps = {
    isOpen: false,
    query: "",
    source: "Tous contenus",
    url: "",
    results: []
  };
  submit = data => {
    ReactPiwik.push([
      "trackEvent",
      "feedback",
      "submit",
      this.props.router.asPath,
      this.props.router.query.q
    ]);
    return postFeedback(data);
  };
  render() {
    const { results, isOpen, closeModal, query, url, source } = this.props;
    return (
      <Modal
        isOpen={isOpen}
        onDismiss={closeModal}
        ContentWrapper={StyledModalContentWrapper}
      >
        <section style={{ outline: 0 }} className="feedback-modal__content">
          <h1 className="section__title">
            Vous n&apos;avez pas trouvé votre réponse ?
          </h1>
          <p className="feedback-modal__intro">
            Nous sommes désolés de n&apos;avoir pu répondre à vos attentes.
            Laissez-nous votre question, vos suggestions et votre adresse, nous
            vous préviendrons lors des prochaines améliorations de cet outil.
          </p>
          <FeedbackForm
            onSubmit={this.submit}
            query={query}
            source={source}
            url={url}
            results={results}
          />
        </section>
      </Modal>
    );
  }
}

export { FeedbackModal };

const StyledModalContentWrapper = styled(ModalContentWrapper)`
  margin: 5vh auto;
  width: 70%;
`;
