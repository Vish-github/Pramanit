import Image from "next/image";
import Link from "next/link";

import fouro4image from "../assets/PRAMANIT/404.png";

import styles from "../styles/fourofour.module.css";

function fourofour() {
  return (
    <div className={styles.four04container}>
      <Image src={fouro4image} width={500} height={500} />
      <p>
        Sorry Page Not found | <Link href="/">Go to home</Link>
      </p>
    </div>
  );
}

export default fourofour;
