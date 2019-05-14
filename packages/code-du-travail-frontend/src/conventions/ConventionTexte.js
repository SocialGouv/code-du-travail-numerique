import React from "react";
import getConfig from "next/config";
import Sidebar from "./texte/Sidebar";
import Content from "./texte/Content";
import styled from "styled-components";
import {
  buildIndexMap,
  getIndexesFromIds,
  buildNestedAccessor
} from "../lib/indexMaps";
import update from "immutability-helper";
import { theme } from "@cdt/ui/";

const {
  publicRuntimeConfig: { API_DILA2SQL_URL }
} = getConfig();

class ConventionTexte extends React.Component {
  constructor(props) {
    super(props);
    this.state = { loaded: false, structure: null };
  }

  async componentDidMount() {
    const { id } = this.props;
    const texte = await this.fetchTexte({ id });
    const rootNode = this.getRootNode(texte);
    const indexMap = buildIndexMap(rootNode);
    this.setState({
      texte,
      rootNode,
      indexMap,
      loaded: true
    });
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
    const { indexMap, rootNode } = this.state;
    const indexes = getIndexesFromIds([sectionId], indexMap);
    const accessor = buildNestedAccessor({ $merge: { expanded } }, indexes);
    const newRootNode = update(rootNode, accessor);
    this.setState({ rootNode: newRootNode });
  }

  onChangeArticleVisibility(visible, idList) {
    const { indexMap, rootNode } = this.state;
    const indexes = getIndexesFromIds(idList, indexMap);
    const accessor = buildNestedAccessor({ $merge: { visible } }, indexes);
    const newRootNode = update(rootNode, accessor);
    this.setState({ rootNode: newRootNode });
  }

  render() {
    const { loaded, texte, rootNode } = this.state;
    return (
      <Wrapper>
        {!loaded && "loading..."}
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
            <Content
              rootNode={rootNode}
              texte={texte}
              onChangeArticleVisibility={(visible, idList) =>
                this.onChangeArticleVisibility(visible, idList)
              }
            />
          </ContentWrapper>
        )}
      </Wrapper>
    );
  }
}

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
