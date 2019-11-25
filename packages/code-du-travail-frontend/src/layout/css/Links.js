import { createGlobalStyle } from "styled-components";
import { theme } from "@socialgouv/react-ui";

const { animations } = theme;
export default createGlobalStyle`
  a {
    color: ${({ theme }) => theme.paragraph};
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.primary};
    transition: all ${animations.transitionTiming} linear;
  }

  a:focus,
  a:hover,
  a:active {
    color: ${({ theme }) => theme.primary};
  }

  a:visited {
    text-decoration-color: ${({ theme }) => theme.secondary};
  }
  a[target="_blank"]:not(.no-after):after,
  a[href^="http://"]:not(.no-after):not([href*="social.gouv.fr"]):after,
  a[href^="https://"]:not(.no-after):not([href*="social.gouv.fr"]):after{
    position: relative;
    top: 2px;
    width: 16px;
    height: 23px;
    margin-left: 5px;
    content: url("/static/assets/icons/external.svg");
  }
`;
