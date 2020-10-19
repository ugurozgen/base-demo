import styled from "styled-components";
import { StyleFontAlt, TextTransformUppercase } from "../Layout/theme";

export const StyledHeader = styled.header`
  background: ${({ theme }) => theme.color_accent};
  margin-bottom: 1.45rem;

  div {
    margin: 0 auto;
    max-width: 960;
    padding: 1.45rem 1.0875rem;
  }

  h1 {
    margin: 0;
    ${StyleFontAlt}
    font-size: 2.6rem;
    font-weight: bold;
    ${TextTransformUppercase}

    a {
      color: ${({ theme }) => theme.color_title};
      text-decoration: none;
    }
  }
`;
