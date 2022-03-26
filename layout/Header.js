import styles from "../styles/Header.module.css";

function Header({children}) {
  return <div className={styles.background}>{children}</div>;
}

export default Header;
