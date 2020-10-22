import React from "react";
import Layout from "../components/Layout";
import Image from "../components/image";
import SEO from "../components/seo";
import { Link, useIntl } from "gatsby-plugin-intl";
import { getIntl } from "../helpers/rioti18n";

const IndexPage = () => {
	const intl = useIntl();
	return (
		<Layout>
			<SEO title="seo.home_title" />
			<h1>{intl.formatMessage({ id: "home.main_title" })}</h1>
			<p>{intl.formatMessage({ id: "home.welcome" })}</p>
			<p>
				Now go <strong>build</strong> something <em>great</em>.
      </p>


      <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>

      <div style={{ display: `flex`, flexDirection: `column` }}>
        <Link to="/comments/">Go to comment page</Link>
        <Link to="/page-2/">Go to page 2</Link>
      </div>
    </Layout>
  );
};

export default IndexPage;
