import Image from "next/image";

import styles from "../../../styles/TypeOfCertificate.module.css";

import bookmark_filled from "../../../assets/svgs/bookmark_filled.svg";
import bookmark_outlined from "../../../assets/svgs/bookmark_outlined.svg";

function TypeOfCertificate({active, title, onClick}) {
  return (
    <div className={styles.typeofcertificate_container} onClick={onClick}>
      {active ? (
        <Image src={bookmark_filled} alt="Bookmark filled" />
      ) : (
        <Image src={bookmark_outlined} alt="Boookmark Outlined" />
      )}
      <p
        className={styles.typeofcertificate_container_text}
        style={{fontWeight: active ? "bolder" : "normal"}}
      >
        {title}
      </p>
    </div>
  );
}

export default TypeOfCertificate;
