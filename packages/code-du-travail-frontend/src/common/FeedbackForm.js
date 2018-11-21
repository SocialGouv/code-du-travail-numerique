import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Alert } from "@cdt/ui";
import { getRouteBySource } from "../sources";

const motifLabels = [
  "Les informations proposées ne sont pas à jour",
  "Les informations me paraissent erronées",
  "Les informations me paraissent incomplètes",
  "Les informations me paraissent hors-sujet",
  "Je n'ai pas trouvé la réponse à ma question"
];

const formspreeUrl = "https://formspree.io/xwbdjqem";

class FeedbackForm extends React.Component {
  static propTypes = {
    query: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object)
  };
  static defaultProps = {
    query: "",
    results: []
  };
  state = {
    status: "", // "" | "sending" | "sent" | "error"
    motif: motifLabels[0],
    message: "",
    question: this.props.query || "",
    email: ""
  };
  timeoutId = null;
  texteareaRef = React.createRef();

  componentDidMount() {
    this.texteareaRef.current.focus();
  }
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
              this.setState({
                status: "sent",
                email: "",
                message: "",
                motif: motifLabels[0]
              });
            } else if (data.error) {
              throw new Error("cannot send form : " + data.error);
            }
          })
          .catch(() => {
            this.setState({
              status: "error"
            });
          })
          .then(() => {
            this.timeoutId = setTimeout(
              () => this.setState({ status: "" }),
              3000
            );
          });
      }
    );
  };

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
  }

  render() {
    const { results, query } = this.props;
    return (
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
        {results &&
          results.length > 0 && (
            <React.Fragment>
              <h2 className="section__subtitle" style={{ alignSelf: "center" }}>
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
          value={this.state.message}
        />
        <input
          type="email"
          name="email"
          onChange={this.inputChange}
          placeholder="nom@adresse.email"
          className="Feedback__input"
          value={this.state.email}
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
              <Alert success>Message bien envoyé !</Alert>
            ) : this.state.status === "error" ? (
              <Alert warning>Impossible d&apos;envoyer votre message</Alert>
            ) : null}
          </div>
        </div>
      </form>
    );
  }
}

export { FeedbackForm };
