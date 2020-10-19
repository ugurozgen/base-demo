import { createGlobalStyle, css } from "styled-components";
/* 
  font @import rules are not working with styled-component global 
  rules at this time, so we use css or Helmet to inject them as a global style.
*/
// Example: 
// export default = createGlobalStyle`
//   @import url("https://lolstatic-a.akamaihd.net/webfonts/live/css/lor/fonts.css");
// `;
// Or fill up the theme-fonts.css file to load custom fonts.
import "./theme-fonts.css";

/** Colors */

export const color_primary_1 = "#f5d765";
export const color_primary_2 = "#ff9000";
export const color_primary_3 = "#ec0048";
export const color_primary_4 = "#8a45b6";
export const color_primary_5 = "#59a2d0";
export const color_primary_6 = "#c5fa8a";
export const color_primary_7 = "#272727";
export const color_primary_8 = "#d7d3ca";

export const color_secondary_1 = "#000000";
export const color_secondary_2 = "#ffffff";

/** Themes */

export const main_theme = {
  color_background: color_primary_8,
  color_title: color_primary_6,
  color_subtitle: color_primary_2,
  color_heading_1: color_primary_7,
  color_heading_2: color_primary_2,
  color_heading_3: color_primary_2,
  color_heading_4: color_primary_2,
  color_heading_5: color_primary_2,
  color_heading_6: color_primary_2,
  color_accent: color_primary_4,
  color_heading: color_primary_3,
  color_text: color_primary_7,
  color_text_dimmed: color_primary_3,
  color_text_bold: color_primary_4,
  color_text_accent: color_primary_2,
  font_family_main: `"Open Sans", sans-serif`,
  font_family_alt: `"BeaufortforLOL-Medium", serif`,
  supports_uppercasing: true,
};

/** Mixins */

// Main font, to use for most text.
export const StyleFontMain = css`
  font-family: ${(props) => props.theme.font_family_main};
  letter-spacing: normal;
  font-weight: 200;
`;

// Alternate font, for accents.
export const StyleFontAlt = css`
  font-family: ${(props) => props.theme.font_family_alt};
  letter-spacing: normal;
  font-weight: 200;
`;

// use this mix-in instead of `text-transform: uppercase`
export const TextTransformUppercase = css`
  text-transform: ${(props) => (props.theme.supports_uppercasing ? "uppercase" : "none")};
`;

// named sizes for screen widths.
export const size = {
  mobileS: "320px",
  mobileM: "375px",
  mobileL: "425px",
  mobileXL: "600px",
  tablet: "768px",
  laptop: "1024px",
  laptopL: "1440px",
  desktop: "2560px",
};

// Named devices for media queries.
export const device = {
  mobileS: `(min-width: ${size.mobileS})`,
  mobileM: `(min-width: ${size.mobileM})`,
  mobileL: `(min-width: ${size.mobileL})`,
  mobileXL: `(min-width: ${size.mobileXL})`,
  tablet: `(min-width: ${size.tablet})`,
  laptop: `(min-width: ${size.laptop})`,
  laptopL: `(min-width: ${size.laptopL})`,
  desktop: `(min-width: ${size.desktop})`,
  desktopL: `(min-width: ${size.desktop})`,
};
