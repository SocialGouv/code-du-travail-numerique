import { createGlobalStyle } from "styled-components";
import { theme } from "@cdt/ui";

const { animations, box, colors, fonts, spacing } = theme;
export default createGlobalStyle`
  *,
  *:after,
  *:before {
    box-sizing: border-box;
  }

  html {
    font-family: Muli, -apple-system, BlinkMacSystemFont, "Helvetica Neue",
      Helvetica, Arial, sans-serif;
    /* http://meyerweb.com/eric/thoughts/2006/02/08/unitless-line-heights/ */
    line-height: ${fonts.lineHeight}
    -webkit-text-size-adjust: 100%; /* Prevent font scaling in landscape while allowing user zoom. */
    -webkit-font-smoothing: antialiased;
  }

  body {
    margin: 0;
    color: ${colors.lightText};
    font-size: ${fonts.sizeBase};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
    background: ${colors.darkBackground};
    border-top: 5px solid ${colors.blue};
  }

  main {
    background: ${colors.lightBackground};
  }

  /* Text-level semantics
  --------------------------------------------------------------------------- */

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    color: ${colors.title};
    line-height: ${fonts.lineHeight};
    font-weight: 700;
    margin: ${spacing.xsmall} 0 ${spacing.small} 0;
  }

  h1 {
    font-size: ${fonts.sizeH1};
    font-weight: 400;
  }

  h2 {
    font-size: ${fonts.sizeH2};
    font-weight: 400;
  }

  h3 {
    font-size: ${fonts.sizeH3};
  }

  h4 {
    font-size: ${fonts.sizeH4};
  }

  h5 {
    font-size: ${fonts.sizeH5};
  }

  h6 {
    font-size: ${fonts.sizeH6};
  }

  /* Lists
  --------------------------------------------------------------------------- */

  ul,
  ol {
    padding-left: ${spacing.medium};
  }

  /* Divider
  --------------------------------------------------------------------------- */

  hr {
    width: 100%;
    border: 1px solid ${colors.elementBorder};
    border-width: 1px 0 0 0;
  }

  /* Code
  --------------------------------------------------------------------------- */

  code {
    padding: 2px;
    border-radius: 2px;
    font-family: "Consolas", "Monaco", "Menlo", monospace;
    background: ${colors.elementBackground};
    border: 1px solid ${colors.elementBorder};
    word-wrap: break-word;
  }

  /* Mark
  --------------------------------------------------------------------------- */

  mark {
    background: ${colors.markBackground};
  }

  .section__title {
    color: ${colors.title};
    line-height: ${fonts.lineHeight};
    font-weight: 700;
    font-size: ${fonts.sizeH3};
  }

  .section__subtitle {
    color: ${colors.title};
    line-height: calc(${fonts.lineHeight} * 2);
    font-weight: 700;
    font-size: ${fonts.sizeH5};
  }

  /* Links
  --------------------------------------------------------------------------- */
  a,
  a:visited {
    text-decoration: underline;
    color: ${colors.blue};
  }

  a:focus,
  a:hover,
  a:active {
    text-decoration: none;
  }


  /* Forms
  --------------------------------------------------------------------------- */

  label {
    cursor: pointer;
  }

  label + textarea,
  label > textarea {
    vertical-align: top;
  }

  fieldset {
    border: 1px solid ${colors.elementBorder};
    padding: ${spacing.base};
  }

  textarea,
  input[type="text"],
  input[type="number"],
  input[type="email"],
  input[type="search"],
  input[type="password"],
  input[type="tel"],
  input[type="url"] {
    appearance: none;

    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    color: inherit;

    background: ${colors.white};
    border: 1px solid ${colors.elementBorder};
    border-radius: ${box.borderRadius};
    max-width: 100%;
    padding: ${spacing.small} ${spacing.base};

    &:focus {
      border: 1px solid ${colors.focus};
      box-shadow: 0 0 2px 2px ${colors.focusShadow};
    }
  }

  textarea {
    min-height: 8rem;
  }
  input[type="radio"] {
    font: inherit;
    line-height: inherit;
    color: inherit;
    appearance: none;
    border: 1px solid ${colors.elementBorder};
    background: ${colors.white};
    vertical-align: middle;
    position: relative;
    margin-right: ${spacing.tiny};
    margin-top: 0;
    height: 1em;
    width: 1em;
    border-radius: 50%;
    display: inline-block;
    padding: 0;
  }
  input[type="radio"]::before {
    content: "";
    border-color: ${colors.blue};
    border-radius: 50%;
    position: absolute;
    top: calc(0.25em -1px);
    left: calc(0.25em -1px);
    width: 0.5em;
    height: 0.5em;
    transform: scale(0);
  }

  input[type="radio"]:checked {
    background-color: ${colors.white};
    border-color: ${colors.blue};
  }

  input[type="radio"]:checked::before {
    background-color: ${colors.blue};
    transform: scale(1);
    transition: transform ${animations.transitionTiming} ease-out;
  }

  input[type="radio"]:focus {
    box-shadow: none;
  }
  input[type="radio"]:-moz-focusring {
    box-shadow: 0 0 0.15em 0.15em ${colors.focusShadow};
  }
  input[type="radio"]:focus-visible {
    box-shadow: 0 0 0.15em 0.15em ${colors.focusShadow};
  }

  input[type="radio"]:focus:not(:focus-visible) {
    outline: none;
    border-color: ${colors.focus};
  }
  input[type="radio"]:focus:not(:-moz-focusring) {
    outline: none;
    border-color: ${colors.focus};
  }

  select {
    appearance: none;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    color: inherit;

    padding: ${spacing.small} ${spacing.base};
    color: ${colors.black};
    border-radius: ${box.borderRadius};
    border: 1px solid ${colors.elementBorder};
    vertical-align: middle;
    position: relative;
    background: ${colors.white}
      url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 12 7"><path fill="gray" d="M.255 1.513a.899.899 0 0 1 0-1.253.853.853 0 0 1 1.227 0L6 4.879l4.517-4.62a.853.853 0 0 1 1.227 0c.34.35.34.905 0 1.254L6.631 6.741a.851.851 0 0 1-.63.259.852.852 0 0 1-.632-.259L.255 1.513z"/></svg>')
      no-repeat;
    background-position: top 1em right 0.75em;
    background-size: 0.7em;
    padding-right: 45px;
    border-radius: 3px;
    width: auto;
    transition: border-color ${animations.transitionTiming} ease;
  }

  select:disabled {
    background-color: ${colors.darkBackground};
  }

  select:focus {
    outline: none;
    border-color: ${colors.blueLight};
    box-shadow: 0 0 0.15rem 0.15rem ${colors.focusShadow};
  }

`;
