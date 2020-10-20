import * as path from "path";
import * as dotenv from "dotenv";
const BUILD_ENV = process.env.GATSBY_ENV || process.env.NODE_ENV || "production";
dotenv.config({
  path: `.env.${BUILD_ENV}`
}); // Gatsby doesn't load in the .env files, but we want to for local building

/**
 * String with all supported locales.
 * These are the locales that will be built by default, unless overriden by the
 * environment variable `LOCALES`.
 */
const ALL_SUPPORTED_LOCALES = "en-us en-gb es-es es-mx es-ar el-gr tr-tr ko-kr";

/**
 * Space-delimited list of locales to build.
 *
 * Uses a LOCALES environment variable if present. The wwwpub-static-sites build
 * will automatically set these to the right values for the various types of builds.
 *
 * Example:
 * LOCALES =
 *   "cs-cz de-de el-gr en-au en-gb en-us en-sg es-es es-mx fr-fr hu-hu it-it ja-jp ko-kr pl-pl pt-br ro-ro ru-ru th-th tr-tr vi-vn zh-tw";
 *
 * An empty list of locales in the environment means "use the default list".
 *  */
const LOCALES = (process.env.LOCALES ?? "").trim() || ALL_SUPPORTED_LOCALES;

/**
 * Root directory for the project, which is the directory where this file is.
 * If you move this file, you will need to update the value of `baseDir`.
 * */
const baseDir = __dirname;

/**
 * Extract locales into an array.
 * Ignore extra spaces.
 */
const localeArray = LOCALES.trim().split(/ +/);
console.log(`Building locales: ${localeArray.join(" | ")}`);

// Build-time site configuration.
export const siteConfig = {
  // The root directory.
  baseDir,
  // Locales to build, as a string.
  LOCALES,
  // Array of locales to build.
  localeArray,

  // Contenstack settings.
  CONTENTSTACK_ENABLED: !!process.env.CONTENTSTACK_API_KEY,
  CONTENTSTACK_API_KEY: process.env.CONTENTSTACK_API_KEY,
  CONTENTSTACK_DELIVERY_TOKEN: process.env.CONTENTSTACK_DELIVERY_TOKEN,
  CONTENTSTACK_ENVIRONMENT: process.env.CONTENTSTACK_ENVIRONMENT,
};

/**
 * Optional contentstack Plugin.
 * If contentstack is not enabled for this build, disables the plugin altogether.
 */
const contentstackPlugin = siteConfig.CONTENTSTACK_ENABLED
  ? [
    {
      resolve: `gatsby-source-contentstack`,
      options: {
        api_key: siteConfig.CONTENTSTACK_API_KEY,
        delivery_token: siteConfig.CONTENTSTACK_DELIVERY_TOKEN,
        environment: siteConfig.CONTENTSTACK_ENVIRONMENT,
      },
    },
  ]
  : [];

export default {
  pathPrefix: process.env.PATH_PREFIX,
  siteMetadata: {
    title: `WWPUB Gatsby Starter`,
    description: `Default Gatsby starter supporting localization, typescript, and contentstack.`,
    author: `wwpub`,
  },
  plugins: [
    `gatsby-plugin-sass`,
    `gatsby-plugin-typescript`,
    `gatsby-plugin-styled-components`,
    {
      /**
       *  Internationalization for static strings (not coming from contentstack).
       *
       * Put translation files in ./locale/[locale].json
       */
      resolve: `gatsby-plugin-intl`,
      options: {
        // language JSON resource path.
        path: `${__dirname}/locale`,
        // supported languages.
        languages: siteConfig.localeArray,
        // language file path.
        defaultLanguage: `en-us`,
        // option to redirect to `/en-us` when connecting `/`.
        redirect: true,
        // If more complex redirects are needed, you can use a redirect component.
        //redirectComponent: (string)
      },
    },
    // Optionally load the contentstack plugin.
    ...contentstackPlugin,
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${baseDir}/src/images`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // `gatsby-plugin-offline`,
  ],
};
