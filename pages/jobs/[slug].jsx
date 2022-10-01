import React from "react";
import Link from "next/link";
import Head from "next/head";
import ta from "time-ago";
import Nav from "../../components/nav";
import styles from "../../components/about/index.module.scss";
import MapIcon from "../../icons/map";
import BriefcaseIcon from "../../icons/briefcase";
import Button from "../../components/button";
import fetchJobs from "../../utilities/fetch-jobs";

export async function getStaticPaths() {
  const jobs = await fetchJobs();

  return {
    paths: jobs.map((job) => {
      return {
        params: {
          slug: job.slug,
        },
      };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const jobs = await fetchJobs();

  return {
    props: {
      job: jobs.find((job) => job.slug === params.slug),
    },
  };
}

export default function Job({ job }) {
  const date = ta.ago(job.creation_date);
  const headContent = `${job.company.name} is hiring a ${job.job_title} in ${job.job_location} on the Women Who Design job board.`;
  const headTitle = `${job.company.name} is hiring!`;
  const headLink = `https://womenwho.design/jobs/${job.slug}`;

  return (
    <>
      <Head>
        <title>{job.job_title} | Women Who Design</title>
        <meta property="description" content={headContent} />
        <meta property="og:title" content={headTitle} />
        <meta property="og:description" content={headContent} />
        <meta property="og:url" content={headLink} />
      </Head>
      <Nav theme="light" />
      <div className={styles.container}>
        <h1 className={styles.h1}>{job.job_title}</h1>
        <div className={styles.jobMetadata}>
          <p className={styles.p}>
            <span className="icon-group">
              <BriefcaseIcon size={16} />
              <a href={job.company.company_url} className={styles.company}>
                {job.company.name}
              </a>
            </span>{" "}
            <span className={styles.interpunct}>·</span>{" "}
            <span className="icon-group">
              <MapIcon size={16} />
              {job.job_location}
            </span>
          </p>
          <p className={styles.jobDate}>{date}</p>
        </div>
        <div
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: job.job_description }}
          className="job-description"
        />

        <Button href={job.job_application_link} width="auto">
          Apply now
        </Button>
        <div className={styles.backContainer}>
          <Link href="/jobs">
            <a className={styles.backLink}>Back to jobs</a>
          </Link>
        </div>
      </div>
    </>
  );
}
