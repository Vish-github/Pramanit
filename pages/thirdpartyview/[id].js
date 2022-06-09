import {useRouter} from "next/router";

import Image from "next/image";

import Header from "../../layout/Header";

import styles from "../../styles/User_Birth_Certificate.module.css";

import dummycertificate from "../../assets/PRAMANIT/user_certificate_demo.png";
import verifyicon from "../../assets/svgs/verify.svg";

function Thirdpartyview() {
  const router = useRouter();

  const {id} = router.query;
  console.log(id);
  return (
    <div>
      <Header>
        <div className={styles.header_container}>
          <div className={styles.user_name_container}>
            <h2 className={styles.user_name}>Someone's birth certificate</h2>
          </div>
        </div>
      </Header>
      <div>
        <div className={styles.certificate_section}>
          <Image
            src={dummycertificate}
            className={styles.dummycertificateImage}
          />
          <div className={styles.rightsection}>
            <div className={styles.blockdetails}>
              <h2>Block details</h2>
              <p>Transaction ID:sdjjsdhjdsgdf</p>
              <p>Assignee:</p>
              <p>Other:</p>
              <p>Other:</p>
            </div>
            <div className={styles.verifybtn} onClick={() => setOpen(true)}>
              <Image src={verifyicon} width={30} height={30} />
              <p>Verify Certificate</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Thirdpartyview;
