import React from "react";

import Layout from "../components/Layout";
import SEO from "../components/seo";
import { getIntl } from "../helpers/rioti18n";

const NotFoundPage = () => {
  const { t } = getIntl();
  return (
    <Layout>
      <SEO title="404: Not found" />
      <h1>{t("404.notFound")}</h1>
      <p>{t("404.message")}</p>
    </Layout>
  );
};

export default NotFoundPage;
