import { createGlobalStyle } from "styled-components";
import { theme } from "@socialgouv/react-ui";

const { animations, box, fonts, spacings } = theme;

const RADIO_SIZE = "1.6rem";
const INPUT_HEIGHT = "5.4rem";

// We have to move this into UI as soon as possible
export default createGlobalStyle`
  input {
    height: ${INPUT_HEIGHT};
  }

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
    padding: 0 ${spacings.medium};
    color: ${({ theme }) => theme.paragraph};
    font-size: ${fonts.sizes.default};
    font-family: "Open Sans", sans-serif;
    line-height: inherit;
    background: ${({ theme }) => theme.white};
    border: 1px solid transparent;
    border-radius: ${box.borderRadius};
    box-shadow: ${box.shadow.default};
    appearance: none;

    label + &, label > & {
     vertical-align: top;
    }

    &::placeholder {
      color:${({ theme }) => theme.placeholder};
    }
  }

  input[type="radio"] {
    position: relative;
    display: inline-block;
    flex-shrink: 0;
    width: ${RADIO_SIZE};
    height: ${RADIO_SIZE};
    margin: 0 ${spacings.small} 0 ${spacings.tiny};
    padding: 0;
    line-height: inherit;
    background: ${({ theme }) => theme.white};
    border: ${box.border};
    border-radius: 50%;
    box-shadow: none;
    cursor: pointer;
    appearance: none;
  }
  input[type="radio"]:checked {
    background-color: ${({ theme }) => theme.white};
    border-color: ${({ theme }) => theme.primary};
  }
  input[type="radio"]::before {
    position: absolute;
    top: calc(50% - ${RADIO_SIZE} / 4);
    left: calc(50% - ${RADIO_SIZE} / 4);
    width: calc(${RADIO_SIZE} / 2);
    height: calc(${RADIO_SIZE} / 2);
    background-color: ${({ theme }) => theme.secondary};
    border-radius: 50%;
    transform: scale(0);
    transition: all ${animations.transitionTiming} ease-out;
    content: "";
  }
  input[type="radio"]:checked::before {
    background-color: ${({ theme }) => theme.primary};
    transform: scale(1);
  }

  select {
    position: relative;
    height: ${INPUT_HEIGHT};
    padding: 0 ${spacings.medium};
    padding-right: ${spacings.large};
    color: ${({ theme }) => theme.paragraph};
    font-size: ${fonts.sizes.default};
    font-family: "Open Sans", sans-serif;
    vertical-align: middle;
    background: ${({ theme }) =>
      theme.white} url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiA/PjwhRE9DVFlQRSBzdmcgIFBVQkxJQyAnLS8vVzNDLy9EVEQgU1ZHIDEuMC8vRU4nICAnaHR0cDovL3d3dy53My5vcmcvVFIvMjAwMS9SRUMtU1ZHLTIwMDEwOTA0L0RURC9zdmcxMC5kdGQnPjxzdmcgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAwIDAgMjQgMjQiIGlkPSJMYXllcl8xIiB2ZXJzaW9uPSIxLjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+PHBvbHlsaW5lIGZpbGw9Im5vbmUiIHBvaW50cz0iMjEsOC41IDEyLDE3LjUgMyw4LjUgIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLXdpZHRoPSIyIi8+PC9zdmc+") no-repeat;
    background-position: top ${spacings.medium} right ${spacings.medium};
    background-size: 1.6rem;
    border: none;
    border-radius: ${box.borderRadius};
    box-shadow: ${box.shadow.default};
    cursor: pointer;
    transition: border-color ${animations.transitionTiming} ease;
    appearance: none;
  }

  select:disabled {
    background-color: ${({ theme }) => theme.bgTertiary};
  }

`;
