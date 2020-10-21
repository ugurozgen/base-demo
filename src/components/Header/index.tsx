import PropTypes from "prop-types";
import React from "react";
import { Link } from "gatsby-plugin-intl";
import { StyledHeader } from "./style";

import LanguageSwitch from "../../components/Shared/Language";

interface Params {
  siteTitle: string;
}
const Header = ({ siteTitle }: Params) => (
  <StyledHeader>
    <div>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
      <LanguageSwitch />
    </div>
  </StyledHeader>
);

Header.propTypes = {
  siteTitle: PropTypes.string,
};

Header.defaultProps = {
  siteTitle: ``,
};

export default Header;
