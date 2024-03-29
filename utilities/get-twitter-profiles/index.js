import { chunk, flatten } from "lodash-es";
import fs from "fs";
import addDescriptionLinks from "./add-description-links";
import getTags from "./get-tags";
import getNonPersonalProfiles from "./non-personal-profiles";

const lessThanOneHourAgo = (date) => {
  const HOUR = 1000 * 60 * 60;
  const anHourAgo = Date.now() - HOUR;

  return date > anHourAgo;
};

export default async function getTwitterProfiles(twitterAccountId) {
  let chunkedDevelopers;

  // We don't want to fetch from Twitter too often when developing locally
  // becuase of rate limiting. We store the result of the first API requests
  // so that we only do it once during `next dev`.
  const localhostCachePath = ".next/profiles-cache.json";

  if (
    process.env.NODE_ENV === "development" &&
    fs.existsSync(localhostCachePath) &&
    lessThanOneHourAgo(fs.statSync(localhostCachePath).mtime)
  ) {
    // Cache hit. Read from the file instead of Twitter's API
    chunkedDevelopers = JSON.parse(fs.readFileSync(localhostCachePath, "utf-8"));
  } else {
    const twitterAPIHeaders = {
      Authorization: `Bearer ${process.env.WWD_TWITTER_BEARER_TOKEN}`,
    };

    const followingListResponse = await fetch(
      `https://api.twitter.com/2/users/${twitterAccountId}/following`,
      {
        headers: twitterAPIHeaders,
      }
    );

    if (!followingListResponse.ok) {
      throw new Error(
        `Call to Twitter's \`friends/ids\` endpoint failed with message: "${followingListResponse.statusText}"`
      );
    }

    const followingList = await followingListResponse.json();
    // avoid calling the API for non-personal profiles
    const filteredFollowingList = followingList.ids.filter((id) => {
      return !getNonPersonalProfiles().includes(id)
    })

    chunkedDevelopers = await Promise.all(
      chunk(filteredFollowingList, 100).map(async (chunk) => {
        const users = chunk.join(",");

        const resultsResponse = await fetch(
          `https://api.twitter.com/2/users/lookup.json?user_id=${users}`,
          {
            headers: twitterAPIHeaders,
          }
        );

        if (!followingListResponse.ok) {
          throw new Error(
            `Call to Twitter's \`users/lookup\` endpoint failed with message: "${followingListResponse.statusText}"`
          );
        }

        return resultsResponse.json();
      })
    );

    if (process.env.NODE_ENV === "development") {
      fs.writeFileSync(localhostCachePath, JSON.stringify(chunkedDevelopers));
    }
  }

  const profiles = flatten(chunkedDevelopers);

  return profiles.map((p) => ({
    id: p.id_str,
    name: p.name,
    image: p.profile_image_url_https.replace("_normal", "_400x400"),
    hex: "#04523E",
    description: addDescriptionLinks(p),
    tags: getTags(p),
    location: p.location,
    handle: p.screen_name,
    statusesCount: p.statuses_count,
    ...(p.entities.url?.urls[0].expanded_url
      ? { expandedUrl: p.entities.url.urls[0].expanded_url }
      : {}),
    ...(p.entities.url?.urls[0].display_url
      ? { displayUrl: p.entities.url.urls[0].display_url }
      : {}),
  }));
}
