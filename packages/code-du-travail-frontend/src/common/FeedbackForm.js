import React from "react";
import PropTypes from "prop-types";
import Link from "next/link";
import { Alert } from "@cdt/ui";
import { getRouteBySource } from "../sources";
import { feedbackUrl } from "./feedback.service";

const motifLabels = [
  "Les informations proposées ne sont pas à jour",
  "Les informations me paraissent erronées",
  "Les informations me paraissent incomplètes",
  "Les informations me paraissent hors-sujet",
  "Je n'ai pas trouvé la réponse à ma question"
];

class FeedbackForm extends React.Component {
  static propTypes = {
    query: PropTypes.string,
    url: PropTypes.string,
    results: PropTypes.arrayOf(PropTypes.object),
    onSubmit: PropTypes.func.isRequired
  };
  static defaultProps = {
    query: "",
    url: "",
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

  componentWillUnmount() {
    clearTimeout(this.timeoutId);
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

    this.setState({ status: "sending" });

    const data = {
      motif,
      message,
      email,
      url: document.location.href,
      userAgent: typeof navigator !== "undefined" && navigator.userAgent,
      subject: question
    };
    this.props
      .onSubmit(data)
      .then(() => {
        this.setState({
          status: "sent",
          email: "",
          message: "",
          motif: motifLabels[0]
        });
      })
      .catch(() => {
        this.setState({ status: "error" });
      })
      .then(() => {
        this.timeoutId = setTimeout(() => this.setState({ status: "" }), 3000);
      });
  };

  getAlert() {
    switch (this.state.status) {
      case "sent":
        return <Alert success>Message bien envoyé !</Alert>;

      case "error":
        return <Alert warning>Impossible d&apos;envoyer votre message</Alert>;

      default:
        return null;
    }
  }
  render() {
    const { results, query, url } = this.props;

    return (
      <form
        action={feedbackUrl}
        className="feedback__form"
        onSubmit={this.onSubmit}
      >
        <input
          type="text"
          name="question"
          value={this.props.query}
          onChange={this.inputChange}
          className="feedback__input"
          disabled
        />
        <input
          type="hidden"
          name="url"
          value={document ? document.location.href : url}
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
          Laissez-nous un commentaire sur notre service{" "}
          <span className="fontweight--normal fontweight--italic">
            {" "}
            - facultatif
          </span>
        </h2>
        <select
          name="motif"
          onChange={this.inputChange}
          onBlur={this.inputChange}
          className="feedback__input"
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
          className="feedback__input"
          placeholder="Les informations ..."
          onChange={this.inputChange}
          value={this.state.message}
        />
        <input
          type="email"
          name="email"
          onChange={this.inputChange}
          placeholder="nom@adresse.email"
          className="feedback__input"
          value={this.state.email}
        />
        <div className="feedback__action">
          <button
            className="feedback__button btn btn__primary"
            disabled={this.state.status === "sending"}
          >
            Envoyer ma question
          </button>
          <div className="feedback__status"> {this.getAlert()} </div>
        </div>
      </form>
    );
  }
}

export { FeedbackForm };
