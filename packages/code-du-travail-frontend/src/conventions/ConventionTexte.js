import React from "react";
import PropTypes from "prop-types";
import { fetchTexte } from "../common/convention.service";
import Sidebar from "./texte/Sidebar";
import Content from "./texte/Content";
import styled from "styled-components";
import { theme } from "@cdt/ui/";
import tocbot from "tocbot";
import debounce from "../lib/pDebounce";

class ConventionTexte extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tocbotEnabled: false,
      tocbotMounted: false,
      loaded: false
    };
  }

  async componentDidMount() {
    const { id } = this.props;
    const texte = await fetchTexte({ id });
    const rootNode = this.getFirstNodeWithChildren(texte);
    this.setState({ texte, rootNode, loaded: true });
    this.onResize();
    this.resizeEventHandler = debounce(() => this.onResize(), 250);
    window.addEventListener("resize", this.resizeEventHandler);
  }

  componentDidUpdate() {
    this.mountOrUnmountTocbot();
  }

  componentWillUnmount() {
    tocbot.destroy();
    window.removeEventListener("resize", this.resizeEventHandler);
  }

  onResize() {
    this.setState({
      tocbotEnabled: window.innerWidth > parseInt(theme.breakpoints.tablet, 10)
    });
  }

  mountOrUnmountTocbot() {
    const { tocbotMounted, tocbotEnabled } = this.state;
    if (tocbotEnabled == tocbotMounted) return;
    if (tocbotEnabled) {
      tocbot.init({
        headingSelector: "h3, h4, h5",
        skipRendering: true,
        scrollSmooth: false
      });
      this.setState({ tocbotMounted: true });
    } else {
      tocbot.destroy();
      this.setState({ tocbotMounted: false });
    }
  }

  getFirstNodeWithChildren(texte) {
    let rootNode = texte;
    while (rootNode.children && rootNode.children.length == 1) {
      rootNode = rootNode.children[0];
    }
    return rootNode.children ? rootNode : texte;
  }

  onChangeSummaryTitleExpanded = (sectionId, expanded) => {
    const { rootNode } = this.state;
    const sectionIdx = rootNode.children.findIndex(
      child => child.data.id == sectionId
    );
    const newSection = { ...rootNode.children[sectionIdx], expanded };
    const newChildren = [...rootNode.children];
    newChildren[sectionIdx] = newSection;
    const newRootNode = { ...rootNode, children: newChildren };
    this.setState({ rootNode: newRootNode });
  };

  render() {
    const { loaded, texte, rootNode, tocbotEnabled } = this.state;
    return (
      <Wrapper>
        {!loaded && "chargement ..."}
        {loaded && (
          <SidebarWrapper>
            <Sidebar
              node={rootNode}
              onSummaryTitleToggleExpanded={this.onChangeSummaryTitleExpanded}
              tocbotEnabled={tocbotEnabled}
            />
          </SidebarWrapper>
        )}
        {loaded && (
          <ContentWrapper>
            <Content node={rootNode} texte={texte} />
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
