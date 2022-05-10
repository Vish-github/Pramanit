// import Image from "next/image";
// import Link from "next/link";

// import fouro4image from "../assets/PRAMANIT/404.png";

// import styles from "../styles/fourofour.module.css";

// function fourofour() {
//   return (
//     <div className={styles.four04container}>
//       <Image src={fouro4image} width={500} height={500} />
//       <p>
//         Sorry Page Not found | <Link href="/">Go to home</Link>
//       </p>
//     </div>
//   );
// }

// export default fourofour;
import Image from "next/image";
import Link from "next/link";

import teamfire from "../assets/PRAMANIT/teamfire.png";

import styles from "../styles/fourofour.module.css";

function fourofour() {
  return (
    <div className={styles.four04container}>
      <p>Whoops! 404 page not found.</p>
      <p>
        One of our Development Team must be punished for this unacceptable
        failure!
      </p>
      <Image src={teamfire} width={500} height={500} />
      <div className={styles.teammembers}>
        <button>Kedar</button>
        <button>Riddhi</button>
        <button>Shivam</button>
        <button>Vishwak</button>
      </div>
      <p>In a forgiving mood? Let them all keep their jobs.</p>
      <p>
        Return to homepage <Link href="/">Go to home</Link>
      </p>
    </div>
  );
}

export default fourofour;
