import React from "react";
import Image from "next/image";
import Link from "next/link";
import Head from "next/head";
import { sortBy } from "lodash-es";
import classnames from "classnames";
import Nav from "../components/nav";
import styles from "../components/about/index.module.scss";
import BlacksWhoDesign from "../friends/blackswhodesign.svg";
import LatinxsWhoDesign from "../friends/latinxswhodesign.png";
import PeopleOfCraft from "../friends/peopleofcraft.png";
import QueerDesignClub from "../friends/queerdesignclub.svg";
import IndiansWhoDesign from "../friends/indianswhodesign.svg";
import FilipinosWhoDesign from "../friends/filipinoswhodesign.png";
import APIWhoDesign from "../friends/apiwhodesign.svg";
import BraziliansWhoDesign from "../friends/brazilianswhodesign.svg";
import Rememory from "../friends/rememory.svg";
import Button from "../components/button";

const friends = [
  {
    title: "API Who Design",
    link: "https://apiwho.design/",
    image: APIWhoDesign,
    invert: true,
  },
  {
    title: "Blacks Who Design",
    link: "https://blackswho.design/",
    image: BlacksWhoDesign,
  },
  {
    title: "Latinxs Who Design",
    link: "https://latinxswhodesign.com",
    image: LatinxsWhoDesign,
    invert: true,
  },
  {
    title: "People of Craft",
    link: "https://peopleofcraft.com/",
    image: PeopleOfCraft,
  },
  {
    title: "Queer Design Club",
    link: "https://queerdesign.club/",
    image: QueerDesignClub,
    invert: true,
  },
  {
    title: "Filipinos Who Design",
    link: "http://filipinoswhodesign.club/",
    image: FilipinosWhoDesign,
    invert: true,
    contrast: true,
  },
  {
    title: "Indians Who Design",
    link: "https://indianswhodesign.in/",
    image: IndiansWhoDesign,
  },
  {
    title: "Brazilians Who Design",
    link: "https://brazilianswho.design/",
    image: BraziliansWhoDesign,
  },
  {
    title: "Rememory",
    link: "https://www.rememory.directory/",
    image: Rememory,
  },
];

const sortedFriends = sortBy(friends, (friend) => friend.title);

