import PropTypes from "prop-types";
import React from "react";
import { Link } from "gatsby-plugin-intl";
import { StyledHeader } from "./style";

interface Params {
  siteTitle: string;
}
const Header = ({ siteTitle }: Params) => (
  <StyledHeader>
    <div>
      <h1>
        <Link to="/">{siteTitle}</Link>
      </h1>
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
