import Autolinker from "autolinker";

export default function (profile) {
  // change t.co strings in  to descriptive urls in descriptions
  let { description } = profile;
  const descriptionUrls = profile.entities.description.urls;
  if (descriptionUrls.length !== undefined) {
    for (let i = 0; i < descriptionUrls.length; i += 1) {
      description = description.replace(
        descriptionUrls[i].url,
        `<a href="${descriptionUrls[i].url}" target="blank" >${descriptionUrls[i].display_url}</a>`
      );
    }
  }

  // link handles, hashtags and email addresses in descriptions
  description = Autolinker.link(description, {
    mention: "twitter",
    hashtag: "twitter",
    replaceFn(match) {
      switch (match.getType()) {
        case "url": {
          const tag = match.buildTag();
          return tag;
        }
        case "mention": {
          const mention = match.getMention();
          return `<a href="https://twitter.com/${mention}" target="blank" >@${mention}</a>`;
        }
        case "email": {
          const email = match.getEmail();
          return `<a href="mailto:"${email}" target="blank" >${email}</a>`;
        }
        case "hashtag": {
          const hashtag = match.getHashtag();
          return `<a href="https://twitter.com/hashtag/${hashtag}" target="blank" >#${hashtag}</a>`;
        }
        default:
          return undefined;
      }
    },
  });
  return description;
}
