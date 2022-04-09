import styles from "../styles/Button.module.css";

function Button({title, onClick}) {
  return (
    <div onClick={onClick} className={styles.buttoncontainer}>
      <p className={styles.buttontitle}>{title}</p>
    </div>
  );
}

export default Button;
