# Brazilians Who Code

Brazilians Who Code is a [Next.js](https://nextjs.org)-powered Twitter directory of accomplished Brazilians developers. It aims to help people find notable and relevant voices to follow on Twitter by parsing Twitter bios for popular keywords.
This entire website is built based on the source code of [Women Who Design](https://github.com/julesforrest/womenwhodesign), and we highly appreciate they opening their code :).

## Forking this project

Brazilians Who Code is happy to support new directories highlighting underrepresented or marginalized groups by providing its source code. These instructions will get you a copy of the project up and running on your local machine to get started.

### Prerequisites

This project requires API keys from [Twitter](https://twitter.com) to populate the profile data.

#### Twitter

Twitter is required.

Start by creating an app on the [Twitter developer dashboard](https://developer.twitter.com/en/apps). Select the "Read only" access option.

If you haven't already, clone the repo and open it in your code editor.

Create a `.env` file in the project's outermost folder and place the following in it:

```
WWD_TWITTER_CONSUMER_KEY=EXAMPLE_VALUE
WWD_TWITTER_CONSUMER_SECRET=EXAMPLE_VALUE
WWD_TWITTER_BEARER_TOKEN=EXAMPLE_VALUE
```

Replace the `WWD_TWITTER_CONSUMER_KEY` and `WWD_TWITTER_CONSUMER_SECRET` values with the consumer key and secret from the "Keys and tokens" page of your app's developer dashboard. You don't need to put quotes around the value.

Generate a bearer token (`WWD_TWITTER_BEARER_TOKEN`) by running this command in your terminal, replacing the variables with your consumer key and secret information.

```
curl -u "$CONSUMER_KEY:$CONSUMER_SECRET" \
    --data 'grant_type=client_credentials' \
    'https://api.twitter.com/oauth2/token'
```

Copy the bearer token and place the value in the `.env` file.

### Generating directory profiles

The directory's profiles are generated from the list of users that the Brazilians Who Code Twitter account follows.

To provide your own user list, replace the value of the variable `TWITTER_ACCOUNT_ID` in the `pages/index.jsx` file with the Twitter ID of your chosen Twitter account. To get the Twitter ID of your account, provide your handle to a service like [Tweeter ID](https://tweeterid.com/).

Make sure that the account provided is following at least one account and that Twitter ID in `pages/index.jsx` is in quotes.

### Managing non-personal Twitter accounts
If you want to be able to follow non-personal profiles on your Twitter account (like NGOs, tech communities, etc), and yet not to display them on the website, you can include the Twitter ids of those profiles in the file `utilities/non-personal-profiles.js`. They will then be skipped from the API calls to Twitter and won't be shown on any page.

### Install dependencies

If you're new to development, start by installing [Homebrew](https://brew.sh/), a macOS package manager. Paste the following command in your terminal.

```
/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

When Homebrew installed, use it to install [Yarn](https://yarnpkg.com/en/), a JS dependency manager.

```
brew install yarn
```

After Yarn is installed, use it to install the dependencies.

```
yarn
```

### Run the project locally

Making sure you're in the correct project folder, start the local development server.

```
yarn run dev
```

In your browser, open `localhost:3000`.
