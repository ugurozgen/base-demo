/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react";
import PropTypes from "prop-types";
import { useStaticQuery, graphql } from "gatsby";

import Header from "../Header";
import { FormattedMessage, useIntl } from "gatsby-plugin-intl";
import { NormalizeStyles } from "./normalize";
import { main_theme } from "./theme";
import { supportsUppercasing } from "../../helpers/rioti18n";

type Params = {
  children: JSX.Element[];
};

const Layout = ({ children }: Params) => {
  // You can use static data from siteMetadata
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `);
  // Or you can use gatsby-plugin-intl to display translated strings.
  const intl = useIntl();

  // Load the main theme.
  const theme = {
    ...main_theme,
    // Uppercasing is not supported in some languages.
    supports_uppercasing: supportsUppercasing(intl.locale),
  };

  return (
    <div className="main">
      {/* <Header siteTitle={intl.formatMessage({ id: "siteMetadata.title" })} /> */}
      <main>{children}</main>
      {/* <footer>
        <FormattedMessage
          id="footer.builtWith"
          values={{
            date: new Date().getFullYear(),
            a: (...chunks: string[]) => <a href="https://gatsbyjs.org/">{chunks}</a>,
          }}
        />
      </footer> */}
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;
