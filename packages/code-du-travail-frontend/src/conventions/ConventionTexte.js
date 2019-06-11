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
    if (props.preloadedTexte) {
      const texte = props.preloadedTexte;
      const topNode = this.getFirstNodeWithChildren(texte);
      this.state = { topNode, texte, loaded: true };
    } else {
      this.state = { loaded: false };
    }
  }

  async componentDidMount() {
    if (this.state.texte) {
      return false;
    }
    const { id } = this.props;
    const texte = await fetchTexte({ id });
    const topNode = this.getFirstNodeWithChildren(texte);
    this.setState({ texte, topNode, loaded: true });
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
    if (!!tocbotEnabled == !!tocbotMounted) return;
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
    let topNode = texte;
    while (topNode.children && topNode.children.length == 1) {
      topNode = topNode.children[0];
    }
    return topNode.children ? topNode : texte;
  }

  onChangeSummaryTitleExpanded = (sectionId, expanded) => {
    const { topNode } = this.state;
    const sectionIdx = topNode.children.findIndex(
      child => child.data.id == sectionId
    );
    const newSection = { ...topNode.children[sectionIdx], expanded };
    const newChildren = [...topNode.children];
    newChildren[sectionIdx] = newSection;
    const newRootNode = { ...topNode, children: newChildren };
    this.setState({ topNode: newRootNode });
  };

  render() {
    const { loaded, texte, topNode, tocbotEnabled } = this.state;
    return (
      <Wrapper>
        {!loaded && "chargement ..."}
        {loaded && (
          <SidebarWrapper>
            <Sidebar
              node={topNode}
              onSummaryTitleToggleExpanded={this.onChangeSummaryTitleExpanded}
              tocbotEnabled={tocbotEnabled}
            />
          </SidebarWrapper>
        )}
        {loaded && (
          <ContentWrapper>
            <Content node={topNode} texte={texte} />
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
