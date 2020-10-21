import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import Comments from "../components/comments";
import { FormattedMessage, Link, useIntl } from "gatsby-plugin-intl"

const SecondPage = () => (

    <Layout>
        <SEO lang={useIntl().locale} title="Page two" />
        <h1>This is comments page 😎</h1>

        <Comments lang={useIntl().locale} />

        <Link to="/">Go back to the homepage</Link>
    </Layout>
);

export default SecondPage;