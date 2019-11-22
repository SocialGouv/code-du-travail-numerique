import { createGlobalStyle } from "styled-components";
import { theme } from "@socialgouv/react-ui";

const { animations, box, colors, spacings } = theme;

const RADIO_SIZE = "1.1em";

// We have to move this into UI as soon as possible
export default createGlobalStyle`
  label {
    cursor: pointer;
  }

  fieldset {
    padding: ${spacings.base};
    border: ${box.border};
  }


  textarea {
    min-height: 8rem;
  }

  textarea,
  input {
    max-width: 100%;
    padding: ${spacings.small} ${spacings.base};
    color: inherit;

    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    background: ${colors.white};
    border: ${box.border};
    border-radius: ${box.borderRadius};
    appearance: none;

    label + &, label > & {
     vertical-align: top;
    }
  }

  input[type="radio"] {
    position: relative;
    display: inline-block;
    flex-shrink: 0;
    width: ${RADIO_SIZE};
    height: ${RADIO_SIZE};
    margin: 0 ${spacings.tiny} calc(1em / 10) 0;
    padding: 0;
    color: inherit;
    font: inherit;
    line-height: inherit;
    background: ${colors.white};
    border: ${box.border};
    border-radius: 50%;
    cursor: pointer;
    appearance: none;
  }
  input[type="radio"]:checked {
    background-color: ${colors.white};
    border-color: ${colors.primary};
  }
  input[type="radio"]::before {
    position: absolute;
    top: calc(50% - ${RADIO_SIZE} / 4);
    left: calc(50% - ${RADIO_SIZE} / 4);
    width: calc(${RADIO_SIZE} / 2);
    height: calc(${RADIO_SIZE} / 2);
    background-color: ${colors.secondary};
    border-radius: 50%;
    transform: scale(0);
    transition: all ${animations.transitionTiming} ease-out;
    content: "";
  }
  input[type="radio"]:checked::before {
    background-color: ${colors.primary};
    transform: scale(1);
  }

  select {
    position: relative;
    padding: ${spacings.small} ${spacings.base};
    padding-right: ${spacings.large};
    color: ${colors.paragraph};
    font-size: inherit;
    font-family: inherit;
    line-height: inherit;
    vertical-align: middle;
    background: ${colors.white} url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBvbHlsaW5lIGZpbGw9Im5vbmUiIHBvaW50cz0iMjEsOC41IDEyLDE3LjUgMyw4LjUgIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+") no-repeat;
    background-position: top .9rem right .75em;
    background-size: 0.7em;
    border: ${box.border};
    border-radius: ${box.borderRadius};
    transition: border-color ${animations.transitionTiming} ease;
    appearance: none;
  }

  select:disabled {
    background-color: ${colors.bgTertiary};
  }

`;
