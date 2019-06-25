import React from "react";
import { withRouter } from "next/router";
import { theme } from "@cdt/ui";
import { Link } from "../../routes";
import styled from "styled-components";
import FindConventionExplainer from "./FindConventionExplainer";
import { CompanyForm } from "../common/CompanyForm";
import {
  searchIdcc,
  searchCompanies,
  getCompany
} from "../common/convention.service";

class Kali extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      conventions: props.initialConventions,
      query: ""
    };
  }

  handleChange(event) {
    const query = event.target.value;
    this.setState({ query });
    searchIdcc(query)
      .then(hits => hits.map(h => h._source))
      .then(conventions => this.setState({ conventions }));
  }

  render() {
    const { conventions } = this.state;
    const { query } = this.state;

    return (
      <React.Fragment>
        <h2>Conventions collectives nationales</h2>
        <FindConventionExplainer />
        <h3>Trouver ma convention via mon entreprise</h3>
        <CompanyForm onSearch={searchCompanies} getCompany={getCompany} />
        <h3>Liste exhaustive</h3>
        <Label htmlFor="query">
          Filtrez par identifiant (IDCC) ou nom de branche :
        </Label>
        <input
          placeholder="Ex: Architecture"
          type="text"
          name="query"
          id="query"
          value={query}
          onChange={e => this.handleChange(e)}
        />
        <ConventionsList items={conventions} />
      </React.Fragment>
    );
  }
}

class List extends React.PureComponent {
  render() {
    const { items, ...props } = this.props;
    return (
      <ul {...props}>
        {items.map(({ id, slug, idcc, titleShort, title }) => (
          <Item key={id}>
            <Link route="kali" params={{ slug }} passHref>
              <Line>
                <Idcc>{idcc}</Idcc>
                <Title>{titleShort || title}</Title>
              </Line>
            </Link>
          </Item>
        ))}
      </ul>
    );
  }
}

// const List = ({ items, ...props }) => (
//   <ul {...props}>
//     {items.map(({ id, slug, idcc, titleShort }) => (
//       <Item key={id}>
//         <Link route="kali" params={{ slug }} passHref>
//           <Line>
//             <Idcc>{idcc}</Idcc>
//             <Title>{titleShort}</Title>
//           </Line>
//         </Link>
//       </Item>
//     ))}
//   </ul>
// );

const ConventionsList = styled(List)`
  list-style-type: none;
  padding-left: 0;
`;

const Item = styled.li`
  margin-bottom: ${theme.spacing.small};
`;

const Line = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
  &:hover {
    text-decoration: underline;
  }
`;

const Title = styled.div``;
const Idcc = styled.div`
  text-align: right;
  padding-right: ${theme.spacing.small};
  width: 50px;
  color: #666;
`;

const Label = styled.label`
  display: block;
`;

export default withRouter(Kali);
