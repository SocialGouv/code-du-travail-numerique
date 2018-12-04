import React from "react";
import PropTypes from "prop-types";
import { Alert, NoAnswer, Section, Button } from "@cdt/ui";
import { FeedbackModal } from "../common/FeedbackModal";

class AddressResults extends React.Component {
  static propTypes = {
    query: PropTypes.string.isRequired,
    results: PropTypes.arrayOf(
      PropTypes.shape({
        _source: PropTypes.shape({
          title: PropTypes.string.isRequired,
          address: PropTypes.shape({
            lignes: PropTypes.arrayOf(PropTypes.string).isRequired,
            code: PropTypes.string.isRequired,
            city: PropTypes.string.isRequired
          }),
          tel: PropTypes.string.isRequired,
          email: PropTypes.string
        })
      })
    )
  };

  state = {
    feedbackVisible: false
  };

  showFeedBackPopup = () => {
    this.setState({ feedbackVisible: true });
  };

  closeModal = () => {
    this.setState({ feedbackVisible: false });
  };

  render() {
    const { results, query } = this.props;
    let output;
    if (results.length === 0) {
      output = <NoResults />;
    } else {
      output = <AddressCards data={results} />;
    }

    return (
      <Section>
        <h1>Adresse</h1>
        {output}
        <NoAnswer>
          <Button onClick={this.showFeedBackPopup}>Posez votre question</Button>
        </NoAnswer>
        <FeedbackModal
          results={results.slice(3)}
          isOpen={this.state.feedbackVisible}
          closeModal={this.closeModal}
          query={query}
        />
      </Section>
    );
  }
}

export { AddressResults };

function NoResults() {
  return (
    <Alert category="primary">
      Nous n’avons pas trouvé de résultat pour votre recherche.
    </Alert>
  );
}

function AddressCards({ data }) {
  return (
    <ul>
      {data.map(item => (
        <AddressCard key={item._id} address={item._source} />
      ))}
    </ul>
  );
}

function AddressCard({ address }) {
  return <li>{address.title}</li>;
}
