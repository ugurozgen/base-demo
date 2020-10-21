import React from "react";
import Layout from "../components/Layout";
import Comments from "../components/comments";
import SEO from "../components/seo";
import { Link } from "gatsby-plugin-intl";

const SecondPage = () => (
	<Layout>
		<Comments />
		<SEO title="Page two" />
		<h1>Hi from the second page</h1>
		<p>Welcome to page 2</p>
		<Link to="/">Go back to the homepage</Link>
	</Layout>
);

export default SecondPage;
