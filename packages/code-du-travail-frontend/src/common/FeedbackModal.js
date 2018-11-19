import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { DialogContent, DialogOverlay } from "@reach/dialog";
import Alert from "../common/Alert";
import { getRouteBySource } from "../sources";

const motifLabels = [
  "Les informations proposées ne sont pas à jour",
  "Les informations me paraissent erronées",
  "Les informations me paraissent incomplètes",
  "Les informations me paraissent hors-sujet",
  "Je n'ai pas trouvé la réponse à ma question"
];

const formspreeUrl = "https://formspree.io/xwbdjqem";

class FeedbackModal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    closeModal: PropTypes.func,
    query: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object)
  };
  state = {
    status: "", // "" | "sending" | "sent" | "error"
    motif: motifLabels[0],
    message: undefined,
    question: this.props.query || "",
    email: undefined
  };

  texteareaRef = React.createRef();
  inputChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  onSubmit = event => {
    event.preventDefault();
    const { question, motif, message, email } = this.state;
    if (!email || email.indexOf("@") === -1) {
      alert("Merci de compléter le formulaire");
      return;
    }

    this.setState(
      {
        status: "sending"
      },
      () => {
        fetch(formspreeUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            motif,
            message,
            email,
            userAgent: typeof navigator !== "undefined" && navigator.userAgent,
            subject: question
          })
        })
          .then(r => r.json())
          .then(data => {
            if (data.success) {
              this.setState(
                {
                  status: "sent"
                },
                () => {
                  this.setState({
                    email: "",
                    message: "",
                    motif: motifLabels[0]
                  });
                  setTimeout(() => this.setState({ status: "" }), 3000);
                }
              );
            } else if (data.error) {
              throw new Error("cannot send form : " + data.error);
            }
          })
          .catch(() => {
            this.setState(
              {
                status: "error"
              },
              () => {
                setTimeout(() => this.setState({ status: "" }), 3000);
              }
            );
          });
      }
    );
  };

  render() {
    const { results, isOpen, closeModal, query } = this.props;

    return (
      <DialogOverlay
        isOpen={isOpen}
        style={{ background: "rgba(0, 0, 0, .5)" }}
        initialFocusRef={this.texteareaRef}
        onDismiss={closeModal}
      >
        <DialogContent
          style={{ width: "70%", borderRadius: "3px", margin: "5vh auto" }}
        >
          <section style={{ outline: 0 }} className="FeedbackModal__content">
            <h1 className="section__title">
              Vous n&apos;avez pas trouvé votre réponse ?
            </h1>
            <p className="FeedbackModal__intro">
              Nous sommes désolés de n&apos;avoir pu répondre à vos attentes.
              Laissez-nous votre question, vos suggestions et votre adresse,
              nous vous préviendrons lors des prochaines améliorations de cet
              outils.
            </p>
            {results &&
              results.length > 0 && (
                <React.Fragment>
                  <h2
                    className="section__subtitle"
                    style={{ alignSelf: "center" }}
                  >
                    Les réponses qui pourraient vous aider
                  </h2>
                  <ul style={{ width: "100%" }}>
                    {results.slice(0, 3).map(({ _source: item }) => (
                      <li key={`${item.type}/${item.slug}`}>
                        <Link
                          href={{
                            pathname: `/${getRouteBySource(item.source)}/${
                              item.slug
                            }`,
                            query: { q: query, search: 0 },
                            hash: item.anchor
                          }}
                        >
                          <a>{item.title}</a>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </React.Fragment>
              )}
            <form
              action={formspreeUrl}
              className="Feedback__form"
              onSubmit={this.onSubmit}
            >
              <input
                type="text"
                name="question"
                value={this.props.query}
                onChange={this.inputChange}
                className="Feedback__input"
                disabled
              />
              <h2 className="section__subtitle" style={{ alignSelf: "center" }}>
                Laisser nous un commentaire sur notre service{" "}
                <span className="fontweight--normal fontweight--italic">
                  {" "}
                  - facultatif
                </span>
              </h2>
              <select
                name="motif"
                onChange={this.inputChange}
                onBlur={this.inputChange}
                className="Feedback__input"
                value={this.state.motif}
              >
                {motifLabels.map((label, i) => (
                  <option key={`motif-${i}`} value={label}>
                    {label}
                  </option>
                ))}
              </select>
              <textarea
                ref={this.texteareaRef}
                name="message"
                className="Feedback__input"
                placeholder="Les informations ..."
                onChange={this.inputChange}
              />
              <input
                type="text"
                name="email"
                onChange={this.inputChange}
                placeholder="nom@adresse.email"
                className="Feedback__input"
              />
              <div className="Feedback__action">
                <button
                  className="Feedback__button btn btn__primary"
                  disabled={this.state.status === "sending"}
                >
                  Envoyer ma question
                </button>
                <div className="Feedback__status">
                  {this.state.status === "sent" ? (
                    <Alert category="success">Message bien envoyé !</Alert>
                  ) : this.state.status === "error" ? (
                    <Alert category="danger">
                      Impossible d&apos;envoyer votre message
                    </Alert>
                  ) : null}
                </div>
              </div>
            </form>
          </section>
        </DialogContent>
      </DialogOverlay>
    );
  }
}

export { FeedbackModal };
