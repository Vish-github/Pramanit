import Image from "next/image";
import {useRouter} from "next/router";

import styles from "../../../styles/MunicipalityDetails.module.css";
import editicon from "../../../assets/svgs/edit.svg";

function MunicipalityDetails({details}) {
  const router = useRouter();
  return (
    <>
      <div className={styles.municipality_details}>
        <p className={styles.municipality_details_heading}>
          Muncipality Details
        </p>
        <Image
          src={editicon}
          alt="Edit"
          width={20}
          height={20}
          onClick={() => {
            router.push("/municipality_details");
          }}
          className={styles.editicon}
        />
      </div>
      <div className={styles.municipality_address}>
        <p>{details?.addressLine1}</p>
        <p>{details?.addressLine2}</p>
        <p>{details?.addressLine3}</p>
      </div>
      <p className={styles.municipality_email}>{details?.email}</p>
    </>
  );
}

export default MunicipalityDetails;
