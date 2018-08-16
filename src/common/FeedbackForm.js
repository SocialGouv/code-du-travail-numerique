import React from "react";
import StarRating from "react-star-rating-component";

import Alert from "../common/Alert";

class FeedbackForm extends React.Component {
  state = {
    stars: 0,
    email: "",
    message: "",
    status: null
  };

  submit = () => {
    // contact@code-du-travail.beta.gouv.fr
    const formUrl = "https://formspree.io/mwbpdywx";
    const subject = this.props.query || this.props.theme.id;

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
    const title = this.props.query ? (
      <span>
        Avons-nous répondu à votre question : <b>{this.props.query}</b> ?
      </span>
    ) : (
      <span>Avons-nous répondu à votre question ?</span>
    );

    return (
      <section className="section-light">
        <div className="container">
          <div className="wrapper-dark">
            <header>
              <h2 className="no-margin">Aidez-nous à nous améliorer</h2>
              <p>
                Avons-nous répondu à votre question : <b>chomage</b> ?
              </p>
            </header>
            <form>
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
                <label htmlFor="id_message">Votre message :</label>
                <textarea
                  onChange={e => this.setState({ message: e.target.value })}
                  value={this.state.message}
                  required={true}
                  className="full-width"
                  name="message"
                  id="id_message"
                  placeholder="Vos commentaires constructifs nous permettront d'améliorer notre service"
                />
              </p>
              <p>
                <label htmlFor="id_sender">Votre e-mail :</label>
                <input
                  onChange={e => this.setState({ email: e.target.value })}
                  value={this.state.email}
                  required={true}
                  placeholder="Votre email"
                  className="full-width"
                  type="email"
                  name="sender"
                  maxLength="100"
                  id="id_sender"
                />
              </p>
              {this.state.status === "sent" ? (
                <Alert category="success">Message bien envoyé !</Alert>
              ) : (
                <p>
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

export default FeedbackForm;
