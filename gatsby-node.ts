/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

import { resolve } from "path";
import { CreatePagesArgs, Actions, SourceNodesArgs, CreateSchemaCustomizationArgs } from "gatsby";
import { BCPLocale, makeI18n } from "./src/helpers/rioti18n";
import { siteConfig } from "./gatsby-config"; 
import * as graphqlHelper from "./src/graphql";
import path from "path";
import fs from "fs";

const { LOCALES } = siteConfig;
const i18n = makeI18n(LOCALES.split(" "));
const validLocales = i18n.getValidLocales();
/**
 * Use BUILD_ENV to determine the build environment at build time.
 * Gatsby sets NODE_ENV to production for internal use so we cannot rely on this
 * environment variable alone.
 * By convention, we use GATSBY_ENV for our builds, and set this BUILD_ENV
 * constant here which defaults to "production" explicitly for clarity.
 */
const BUILD_ENV = process.env.GATSBY_ENV || process.env.NODE_ENV || "production";

/**
 * create pages from contentstack
 * -- this is an example from the LoR modal -- it will not work
 * unless you have credentials for contentstack set-up but illustrates
 * the flow for creating pages from contentstack.
 */
export async function createPages({ actions, graphql }: CreatePagesArgs) {
  // Do nothing if contentstack is not enabled.
  if (!siteConfig.CONTENTSTACK_ENABLED) {
    return;
  }

  // This type of function can be moved out to a different file if you grow into multiple kinds of pages 
  // This just returns an object to be used for the page generation
  const generateSamplePage = (pageData: any, locale: string) => ({
    path: `${pageData.url as string}`, // URL is instructed by contentstack
    component: resolve("./src/templates/example-page.tsx"), // It's important to use the "resolve" function here
    context: {
      pageData, // Pass the pageData property with the pageData value into the page context for the component.
      language: locale,
    },
  });

  // Loop through all locales
  for (const locale of validLocales) {
    const bcplocale = BCPLocale[locale];
    // Load the relevant graphql query from a file.
    // This query is located in src/graphql/queries/
    // When you call the `graphql function
    // The first argument is the query, second argument is the object of params we inject into the graphql query
    const query = graphqlHelper.getQuery("ExamplePageQuery.gql");
    // Quick inline typecasting to based on query results
    const {
      data: { allContentstackSimplePageExample: { edges } } = {
        allContentstackSimplePageExample: { edges: [] },
      },
    } = await graphql(query, { 
      locale: bcplocale // The ExamplePageQuery.gql query has a filter requirement of a "locale" property in the query. That must directly match the name of the property sent into this argument
     }); 

    // the pageData object is what is defined in the ExamplePageQuery.gql node properties
    edges.forEach((pageData: any) => {
      // call the Gatsby createPage action with the object returned from the generateSamplePage function
      console.log(`Creating example page /${locale}${pageData.node.url}`)
      actions.createPage(generateSamplePage(pageData.node, locale));
    });
  }
}

/**
 * sourceNodes gatsby hook.
 *
 * Use explicitly defined schemas for contentstack.
 */
export function sourceNodes({ actions }: SourceNodesArgs) {
  if (process.env.UPDATE_CONTENTSTACK_SCHEMA || !siteConfig.CONTENTSTACK_ENABLED) {
    return;
  }
  // On normal builds, get the contentstack schema from disk.
  actions.createTypes(graphqlHelper.getSchema());
}

/**
 * Allow to update the contentstack schema in src/grapql/schema.gql automatically.
 *
 * When running with an environment variable UPDATE_CONTENTSTACK_SCHEMA set to
 * a truthy value, and with contentstack enabled, this hook will update the
 * schemas file in src/grapql/schema.gql.
 *
 * example:
 *
 * UPDATE_CONTENTSTACK_SCHEMA npm run build
 */
export function createSchemaCustomization({ actions }: CreateSchemaCustomizationArgs) {
  // Only print schemas when the environment variable UPDATE_CONTENTSTACK_SCHEMA is set.
  if (!process.env.UPDATE_CONTENTSTACK_SCHEMA || !siteConfig.CONTENTSTACK_ENABLED) {
    return;
  }
  // We are only interested in contentstack types here.
  const include = { plugins: ["gatsby-source-contentstack"] };
  // Declarations for CreateSchemaCustomizationArgs are missing printTypeDefinitions
  const { printTypeDefinitions = () => null } = actions as any;
  const schemasPath = path.join(__dirname, "src/graphql/schema.gql");
  fs.unlinkSync(schemasPath);
  console.log(
    printTypeDefinitions({
      path: schemasPath,
      include,
    }),
  );
}
