export default {
  images: {
    domains: ["pbs.twimg.com", "abs.twimg.com"],
  },
  async rewrites() {
    return [
      {
        source: "/rss.xml",
        destination: "/api/jobs-rss",
      },
    ];
  },
};
