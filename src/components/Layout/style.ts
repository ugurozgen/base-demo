import styled, { createGlobalStyle } from "styled-components";
import { StyleFontMain } from "./theme";

/**
 * Global styles let you style outer tags like html or body.
 * As a general rule, try to keep global styles to a minimum since these
 * can silently affect any other styles.
 * https://styled-components.com/docs/api#createglobalstyle
 */
export const GlobalStyles = createGlobalStyle<{ theme: any }>`
  html {
    background: ${(props) => props.theme.color_background};
  }
`;

/**
 * Styled components let you define styles for them or any children.
 * https://styled-components.com/docs/basics
 */
export const StyledLayout = styled.div`
  width: 100%;
  height: 100%;

  color: ${(props) => props.theme.color_text};

  margin: 0 auto;
  max-width: 960;
  padding: 0 1.0875rem 1.45rem;
  font-size: 1.6rem;
  ${StyleFontMain}

  /* You can set some global styles for children elements here */

  h1 {
    font-size: 3rem;
    font-weight: bold;
    color: ${(props) => props.theme.color_heading_1};
  }

  p {
    margin: 1rem 0;
  }

  strong {
    color: ${({ theme }) => theme.color_text_bold};
    font-weight: bold;
  }

  em {
    color: ${({ theme }) => theme.color_text_accent};
    font-style: italic;
  }

  a {
    color: ${({ theme }) => theme.color_text_accent};
    text-decoration: underline;
    &:visited {
      color: ${({ theme }) => theme.color_text_dimmed};
    }
  }
`;
