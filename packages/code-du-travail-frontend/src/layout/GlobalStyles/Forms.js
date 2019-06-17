import { createGlobalStyle } from "styled-components";
import { theme } from "@cdt/ui";

const { animations, box, colors, spacing } = theme;

export default createGlobalStyle`
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
    position: relative;
    padding: ${spacing.small} ${spacing.base};
    padding-right: ${spacing.large};
    appearance: none;
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    color: ${colors.black};
    vertical-align: middle;
    background: ${
      colors.white
    } url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBvbHlsaW5lIGZpbGw9Im5vbmUiIHBvaW50cz0iMjEsOC41IDEyLDE3LjUgMyw4LjUgIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+") no-repeat;
    background-position: top .9rem right .75em;
    background-size: 0.7em;
    border: 1px solid ${colors.elementBorder};
    border-radius: ${box.borderRadius};
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
