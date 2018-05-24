import React from "react";
import styled from "styled-components";
import StarRating from "react-star-rating-component";

// form de feedback
const FeedBackField = styled.textarea`
  width: 100%;
  height: 60px;
  font-size: 0.9em;
  margin-top: 10px;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid #ddd;
`;

const EmailField = styled.input`
  width: 100%;
  font-size: 0.9em;
  padding: 5px;
  box-sizing: border-box;
  border: 1px solid #ddd;
`;

const FeedbackSubmitButton = styled.button`
  width: 100%;
  border: 1px solid #ddd;
  background: #eee;
  padding: 10px;
`;

const SuccessMessage = styled.div`
  padding: 10px;
  background-color: #e1ffe1;
  text-align: center;
`;

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
          body: JSON.stringify(this.state)
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
    return (
      <div>
        <div>
          Avons-nous répondu à votre question ?{" "}
          <StarRating
            name="stars"
            value={this.state.stars}
            onStarClick={num => this.setState({ stars: num })}
          />
        </div>
        <FeedBackField
          onChange={e => this.setState({ message: e.target.value })}
          value={this.state.message}
          required={true}
          placeholder="Vos commentaires constructifs nous permettront d'améliorer notre service"
        />
        <EmailField
          onChange={e => this.setState({ email: e.target.value })}
          value={this.state.email}
          required={true}
          placeholder="Votre email"
        />
        {this.state.status === "sent" ? (
          <SuccessMessage>Message bien envoyé !</SuccessMessage>
        ) : (
          <FeedbackSubmitButton
            disabled={this.state.status === "sending"}
            onClick={this.submit}
          >
            Envoyer
          </FeedbackSubmitButton>
        )}
      </div>
    );
  }
}

export default FeedbackForm;
