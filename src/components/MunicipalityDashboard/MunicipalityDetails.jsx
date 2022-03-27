import Image from "next/image";

import styles from "../../../styles/MunicipalityDetails.module.css";
import editicon from "../../../assets/svgs/edit.svg";

function MunicipalityDetails() {
  return (
    <>
      <div className={styles.municipality_details}>
        <p className={styles.municipality_details_heading}>
          Muncipality Details
        </p>
        <Image src={editicon} alt="Edit" />
      </div>
      <div className={styles.municipality_address}>
        <p>Address Line 1</p>
        <p>Address Line 2</p>
        <p>Address Line 3</p>
      </div>
      <p className={styles.municipality_email}>muncipality@gmail.com</p>
    </>
  );
}

export default MunicipalityDetails;
