import { createGlobalStyle } from "styled-components";
import { theme } from "@socialgouv/react-ui";

const { colors, fonts } = theme;

export default createGlobalStyle`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 0;
    color: ${colors.title};
    font-weight: normal;
    font-family: 'Merriweather', serif;
    line-height: ${fonts.lineHeightTitle};
  }
`;
