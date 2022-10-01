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
      <title>About | Brazilians Who Code</title>
    </Head>
    <Nav theme="light" />
    <div className={styles.container}>
      <h1 className={styles.h1}>About this project</h1>
      <p>
        Brazilians Who Code is a Twitter directory of accomplished Brazilians in the
        tech industry. It aims to help people find notable and relevant voices
        to follow on Twitter by parsing Twitter bios for popular keywords.
        This entire website is built based on the source code of 
        <a href="https://github.com/julesforrest/womenwhodesign"> Women Who Design</a>, 
        and we highly appreciate they opening their code :).
      </p>

      <h2 className={styles.emphasis}>Source code</h2>
      <p>
        Brazilians Who Code is happy to support new directories highlighting
        underrepresented or marginalized groups. If you’re looking to start a
        similar effort, feel free to fork the project on{" "}
        <a href="https://github.com/thiagobarbosa/brazilianswhocode">GitHub</a>.
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
      
      <h1 className={styles.h1}>Other notes</h1>
      <h2 className={styles.emphasis}>Opt out</h2>
      <p>
        If you’ve been featured in the directory and you’d rather not be, please
        send a DM to{" "}
        <a
          href="https://twitter.com/BR_whocode"
          target="_blank"
          rel="noopener noreferrer"
        >
          @BR_whocode
        </a>{" "}
        on Twitter and you will be removed.
      </p>

      <p>
        <span role="img" aria-label="Peace hand emoji">
          ✌️
        </span>{" "}
        <a
          href="https://twitter.com/tsouza_barbosa"
          target="_blank"
          rel="noopener noreferrer"
        >
          @tsouza_barbosa
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
