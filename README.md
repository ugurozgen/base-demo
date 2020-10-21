# Gatsbinger Starter

This is a gatsby starter for WWPUB static sites. YOu can use this to get started with static websites with the following features:

- Uses Typescript for everything.
- Static web pages powered by [Gatsby](https://www.gatsbyjs.org).
- String translations via [react-intl](https://github.com/formatjs/react-intl) via [gatsby-plugin-intl](https://www.gatsbyjs.org/packages/gatsby-plugin-intl/).
- Page generation from [Contentstack](https://www.contentstack.com/) via [gatsby-source-contentstack](https://www.gatsbyjs.org/packages/gatsby-source-contentstack/).
- Styled components.

## Getting Started

### 1. Create your project

Use this starter to create a new directory for your site:

```shell
npx @riotgames/gatsbinger-cli create
```

> Note:
>
> The `gatsby-cli` offers a way to use starters for this but it
> is limited to public github so you need to manually clone this repo.

After this, simply add and commit all files to your origin.

```shell
git init
git remote add origin <your origin>
git add .
git commit -am "Initial gatsbinger commit"
git push -u origin master
```

### 2. Create a build job

You can get a build job in dockerjenkins folder by adding
your repository to the [wwpub static sites configuration](https://gh.riotgames.com/lol-channel-devcuts/wwpub_static_sites/blob/master/config.yml).
An example of a simple configuration for a static site is:

```yaml
sites:
  gatsbinger:
    description: Sample Gatsbinger website
    owner: your-teams-email@riotgames.com
    notificationsChannel: "#nt-your-team"
    jobs:
      test:
        site_domain: gatsbinger-test.leagueoflegends.com
        repo: "git@egh.riotgames.com:wwpub/gatsbinger.git"
        branch: master
      live:
        site_domain: gatsbinger-test.com
        repo: "git@egh.riotgames.com:wwpub/gatsbinger.git"
        branch: production
```

Once merged, this will automatically create build jobs for you using the following pattern:

`https://dockerjenkins.riotgames.com/job/wwpub/wwp-builds/job/static_sites/job/[site-name]/job/[site-name]-static-[job-name]/`

In this example, it would create two build jobs:
`https://dockerjenkins.riotgames.com/job/wwpub/view/wwp-builds/job/static_sites/job/gatsbinger/job/gatsbinger-static-test/`

`https://dockerjenkins.riotgames.com/job/wwpub/view/wwp-builds/job/static_sites/job/gatsbinger/job/gatsbinger-static-live/`

You can read more about the build jobs and overall infrastructure in https://gh.riotgames.com/lol-channel-devcuts/wwpub_static_sites

In the above configuration, `site_domain` represents the root of your website.
You can use any domain you want, for any or all of your repositories.

The current de-facto standard is to use a test subdomain under leagueoflegends.com
and to have individual domains for your page. As a general rule, anything you
build should be visible on the domain specified as `site_domain` for your
environment.

In this example, the pages will be visible in:

- test: gatsbinger-test.leagueoflegends.com
- live: gatsbinger-test.com

**Note that these domains are only examples, and you will need to ensure your
domain works and is set-up to display your site.**

### 3. Add github webhooks

In order to automatically build your project when you push a change to it, you can
add a webhook to your repository to notify dockerjenkins of the change.

Add a `push` webhook to `https://dockerjenkins.riotgames.com/github-webhook/` from repo settings -> hooks.

### 4. Build your site!

You can refer to the [Gatsby documentation](https://www.gatsbyjs.org/docs/)
to build your website. The following are quick notes on configurations particular
to this repository:

#### Development workflow

This repository contains a regular gatsby website, pre-configured with certain features, you can check `gatsby-config.ts` for an explanation of the enabled
features and to tweak them, or add your own.

This repository requires [NodeJS](https://nodejs.org/en/download/) and it has been
tested with version **12.4**.

Tweak `package.json` with your project name, description, author, etc. This file
provides scripts for most common tasks via `npm`:

- `npm i`: Install all dependencies.
- `npm run gatsby`: Runs the `gatsby` cli with passed in parameters. The best practice is to always run `gatsby` via npm run, for example: `npm run gatsby -- --help` (add `--` to tell npm the arguments thereon are for gatsby and not for npm itself).
- `npm run develop`: Runs `gatsby develop` with the right flags and start a
  web server with hot reloading of your site (defaults to localhost:8000). (alias: `dev`, `start`)
- `npm run build`: Runs the build in production mode. It will generate a set of
  static files in the `public` directory.
- `npm run serve`: Starts `gatsby serve` for your site (defaults to localhost:9000)

#### Static pages / static assets

This allows you to statically load images, styles, etc. via [`import`ing the
assets directly](https://www.gatsbyjs.org/docs/importing-assets-into-files/).
This should be enough for most projects.

In some cases, you may want to [use a static folder](https://www.gatsbyjs.org/docs/static-folder/)
instead, Just be mindful of the [pros and cons of doing so](https://www.gatsbyjs.org/docs/static-folder/#downsides).

#### Localization using static strings

For projects which need localized strings (think loc cms), this repository uses
[gatsby-plugin-intl](https://www.gatsbyjs.org/packages/gatsby-plugin-intl) for 
translations. This will allow you to use the `useIntl()` react hook in your 
components to output localized text. ([docs](https://www.gatsbyjs.org/packages/gatsby-plugin-intl/#change-your-components)).

Note that `gatsby-plugin-intl` uses [react-intl](https://github.com/formatjs/react-intl/blob/master/docs/README.md) under the hood.

To define which languages are supported, add a file with the locale code under 
`/locale/`. For example to add French, add `/locale/fr-fr.json`. See the example 
files and [documentation]() for more info on translation files.

Additionally, you will need to configure your **valid locales array** in 
`gatsby-config.ts`, with the list of supported locales. All locales on this list
require a translation file to be present for that locale.

```tsx
/**
 * String with all supported locales.
 * These are the locales that will be built by default, unless overriden by the
 * environment variable `LOCALES`.
 */
const ALL_SUPPORTED_LOCALES = "en-us en-gb es-es es-mx es-ar el-gr tr-tr ko-kr";

```

The best practice is to allow overriding of `LOCALES` via an environment variable,
while setting it to all supported locales by default.

Once configured, `gatsby-plugin-intl` will create localized versions of all your
static pages by prefixing the urls with the locale.

For example, if you define two locales: `en-us` and `es-es`, and you have a page
in `src/pages/a-page.tsx`, this will generate the following URLs:

- `/en-us/a-page/`
- `/es-es/a-page/`

#### Contentstack

Additionally `gatsby-node.ts` proposes a way to create gatsby pages from
contentstack. Check out the [Contentstack documentation in this repo](CONTENTSTACK.md) for more info on integrating Contentstack with your website.


#### Secrets

If your application needs secrets, like for example contentstack API keys,
we got you covered. For now the proces is manual, so just contact the dex team
on `#ask-digitalexperiences` for help.

#### Styling

This repository uses [styled-components](https://www.gatsbyjs.org/docs/styled-components/) and provides examples of theming, responsive breakpoints,
and loading fonts from fonts.riot.com.
Check `src/components/Layout/index.tsx`, `src/components/Layout/style.ts`,
and `src/theme.style.ts` for an example of using styled components.

#### Environment varialbes

In Gatsby, there are two lifetimes for environment variables: build-time and run-time.
Any environment variable except for the [reserved environment variables](https://www.gatsbyjs.org/docs/environment-variables/#additional-environments-staging-test-etc)
is available at build time. By default, only variables whose names start with 
`GATSBY_` are available at run-time.

Reserved environment variables are: `NODE_ENV` and `PUBLIC_DIR`.

If you need to know the build environment, you can use a custom variable, like
`GATSBY_ENV` as demonstrated in `gatsby-node.ts`.

[Read more about gatsby environment variables.](https://www.gatsbyjs.org/docs/environment-variables/)

To add an environment variable to your build job

```yaml
sites:
  my-project:
    description: My Cool Website
    owner: your-teams-email@riotgames.com
    notificationsChannel: "#nt-your-team"
    jobs:
      test:
        site_domain: test.mysite.com
        repo: "git@egh.riotgames.com:wwpub/my-repo.git"
        branch: master
        env:
          GATSBY_COOL_VAR_HERE: "foo" # starts with GATSBY_ so it's available at "run time" in your client-side builds through your whole application
          SOME_OTHER_VAR_HERE: "boom" # Does not start with GATSBY_ so this is only available at build time, such as in gatsby-node.ts
      live:
        site_domain: mysite.com
        repo: "git@egh.riotgames.com:wwpub/my-repo.git"
        branch: production
        env:
          GATSBY_COOL_VAR_HERE: "bar"
          SOME_OTHER_VAR_HERE: "sauce"

```
### 5. Deploy!

Assuming you have followed all steps, you should have build jobs and webhooks
set-up your site should automatically build when you `git push` to certain branches
(based on your build configuration).

In order to set-up the website to be displayed, you will need to contact WWPUB.
Please reach out to us in slack via `#ask-digitalexperiences`.

