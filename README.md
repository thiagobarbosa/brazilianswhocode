# Women Who Design

Women Who Design is a [Next.js](https://gatsbyjs.org)-powered Twitter directory of accomplished women in the design industry. It aims to help people find notable and relevant voices to follow on Twitter by parsing Twitter bios for popular keywords.

Here are some things Women Who Design can help you with:

- **If you're a Twitter user, use this project to diversify the voices in your feed.** Run [proporti.onl](https://www.proporti.onl/) to check the ratio of the people you follow on Twitter. If you're following more men than women, follow women who work in your areas of interest. Be aware that a feed of white women is not diverse.
- **If you're a hiring manager, use this project to find candidates.** Examine the ratio of senior men to senior women in your organization. Are women of color equally represented? Consider hiring women into promotions above their current role.
- **If you're organizing a conference, use this project to find speakers.** Ensure that the women's speaking slots are as prominent as the men's. Are women of color equally represented? Consider reaching out to women who have never given a talk before.
- **If you have a podcast, use this project to find new guests.** Be mindful of interruptions and ensure that your women guests get equal speaking time. Are women of color equally represented? Consider inviting women who don't already have an audience.

## Forking this project

Women Who Design is happy to support new directories highlighting underrepresented or marginalized groups by providing its source code. These instructions will get you a copy of the project up and running on your local machine to get started.

### Prerequisites

This project requires API keys from [Twitter](https://twitter.com) to populate the profile data and [Seeker](https://seeker.company) to populate the job posts.

#### Seeker

Seeker is optional. To run this project without Seeker:

1. Clone the repo and open it in your code editor
2. Delete the entire `api/jobs-rss.js` file
3. Remove the rewrite from `next.config.mjs` that has `/api/jobs-rss` in it
4. Delete the entire `pages/jobs` folder
5. At some point, remove the link to the jobs page from the `components/nav` file

If you'd like to use Seeker, sign up for an account and create a `.env` file in the outermost file in this project. Add `WWD_SEEKER_KEY=EXAMPLE_VALUE`, replacing `EXAMPLE_VALUE` with the API key you get from Seeker.

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

The directory's profiles are generated from the list of users that the Women Who Design Twitter account follows.

To provide your own user list, replace the value of the variable `TWITTER_ACCOUNT_ID` in the `pages/index.jsx` file with the Twitter ID of your chosen Twitter account. To get the Twitter ID of your account, provide your handle to a service like [Tweeter ID](https://tweeterid.com/).

Make sure that the account provided is following at least one account and that Twitter ID in `pages/index.jsx` is in quotes.

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
yarn start
```

In your browser, open `localhost:8000`.
