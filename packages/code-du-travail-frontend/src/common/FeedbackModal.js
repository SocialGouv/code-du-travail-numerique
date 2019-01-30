import React from "react";
import PropTypes from "prop-types";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import { FeedbackForm } from "./FeedbackForm";
import { postFeedback } from "./feedback.service";

class FeedbackModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func.isRequired,
    query: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object)
  };
  static defaultProps = {
    isOpen: false
  };
  render() {
    const { results, isOpen, closeModal, query } = this.props;
    return (
      <DialogOverlay
        isOpen={isOpen}
        style={{ background: "rgba(0, 0, 0, .5)" }}
        onDismiss={closeModal}
      >
        <DialogContent
          style={{ width: "70%", borderRadius: "3px", margin: "5vh auto" }}
        >
          <section style={{ outline: 0 }} className="feedback-modal__content">
            <h1 className="section__title">
              Vous n&apos;avez pas trouvé votre réponse ?
            </h1>
            <p className="feedback-modal__intro">
              Nous sommes désolés de n&apos;avoir pu répondre à vos attentes.
              Laissez-nous votre question, vos suggestions et votre adresse,
              nous vous préviendrons lors des prochaines améliorations de cet
              outil.
            </p>
            <FeedbackForm
              onSubmit={postFeedback}
              query={query}
              results={results}
            />
          </section>
        </DialogContent>
      </DialogOverlay>
    );
  }
}

export { FeedbackModal };
