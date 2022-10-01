import React from "react";
import Link from "next/link";
import Head from "next/head";
import ta from "time-ago";
import Nav from "../../components/nav";
import styles from "../../components/about/index.module.scss";
import MapIcon from "../../icons/map";
import Button from "../../components/button";
import fetchJobs from "../../utilities/fetch-jobs";

export async function getStaticProps() {
  const token = process.env.WWD_SEEKER_KEY;

  if (!token) {
    throw new Error(
      "You must provide an API key to `gatsby-source-seeker`. \n If you don't have a Seeker API key, follow these steps: \n 1. Delete the gatsby-source-seeker plugin (lines 12-17) from the gatsby-config.js file \n 2. Delete the entire gatsby-node.js file \n 3. Delete the src/pages/jobs.js file \n 4. Remove the link to the jobs page from the src/components/nav file"
    );
  }

  const jobs = await fetchJobs();

  return {
    props: {
      jobs,
    },
  };
}

export default function Jobs({ jobs }) {
  const emptyState = jobs.length === 0;

  const description = "Jobs for talented women designers.";

  return (
    <>
      <Head>
        <title>Jobs | Women Who Design</title>
        <meta property="description" content={description} />
        <meta property="og:title" content="Women Who Design Jobs" />
        <meta property="og:description" content={description} />
        <meta property="og:url" content="https://womenwho.design/jobs" />
      </Head>
      <Nav theme="light" />
      <div className={styles.container}>
        <h1 className={styles.h1}>Find a job</h1>

        {emptyState && (
          <div>
            <p className={styles.p}>
              {" "}
              Unfortunately, we don’t have any jobs to share at the moment.
              Please check back soon!
            </p>
          </div>
        )}
        {!emptyState && (
          <>
            <p className={styles.p}>Jobs for talented women who design.</p>
            <div style={{ margin: "24px 0" }}>
              <Button
                href="https://womenwhodesign.seeker.company/submit/job"
                width="auto"
              >
                Post a job
              </Button>
            </div>
            <ul>
              {jobs.map((job) => {
                const date = ta.ago(job.creation_date);
                return (
                  <li key={job.slug}>
                    <Link href={`/jobs/${job.slug}`}>
                      <a className={styles.jobLink}>
                        <div className={styles.jobLinkInner}>
                          <h2
                            className={styles.h2}
                            data-featured={job.is_featured}
                          >
                            {job.company.name},{" "}
                            <span style={{ fontWeight: 400 }}>
                              {job.job_title}
                            </span>{" "}
                            <span className={styles.arrow}>→</span>
                          </h2>
                          <div className={styles.listingMetadataContainer}>
                            <p className={styles.listingMetadata}>
                              <span className="icon-group">
                                <MapIcon size={16} />
                                {job.job_location}
                              </span>
                            </p>
                            <p className={styles.jobDate}>{date}</p>
                          </div>
                        </div>
                      </a>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </>
        )}
        <div className={styles.postAJob}>
          <p className={styles.h2}>Post a job</p>
          <p>
            This job board is powered by{" "}
            <a href="https://seeker.company">Seeker</a>. If you&apos;re
            interested in supporting this project, please consider posting a
            job.
          </p>
          <Button
            href="https://womenwhodesign.seeker.company/submit/job"
            width="auto"
          >
            Post a job
          </Button>
        </div>
        <div className={styles.backContainer}>
          <Link href="/">
            <a className={styles.backLink}>Back to directory</a>
          </Link>
        </div>
      </div>
    </>
  );
}
