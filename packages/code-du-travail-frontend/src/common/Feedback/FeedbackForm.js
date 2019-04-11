import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { theme, Alert } from "@cdt/ui";

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
    source: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired,
    isSatisfied: PropTypes.bool.isRequired
  };
  static defaultProps = {
    query: "",
    url: ""
  };
  state = {
    status: "", // "" | "sending" | "error"
    motif: null,
    message: "",
    question: this.props.query,
    email: ""
  };
  timeoutId = null;
  texteareaRef = React.createRef();

  static getDerivedStateFromProps(props) {
    return {
      motif: !props.isSatisfied ? motifLabels[0] : null
    };
  }

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

  onSubmit = async event => {
    event.preventDefault();
    const { question, motif, message } = this.state;
    if (message.replace(/\s+/, "").trim() === "") {
      alert("Merci de compléter le formulaire");
      return;
    }
    this.setState({ status: "sending" });

    const titreArticle = document.querySelector(".article__title");

    const data = {
      motif,
      message,
      source: this.props.source,
      url: document.location.href,
      userAgent: typeof navigator !== "undefined" && navigator.userAgent,
      subject: question,
      isSatisfied: this.props.isSatisfied,
      titreArticle: titreArticle ? titreArticle.innerText : "not found"
    };
    try {
      await this.props.onSubmit(data);
      this.setState({
        status: "",
        message: "",
        motif: motifLabels[0]
      });
    } catch (error) {
      this.setState({ status: "error" });
      this.timeoutId = setTimeout(() => this.setState({ status: "" }), 3000);
    }
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
    const { query, url, source, isSatisfied } = this.props;

    return (
      <StyledForm action={feedbackUrl} onSubmit={this.onSubmit}>
        <p>
          <strong>Merci pour votre réponse !</strong>
        </p>
        <p>
          Vous souhaitez nous aider à améliorer le Code du travail numérique ?
          Laissez-nous un commentaire :
        </p>
        <input type="hidden" name="question" value={query} />
        <input
          type="hidden"
          name="url"
          value={document ? document.location.href : url}
        />
        <input type="hidden" name="source" value={source} />
        {!isSatisfied && (
          <StyledInput
            as="select"
            name="motif"
            onChange={this.inputChange}
            onBlur={this.inputChange}
            value={this.state.motif}
          >
            {motifLabels.map((label, i) => (
              <option key={`motif-${i}`} value={label}>
                {label}
              </option>
            ))}
          </StyledInput>
        )}
        <StyledInput
          as="textarea"
          ref={this.texteareaRef}
          name="message"
          placeholder="Les informations ..."
          onChange={this.inputChange}
          value={this.state.message}
        />

        <FormAction>
          <button
            className="btn btn__primary btn__feedback"
            disabled={this.state.status === "sending"}
          >
            Envoyer mon commentaire
          </button>
          <Status>{this.getAlert()}</Status>
        </FormAction>
      </StyledForm>
    );
  }
}

export { FeedbackForm };

const { spacing } = theme;

const StyledForm = styled.form`
  display: flex;
  width: 100%;
  flex-direction: column;
  align-items: stretch;
`;

const StyledInput = styled.input`
  margin-bottom: ${spacing.medium};
`;

const FormAction = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Status = styled.div`
  flex-basis: 100%;
  margin: 0;
  margin-top: ${spacing.medium};
`;
