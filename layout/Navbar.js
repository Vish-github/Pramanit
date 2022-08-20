import Image from "next/image";
import Link from "next/link";

import styles from "../styles/Navbar.module.css";
import logo from "../assets/PRAMANIT/logo.png";

function Navbar() {
  return (
    <div className={styles.header}>
      <div>
        <Image src={logo} width={40} height={40} className={styles.logo} />
      </div>
      <div className={styles.nav}>
        <Link href="/help">
          <a>Help</a>
        </Link>
        <Link href="/tech">
          <a>Tech</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
        <Link href="/register">
          <a>Apply</a>
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
