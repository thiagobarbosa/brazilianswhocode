import fetchJobs from "../../utilities/fetch-jobs";

export default async function handler(req, res) {
  const jobs = await fetchJobs();

  res.setHeader("Content-Type", "text/xml");
  res.setHeader("Cache-Control", "public, maxage=10");

  res.status(200).end(`
    <rss xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:content="http://purl.org/rss/1.0/modules/content/" xmlns:atom="http://www.w3.org/2005/Atom" version="2.0">
      <channel>
        <title><![CDATA[Women Who Design Job Board]]></title>

        <description>
          <![CDATA[Product design, design systems and web development.]]>
        </description>

        <link>https://womenwho.design</link>

        <generator>Next.js</generator>

        <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>

        ${jobs
          .map(
            (job) => `
          <item>
            <title><![CDATA[${job.company.name}, ${job.job_title}]]></title>
            <description><![CDATA[${job.company.name} is hiring a ${
              job.job_title
            } in ${job.job_location}.]]></description>
            <link>https://womenwho.design/jobs/${job.slug}</link>
            <guid isPermaLink="false">https://womenwho.design/jobs/${
              job.slug
            }</guid>
            <pubDate>${new Date(job.creation_date).toUTCString()}</pubDate>
          </item>
        `
          )
          .join("\n")}
      </channel>
    </rss>
  `);
}
