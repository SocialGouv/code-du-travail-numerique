import React from "react";
import { withRouter } from "next/router";
import getConfig from "next/config";
import fetch from "isomorphic-unfetch";
import { Button } from "@cdt/ui";
import { ExternalLink } from "react-feather";
import Answer from "../src/search/Answer";

const {
  publicRuntimeConfig: { API_URL }
} = getConfig();

// a FAQ answer

const fetchKali = ({ slug }) =>
  fetch(`${API_URL}/items/kali/${slug}`).then(r => r.json());

class Kali extends React.Component {
  static async getInitialProps({ res, query }) {
    return await fetchKali(query)
      .then(data => ({
        data
      }))
      .catch(e => {
        console.log("e", e);
        res.statusCode = 404;
        throw e;
      });
  }

  render() {
    const { data } = this.props;
    return (
      <Answer
        title={data._source.title}
        emptyMessage="Cette convention collective n'a pas été trouvée"
        footer="Informations fournies par la DILA"
      >
        <p>
          Cliquez sur le lien ci dessous pour accéder à la convention collective
          sur LegiFrance :
        </p>
        <a target="_blank" href={data._source.url}>
          <Button primary>
            <ExternalLink
              style={{ verticalAlign: "middle", marginRight: 10 }}
            />
            {data._source.title}
          </Button>{" "}
        </a>
      </Answer>
    );
  }
}

export default withRouter(Kali);
