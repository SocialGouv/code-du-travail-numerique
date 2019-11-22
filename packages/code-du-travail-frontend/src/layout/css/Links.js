import { createGlobalStyle } from "styled-components";
import { theme } from "@socialgouv/react-ui";

const { animations, colors } = theme;
export default createGlobalStyle`
  a {
    color: ${colors.paragraph};
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
    text-decoration: underline;
    text-decoration-color: ${colors.primary};
    transition: all ${animations.transitionTiming} linear;
  }

  a:focus,
  a:hover,
  a:active {
    color: ${colors.primary};
  }

  a:visited {
    text-decoration-color: ${colors.secondary};
  }
  a[target="_blank"]:not(.no-after):after,
  a[href^="http://"]:not(.no-after):not([href*="social.gouv.fr"]):after,
  a[href^="https://"]:not(.no-after):not([href*="social.gouv.fr"]):after{
    position: relative;
    top: 1px;
    display: inline-block;
    width: 15px;
    height: 15px;
    margin-left: 5px;
    background: url("/static/assets/icons/external-link.svg") no-repeat 100% 50%;
    background-size: 15px;
    content: "";
  }
`;
