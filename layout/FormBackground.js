import Image from "next/image";

import styles from "../styles/FormBackground.module.css";

function FormBackground({children, pagetitle, image}) {
  return (
    <div className={styles.background}>
      <div className={styles.formcontainer}>
        <h3 className={styles.pagetitle}>{pagetitle}</h3>
        <div className={styles.formsection}>
          <Image
            src={image}
            className={styles.displayimage}
            width={350}
            height={350}
          />
          <div> {children}</div>
        </div>
      </div>
    </div>
  );
}

export default FormBackground;
