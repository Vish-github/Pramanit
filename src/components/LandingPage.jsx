import Image from "next/image";

import lifeanddeath from "../../assets/PRAMANIT/lifeanddeath.png";
import mainpagedown from "../../assets/PRAMANIT/mainpagedown.png";

import styles from "../../styles/LandingPage.module.css";

function LandingPage() {
  return (
    <div className={styles.landing}>
      <div className={styles.landingpage}>
        <div>
          <h1 className={styles.landingpage_mainheading}>Pramanit</h1>
          <p className={styles.landingpage_tagline}>Proof Of Life And Death</p>
        </div>
        <Image
          src={lifeanddeath}
          className={styles.landingpage_lifeanddeath}
          width={400}
          height={400}
        />
      </div>{" "}
      <Image src={mainpagedown} layout="responsive" />
    </div>
  );
}

export default LandingPage;
