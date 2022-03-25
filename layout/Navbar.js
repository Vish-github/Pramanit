import Image from "next/image";

import styles from "../styles/Navbar.module.css";
import logo from "../assets/PRAMANIT/logo.png";

function Navbar() {
  return (
    <div className={styles.header}>
      <div>
        <Image src={logo} width={40} height={40} className={styles.logo} />
      </div>
      <div className={styles.nav}>
        <a>Help</a>
        <a>Tech</a>
        <a>About</a>
        <a>Apply</a>
      </div>
    </div>
  );
}

export default Navbar;
