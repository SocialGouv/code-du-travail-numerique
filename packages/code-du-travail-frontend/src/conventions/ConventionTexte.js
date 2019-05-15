import React from "react";
import PropTypes from "prop-types";
import getConfig from "next/config";
import Sidebar from "./texte/Sidebar";
import Content from "./texte/Content";
import styled from "styled-components";
import { theme } from "@cdt/ui/";

const {
  publicRuntimeConfig: { API_DILA2SQL_URL }
} = getConfig();

class ConventionTexte extends React.Component {
  constructor(props) {
    super(props);
    if (props.preloadedTexte) {
      const texte = props.preloadedTexte;
      const rootNode = this.getRootNode(texte);
      this.state = { rootNode, texte, loaded: true };
    } else {
      this.state = { loaded: false };
    }
  }

  async componentDidMount() {
    if (this.state.texte) {
      return false;
    }
    const { id } = this.props;
    const texte = await this.fetchTexte({ id });
    const rootNode = this.getRootNode(texte);
    this.setState({ texte, rootNode, loaded: true });
  }

  getRootNode(startNode) {
    let rootNode = startNode;
    while (rootNode.children && rootNode.children.length == 1) {
      rootNode = rootNode.children[0];
    }
    return rootNode.children ? rootNode : startNode;
  }

  fetchTexte({ id }) {
    const url = `${API_DILA2SQL_URL}/base/KALI/texte/${id}`;
    return fetch(url).then(r => r.json());
  }

  onChangeSummaryTitleExpanded(expanded, sectionId) {
    const { rootNode } = this.state;
    const sectionIdx = rootNode.children.findIndex(
      child => child.data.id == sectionId
    );
    const newSection = { ...rootNode.children[sectionIdx], expanded };
    const newChildren = [...rootNode.children];
    newChildren[sectionIdx] = newSection;
    const newRootNode = { ...rootNode, children: newChildren };
    this.setState({ rootNode: newRootNode });
  }

  render() {
    const { loaded, texte, rootNode } = this.state;
    return (
      <Wrapper>
        {!loaded && "chargement ..."}
        {loaded && (
          <SidebarWrapper>
            <Sidebar
              rootNode={rootNode}
              onSummaryTitleToggleExpanded={(sectionId, visible) =>
                this.onChangeSummaryTitleExpanded(visible, sectionId)
              }
            />
          </SidebarWrapper>
        )}
        {loaded && (
          <ContentWrapper>
            <Content rootNode={rootNode} texte={texte} />
          </ContentWrapper>
        )}
      </Wrapper>
    );
  }
}

ConventionTexte.propTypes = {
  id: PropTypes.string.isRequired,
  preloadedTexte: PropTypes.shape({
    children: PropTypes.array
  })
};

const Wrapper = styled.div`
  @media (min-width: ${theme.breakpoints.tablet}) {
    display: flex;
  }
`;

const SidebarWrapper = styled.div`
  @media (min-width: ${theme.breakpoints.tablet}) {
    flex: 0 1 40%;
    position: sticky;
    top: 0px;
    max-height: 100vh;
    overflow: scroll;
    padding-right: 20px;
  }
`;

const ContentWrapper = styled.div`
  @media (min-width: ${theme.breakpoints.tablet}) {
    flex: 0 1 60%;
    overflow: scroll;
    padding-left: 10px;
  }
`;

export default ConventionTexte;
