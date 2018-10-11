import React from "react";
import StarRating from "react-star-rating-component";
import { UID } from "react-uid";
import { withRouter } from "next/router";

import { Router } from "../../routes";
import Alert from "../common/Alert";

class FeedbackForm extends React.Component {
  state = {
    stars: 0,
    email: "",
    message: "",
    status: null
  };

  submit = e => {
    if (e) {
      e.preventDefault();
    }
    // contact@code-du-travail.beta.gouv.fr
    const formUrl = "https://formspree.io/xwbdjqem";
    const subject =
      this.props.query || (this.props.theme && this.props.theme.id);

    if (
      !this.state.email ||
      !this.state.message ||
      this.state.email.indexOf("@") === -1 ||
      this.state.message.length < 5
    ) {
      alert("Merci de compléter le formulaire");
      return;
    }

    this.setState(
      {
        status: "sending"
      },
      () => {
        fetch(formUrl, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...this.state,
            userAgent: typeof navigator !== "undefined" && navigator.userAgent,
            subject: subject
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
                    stars: 0
                  });
                }
              );
            } else if (data.error) {
              console.log("Email send error", data);
              throw new Error("cannot send form : " + data.error);
            }
          })
          .catch(e => {
            this.setState(
              {
                status: "error"
              },
              () => alert("Impossible d'envoyer votre message")
            );
          });
      }
    );
  };

  render() {
    const intro =
      this.props.router.query && this.props.router.query.q ? (
        <p>
          Avons-nous répondu à votre question :{" "}
          <b>{this.props.router.query.q}</b> ?
        </p>
      ) : (
        <p>Avons-nous répondu à votre question ?</p>
      );

    return (
      <section className="section-light">
        <div className="container">
          <div className="wrapper-dark">
            <header>
              <h2 className="no-margin">Aidez-nous à nous améliorer</h2>
              {intro}
            </header>
            <form onSubmit={this.submit}>
              <p>
                <label>
                  Êtes vous satisfait par les réponses apportées à votre
                  question ?
                </label>
              </p>
              <StarRating
                className="feedback-stars"
                name="stars"
                value={this.state.stars}
                onStarClick={num => this.setState({ stars: num })}
              />
              <p>
                <UID name={id => `id_${id}`}>
                  {id => (
                    <React.Fragment>
                      <label htmlFor={id}>Votre message :</label>
                      <textarea
                        onChange={e =>
                          this.setState({ message: e.target.value })
                        }
                        value={this.state.message}
                        required={true}
                        className="full-width"
                        name="message"
                        id={id}
                        placeholder="Vos commentaires constructifs nous permettront d'améliorer notre service"
                      />
                    </React.Fragment>
                  )}
                </UID>
              </p>
              <p>
                <UID name={id => `id_${id}`}>
                  {id => (
                    <React.Fragment>
                      <label htmlFor={id}>Votre e-mail :</label>
                      <input
                        onChange={e => this.setState({ email: e.target.value })}
                        value={this.state.email}
                        required={true}
                        placeholder="Votre email"
                        className="full-width"
                        type="email"
                        name="sender"
                        maxLength="100"
                        id={id}
                      />
                    </React.Fragment>
                  )}
                </UID>
              </p>
              {this.state.status === "sent" ? (
                <Alert category="success">Message bien envoyé !</Alert>
              ) : (
                <p>
                  {this.state.status === "error" ? (
                    <Alert category="danger">
                      Impossible d'envoyer votre message
                    </Alert>
                  ) : null}
                  <button
                    type="submit"
                    className="btn"
                    disabled={this.state.status === "sending"}
                    onClick={this.submit}
                  >
                    Envoyer
                  </button>
                </p>
              )}
            </form>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(FeedbackForm);
