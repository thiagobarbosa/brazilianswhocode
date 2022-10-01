import { chunk, flatten } from "lodash-es";
import fs from "fs";
import addDescriptionLinks from "./add-description-links";
import getTags from "./get-tags";

const lessThanOneHourAgo = (date) => {
  const HOUR = 1000 * 60 * 60;
  const anHourAgo = Date.now() - HOUR;

  return date > anHourAgo;
};

export default async function getTwitterProfiles(twitterAccountId) {
  let chunkedDesigners;

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
    chunkedDesigners = JSON.parse(fs.readFileSync(localhostCachePath, "utf-8"));
  } else {
    const twitterAPIHeaders = {
      Authorization: `Bearer ${process.env.WWD_TWITTER_BEARER_TOKEN}`,
    };

    const followingListResponse = await fetch(
      `https://api.twitter.com/1.1/friends/ids.json?user_id=${twitterAccountId}&stringify_ids=true`,
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

    chunkedDesigners = await Promise.all(
      chunk(followingList.ids, 100).map(async (chunk) => {
        const users = chunk.join(",");

        const resultsResponse = await fetch(
          `https://api.twitter.com/1.1/users/lookup.json?user_id=${users}`,
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
      fs.writeFileSync(localhostCachePath, JSON.stringify(chunkedDesigners));
    }
  }

  const profiles = flatten(chunkedDesigners);

  return profiles.map((p) => ({
    id: p.id_str,
    name: p.name,
    image: p.profile_image_url_https.replace("_normal", "_400x400"),
    hex: `#${p.profile_link_color}`,
    description: addDescriptionLinks(p),
    tags: getTags(p),
    location: p.location,
    handle: p.screen_name,
    ...(p.entities.url?.urls[0].expanded_url
      ? { expandedUrl: p.entities.url.urls[0].expanded_url }
      : {}),
    ...(p.entities.url?.urls[0].display_url
      ? { displayUrl: p.entities.url.urls[0].display_url }
      : {}),
  }));
}
