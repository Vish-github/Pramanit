import styles from "../styles/Button.module.css";

function Button({title}) {
  return (
    <div className={styles.buttoncontainer}>
      <p className={styles.buttontitle}>{title}</p>
    </div>
  );
}

export default Button;
