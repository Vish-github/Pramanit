import {Grid} from "@mui/material";
import Image from "next/image";

import twitter from "../assets/PRAMANIT/twitter.png";
import github from "../assets/PRAMANIT/github.png";
import linkedin from "../assets/PRAMANIT/linkedin.png";

import styles from "../styles/AboutTeam.module.css";

function AboutTeam({
  image,
  name,
  twitterlink,
  designation,
  linkedinlink,
  githublink,
}) {
  return (
    <Grid item sm={3} xs={12}>
      <div className={styles.AboutTeam_container}>
        <Image
          src={image}
          className={styles.avatarimage}
          width={150}
          height={150}
        />
        <h6>{name}</h6>
        <p>{designation}</p>
        <div className={styles.socialtray}>
          <a href={twitterlink}>
            <Image src={twitter} width={25} height={25} />
          </a>
          <a href={githublink}>
            <Image src={github} width={25} height={25} />
          </a>
          <a href={linkedinlink}>
            <Image src={linkedin} width={25} height={25} />
          </a>
        </div>
      </div>
    </Grid>
  );
}

export default AboutTeam;
