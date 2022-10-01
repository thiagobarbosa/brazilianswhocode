import { marked } from "marked";
import { kebabCase } from "lodash-es";

function generateJobSlug(id, companyName, jobTitle) {
  return `${id.slice(0, 5)}-${kebabCase(companyName)}-${kebabCase(jobTitle)}`;
}

export default async function fetchJobs() {
  const token = process.env.WWD_SEEKER_KEY;

  if (!token) {
    throw new Error(
      "You must provide an API key to `gatsby-source-seeker`. \n If you don't have a Seeker API key, follow these steps: \n 1. Delete the gatsby-source-seeker plugin (lines 12-17) from the gatsby-config.js file \n 2. Delete the entire gatsby-node.js file \n 3. Delete the src/pages/jobs.js file \n 4. Remove the link to the jobs page from the src/components/nav file"
    );
  }

  const res = await fetch(`https://api.seeker.company/v1/jobs?page_size=100`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  const data = await res.json();

  return data.results.map((job) => ({
    id: job.id,
    job_title: job.job_title,
    job_link: job.job_link,
    job_application_link: job.job_application_link,
    job_location: job.job_location,
    creation_date: job.creation_date,
    is_featured: job.is_featured,
    company: {
      name: job.company.name,
      company_url: job.company.company_url,
    },
    slug: generateJobSlug(job.id, job.company.name, job.job_title),
    job_description: marked(job.job_description),
  }));
}
