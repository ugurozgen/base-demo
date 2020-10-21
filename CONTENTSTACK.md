# Gatsbinger Contentstack Integration

## Setup

Your local environment and your build jobs will need to have Contentstack enabled and configured. This requires a few environment variables to be setup.


```
CONTENTSTACK_API_KEY=REPLACE_ME
CONTENTSTACK_DELIVERY_TOKEN=REPLACE_ME
CONTENTSTACK_ENVIRONMENT=REPLACE_ME
```


The API_KEY and DELIVERY_TOKEN are what you would generate in your Contentstack setup. [Here is Contentstack's documentation for this.](https://www.contentstack.com/docs/developers/create-tokens/create-a-delivery-token/).

Locally, you can create/modify the `.env.development` file at the root of your project folder with your Contentstack credentials, and when you start your local development server, they will get picked up. For hosted environments, these should go in the AWS Secrets entry for your build job. **Note that the existing credentials in this starter kit are for example purposes and should never be used in production**

## Querying Data from Contentstack

__docs about graphql, schema definitions, etc__

## Creating a page with Contentstack Data

There are a couple ways to create a page in this app structure. Keep in mind that Gatsbinger is mostly a Gatsby app. [Here are the gatsby docs for creating a page.](https://www.gatsbyjs.org/docs/creating-and-modifying-pages/)

We recommend leveraging the build process in the `createPages` function within the `gatsby-node.ts` file.

In there, you can add calls to other functions to create a page. The default starter has an example of this.




## Localization in Contentstack

For contentstack nodes localization happens manually (not via the `intl` plugin),
but you can still use `getIntl()` and string translations regularly since the
right `intl` values are injected to gatsby nodes created from contentstack.


## Common Gotcha's

There are a few common issues that developers have ran into in the past. Here's where we try to tell each other about them.

* `contentstack:rebuild_schema` to run a schema update - make sure you have a `.env.development` file in your root filled in with the right environment variables
* Schema changes only work when there is content IN ALL FIELDS YOU ARE QUERYING, and it must be published to the environment you are building against.
* If you have an old piece of content with a stale our out-dated content from an older schema definition, be sure to go in and update that piece of content, save and publish.
* When you make content or schema or query changes, you need to stop your local development server and start again. Hot reloading doesn't work when editing the build process.
