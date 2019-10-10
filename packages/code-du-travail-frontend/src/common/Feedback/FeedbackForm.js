import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { Alert } from "@cdt/ui-old";
import { Button, theme } from "@socialgouv/react-ui";

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
    title: PropTypes.string,
    isSatisfied: PropTypes.bool.isRequired,
    onSubmit: PropTypes.func.isRequired,
    sourceFilter: PropTypes.string.isRequired,
    sourceType: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired
  };
  static defaultProps = {
    query: "",
    title: ""
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

    const data = {
      sourceFilter: this.props.sourceFilter,
      isSatisfied: this.props.isSatisfied,
      message,
      motif,
      query: this.props.query,
      sourceType: this.props.sourceType,
      subject: question,
      title: this.props.title,
      url: document.location.href,
      userAgent: typeof navigator !== "undefined" && navigator.userAgent
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
        return <Alert variant="success">Message bien envoyé !</Alert>;

      case "error":
        return (
          <Alert variant="warning">Impossible d’envoyer votre message</Alert>
        );

      default:
        return null;
    }
  }

  render() {
    const { query, url, sourceType, isSatisfied } = this.props;

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
        <input type="hidden" name="url" value={url} />
        <input type="hidden" name="sourceType" value={sourceType} />
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
          <Button variant="primary" disabled={this.state.status === "sending"}>
            Envoyer mon commentaire
          </Button>
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