const App = () => (
  <>
    <Head>
      <title>About | Women Who Design</title>
    </Head>
    <Nav theme="light" />
    <div className={styles.container}>
      <h1 className={styles.h1}>About this project</h1>
      <p>
        Women Who Design is a Twitter directory of accomplished women in the
        design industry. It aims to help people find notable and relevant voices
        to follow on Twitter by parsing Twitter bios for popular keywords.
      </p>

      <h2 className={styles.emphasis}>Source code</h2>
      <p>
        Women Who Design is happy to support new directories highlighting
        underrepresented or marginalized groups. If you’re looking to start a
        similar effort, feel free to fork the project on{" "}
        <a href="https://github.com/julesforrest/womenwhodesign">GitHub</a>.
      </p>
      <h2 className={styles.emphasis}>Similar directories</h2>
      <p>
        Examining diversity along the axis of gender is one small piece of the
        puzzle. If you’ve found this site to be valuable, please take a look at
        the work of friends in the industry building similar efforts.
      </p>
      <div className={styles.friendContainer}>
        {sortedFriends.map((friend) => {
          const friendImageStyles = classnames({
            [styles.friendImage]: true,
            [styles.friendImageInvert]: friend.invert === true,
            [styles.friendImageContrast]: friend.contrast === true,
          });
          return (
            <a
              href={friend.link}
              target="_blank"
              rel="noopener noreferrer"
              key={friend.title}
              className={styles.friendItem}
            >
              <div
                style={{
                  minHeight: "75px",
                  width: "100%",
                  position: "relative",
                }}
              >
                <Image
                  src={friend.image}
                  className={friendImageStyles}
                  objectFit="contain"
                  layout="fill"
                  alt={`${friend.title} logo`}
                />
              </div>

              <p className={styles.friendTitle}>{friend.title}</p>
            </a>
          );
        })}
      </div>
      <h1 className={styles.h1}>How to use</h1>
      <p>Here are some things Women Who Design can help you with:</p>

      <h2 className={styles.emphasis}>
        Use{" "}
        <a
          href="https://www.proporti.onl/"
          target="_blank"
          rel="noopener noreferrer"
        >
          proporti.onl
        </a>{" "}
        to check the ratio of the people you follow on Twitter.
      </h2>
      <p>
        If you’re following more men than women, use this project to follow new
        women and diversify the voices in your feed. Be aware that a feed of
        white women is not diverse.
      </p>
      <h2 className={styles.emphasis}>
        If you’re a hiring manager, use this project to find candidates.{" "}
      </h2>
      <p>
        Examine the ratio of senior men to senior women in your organization.
        Are women of color equally represented? Consider hiring women into
        promotions above their current role.
      </p>

      <h2 className={styles.emphasis}>
        If you’re organizing a conference, use this project to find speakers.
      </h2>
      <p>
        Ensure that the women’s speaking slots are as prominent as the men’s.
        Are women of color equally represented? Consider reaching out to women
        who have never given a talk before.
      </p>

      <h2 className={styles.emphasis}>
        If you have a podcast, use this project to find new guests.{" "}
      </h2>
      <p>
        Be mindful of interruptions and ensure that your women guests get equal
        speaking time. Are women of color equally represented? Consider inviting
        women who don’t already have an audience.
      </p>

      <h2 className={styles.emphasis}>Further reading</h2>
      <p>
        For becoming a better ally – to women, people of color, LGBTQ, disabled,
        ESL or any other marginalized group.
      </p>

      <ul className={styles.ul}>
        <li className={styles.liLinks}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="http://www.guidetoallyship.com/"
          >
            Guide to Allyship
          </a>{" "}
          by Amélie Lamont
        </li>

        <li className={styles.liLinks}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://medium.com/@nmsanchez/how-to-build-inclusive-culture-360160f417a1"
          >
            How to Build Inclusive Culture
          </a>{" "}
          by Nicole Sanchez
        </li>
        <li className={styles.liLinks}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://medium.com/mule-design/be-a-pal-my-dudes-a34c06df1b1d"
          >
            Be a Pal, My Dudes
          </a>{" "}
          by Erika Hall
        </li>
        <li className={styles.liLinks}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://larahogan.me/blog/what-sponsorship-looks-like/"
          >
            What Does Sponsorship Look Like?
          </a>{" "}
          by Lara Hogan
        </li>
        <li className={styles.liLinks}>
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.huffingtonpost.com/entry/some-garbage-i-used-to-believe-about-equality_us_58501c5be4b0151082221ef7"
          >
            Some Garbage I Used to Believe About Equality
          </a>{" "}
          by Johnathan Nightingale
        </li>
      </ul>
      <h1 className={styles.h1}>Other notes</h1>
      <h2 className={styles.emphasis}>Support</h2>
      <p>
        Women Who Design is an independent project. If you’re interested in
        supporting it, please consider posting a job.
      </p>
      <Button
        href="https://womenwhodesign.seeker.company/submit/job"
        width="auto"
      >
        Post a job
      </Button>
      <h2 className={styles.emphasis}>Opt out</h2>
      <p>
        If you’ve been featured in the directory and you’d rather not be, please
        send a DM to{" "}
        <a
          href="https://twitter.com/womenwhodesign"
          target="_blank"
          rel="noopener noreferrer"
        >
          @womenwhodesign
        </a>{" "}
        on Twitter and you will be removed.
      </p>

      <p>
        Special thanks to{" "}
        <a href="https://netlify.com" target="_blank" rel="noopener noreferrer">
          Netlify
        </a>{" "}
        for their support.
      </p>
      <p>
        <span role="img" aria-label="Peace hand emoji">
          ✌️
        </span>{" "}
        <a
          href="https://twitter.com/julesforrest"
          target="_blank"
          rel="noopener noreferrer"
        >
          @julesforrest
        </a>
      </p>
      <div className={styles.backContainer}>
        <Link href="/" className={styles.backLink}>
          <a>Back to directory</a>
        </Link>
      </div>
    </div>
  </>
);

export default App;
