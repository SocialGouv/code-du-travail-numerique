import { createGlobalStyle } from "styled-components";

import { animations, breakpoints } from "../../theme.js";

export default createGlobalStyle`
  a {
    color: ${({ theme }) => theme.paragraph};
    font-weight: 600;
    font-family: 'Open Sans', sans-serif;
    text-decoration: underline;
    text-decoration-color: ${({ theme }) => theme.primary};
    transition: color ${animations.transitionTiming} linear, text-decoration ${
  animations.transitionTiming
} linear;
    @media print {
      text-decoration: none;
    }
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
    @media print {
      margin-left: 0;
      content: " (" attr(href) ") ";
    }
  }
  :target::before {
    position: relative;
    z-index: -1;
    display: block;
    height: 14rem; /* Fixed header's height */
    margin-top: -14rem; /* Fixed header's negative height */
    visibility: hidden;
    content: "";
    pointer-events: none;
    @media (max-width: ${breakpoints.mobile}) {
      height: 12rem;
      margin-top: -12rem;
    }
  }
`;
